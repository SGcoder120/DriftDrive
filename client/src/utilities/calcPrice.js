import { getOption } from './carOptions'

export const getOptionPrice = (category, value) => {
    return getOption(category, value)?.price || 0
}

export const calculatePrice = (car) => {
    const modelPrice = getOptionPrice('models', car.model)
    const paintPrice = getOptionPrice('paints', car.paint)
    const wheelPrice = getOptionPrice('wheels', car.wheels)
    const interiorPrice = getOptionPrice('interiors', car.interior)
    const packagePrice = getOptionPrice('packages', car.package)

    return modelPrice + paintPrice + wheelPrice + interiorPrice + packagePrice
}

export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(price || 0)
}
