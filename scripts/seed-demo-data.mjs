const API_BASE_URL =
  process.env.API_BASE_URL ?? 'https://membersystem.obli.dk/api/v1'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? 'Demo1234!'
const COMPANY_COUNT = Number(process.env.COMPANY_COUNT ?? 5)
const MEMBERS_PER_COMPANY = Number(process.env.MEMBERS_PER_COMPANY ?? 8)

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD')
  process.exit(1)
}

const runId = new Date()
  .toISOString()
  .replaceAll('-', '')
  .replaceAll(':', '')
  .replaceAll('.', '')
  .slice(0, 14)

const baseCompanyNames = [
  'Nordic Fitness',
  'Purple Performance',
  'Silverback Members',
  'Obli Sports Club',
  'West Coast Gym',
  'Iron Valley',
  'Peak Performance Club',
  'Urban Movement',
  'Core Strength',
  'Hartzberg Health',
]

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`${response.status} ${response.statusText}: ${text}`)
  }

  if (response.status === 204) {
    return null
  }

  return await response.json()
}

async function apiPost(endpoint, data, token = null) {
  return await apiRequest(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
}

async function login() {
  const response = await apiPost('/login', {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })

  return response.token
}

async function fetchRandomUsers(count) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=dk,gb,us`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch random users from randomuser.me')
  }

  const data = await response.json()

  return data.results
}

function createDemoEmail(role, companyIndex, userIndex) {
  return `${role.toLowerCase()}-${runId}-${companyIndex}-${userIndex}@demo.obli.dk`
}

function toDateOnly(randomUser) {
  return randomUser.dob.date.substring(0, 10)
}

function mapRandomUserToUserRequest(randomUser, companyId, role, companyIndex, userIndex) {
  return {
    companyId,
    email: createDemoEmail(role, companyIndex, userIndex),
    firstname: randomUser.name.first,
    lastname: randomUser.name.last,
    dob: toDateOnly(randomUser),
    role,
    password: DEMO_PASSWORD,
  }
}

async function main() {
  console.log('--- MemberSystem demo seeding ---')
  console.log(`API: ${API_BASE_URL}`)
  console.log(`Companies: ${COMPANY_COUNT}`)
  console.log(`Members per company: ${MEMBERS_PER_COMPANY}`)
  console.log('')

  const token = await login()
  console.log('Logged in as system admin')

  const createdCompanies = []

  for (let i = 0; i < COMPANY_COUNT; i++) {
    const baseName = baseCompanyNames[i % baseCompanyNames.length]
    const companyName = `${baseName} Demo ${runId}-${i + 1}`

    const companyRequest = {
      name: companyName,
      publicRegistrationEnabled: true,
    }

    try {
      const company = await apiPost('/companies', companyRequest, token)
      createdCompanies.push(company)

      console.log(`Created company: ${company.name}`)
    } catch (error) {
      console.log(`Could not create company: ${companyName}`)
      console.log(error.message)
    }
  }

  if (createdCompanies.length === 0) {
    console.log('No companies created. Stopping.')
    return
  }

  const randomUserCount = createdCompanies.length * (MEMBERS_PER_COMPANY + 1)
  const randomUsers = await fetchRandomUsers(randomUserCount)

  let randomUserIndex = 0

  for (let companyIndex = 0; companyIndex < createdCompanies.length; companyIndex++) {
    const company = createdCompanies[companyIndex]

    const adminRandomUser = randomUsers[randomUserIndex]

    const companyAdminRequest = mapRandomUserToUserRequest(
      adminRandomUser,
      company.id,
      'COMPANY_ADMIN',
      companyIndex + 1,
      0
    )

    try {
      const createdAdmin = await apiPost('/users', companyAdminRequest, token)
      console.log(`Created company admin: ${createdAdmin.email} -> ${company.name}`)
    } catch (error) {
      console.log(`Could not create company admin for ${company.name}`)
      console.log(error.message)
    }

    randomUserIndex++

    for (let memberIndex = 1; memberIndex <= MEMBERS_PER_COMPANY; memberIndex++) {
      const randomUser = randomUsers[randomUserIndex]

      const memberRequest = mapRandomUserToUserRequest(
        randomUser,
        company.id,
        'MEMBER',
        companyIndex + 1,
        memberIndex
      )

      try {
        const createdMember = await apiPost('/users', memberRequest, token)
        console.log(`Created member: ${createdMember.email} -> ${company.name}`)
      } catch (error) {
        console.log(`Could not create member for ${company.name}`)
        console.log(error.message)
      }

      randomUserIndex++
    }
  }

  console.log('')
  console.log('--- Done ---')
  console.log(`Demo password for seeded users: ${DEMO_PASSWORD}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})