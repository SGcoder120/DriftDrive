export const CAR_OPTIONS = {
    models: [
        { value: 'city', label: 'City Zip', price: 22000, accent: '#72bcd4' },
        { value: 'roadster', label: 'Roadster S', price: 31000, accent: '#cf4f3f' },
        { value: 'summit', label: 'Summit X', price: 42000, accent: '#8f6f50' }
    ],
    paints: [
        { value: 'crimson', label: 'Crimson Red', price: 1200, color: '#a62c2b' },
        { value: 'glacier', label: 'Glacier White', price: 800, color: '#f3f4f6' },
        { value: 'midnight', label: 'Midnight Black', price: 1500, color: '#161616' },
        { value: 'volt', label: 'Volt Lime', price: 1800, color: '#97c93c' }
    ],
    wheels: [
        { value: 'street', label: '18" Street', price: 0 },
        { value: 'sport', label: '20" Sport', price: 1600 },
        { value: 'utility', label: 'All-Terrain', price: 2200 }
    ],
    interiors: [
        { value: 'graphite', label: 'Graphite Cloth', price: 0 },
        { value: 'sand', label: 'Sand Leather', price: 1900 },
        { value: 'ember', label: 'Ember Suede', price: 2400 }
    ],
    packages: [
        { value: 'commute', label: 'Commuter Pack', price: 1200 },
        { value: 'touring', label: 'Touring Pack', price: 2600 },
        { value: 'track', label: 'Track Pack', price: 4200 }
    ]
}

export const DEFAULT_CAR_FORM = {
    name: '',
    model: 'city',
    paint: 'crimson',
    wheels: 'street',
    interior: 'graphite',
    package: 'commute',
    notes: ''
}

export const getOption = (category, value) => {
    return CAR_OPTIONS[category].find((option) => option.value === value)
}

export const getOptionLabel = (category, value) => {
    return getOption(category, value)?.label || value
}

export const getBuildSummary = (car) => {
    return `${getOptionLabel('models', car.model)} in ${getOptionLabel('paints', car.paint)} with ${getOptionLabel('wheels', car.wheels)} wheels, ${getOptionLabel('interiors', car.interior)} interior, and the ${getOptionLabel('packages', car.package)}.`
}

export const getPreviewStyle = (car) => {
    const paintColor = getOption('paints', car.paint)?.color || '#666666'
    const accentColor = getOption('models', car.model)?.accent || '#999999'

    return {
        background: `linear-gradient(135deg, ${paintColor} 0%, ${accentColor} 100%)`
    }
}
