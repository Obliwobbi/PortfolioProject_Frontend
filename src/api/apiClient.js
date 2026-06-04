const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `API error: ${response.status}`

    try {
      const errorData = await response.json()
      errorMessage = errorData.message ?? errorMessage
    } catch {
      // fallback hvis API ikke sender JSON
    }

    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return null
  }

  return await response.json()
}

function getHeaders(includeAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
  }

  const token = localStorage.getItem('token')

  if (includeAuth && token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export async function apiGet(endpoint, includeAuth = true) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: getHeaders(includeAuth),
  })

  return await handleResponse(response)
}

export async function apiPost(endpoint, data, includeAuth = true) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(includeAuth),
    body: JSON.stringify(data),
  })

  return await handleResponse(response)
}

export async function apiPut(endpoint, data, includeAuth = true) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(includeAuth),
    body: JSON.stringify(data),
  })

  return await handleResponse(response)
}

export async function apiDelete(endpoint, includeAuth = true) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(includeAuth),
  })

  return await handleResponse(response)
}