const BASE_URL = '/api/customcars'

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = 'Request failed'

        try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorMessage
        } catch {
            errorMessage = response.statusText || errorMessage
        }

        throw new Error(errorMessage)
    }

    return response.json()
}

export const getAllCars = async () => {
    const response = await fetch(BASE_URL)
    return handleResponse(response)
}

export const getCar = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    return handleResponse(response)
}

export const createCar = async (carData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    })

    return handleResponse(response)
}

export const updateCar = async (id, carData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    })

    return handleResponse(response)
}

export const deleteCar = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })

    return handleResponse(response)
}
