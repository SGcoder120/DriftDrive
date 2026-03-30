export const validateCarConfiguration = (car) => {
    if (car.model === 'city' && car.package === 'track') {
        return 'City Zip cannot use the Track Pack. Pick Commuter or Touring instead.'
    }

    if (car.model === 'roadster' && car.wheels === 'utility') {
        return 'Roadster S is too low for the All-Terrain wheel setup.'
    }

    if (car.paint === 'midnight' && car.interior === 'sand') {
        return 'Midnight Black is temporarily unavailable with Sand Leather.'
    }

    return ''
}
