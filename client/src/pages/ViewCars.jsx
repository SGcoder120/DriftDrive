import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { deleteCar, getAllCars } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import {
    getBuildSummary,
    getPreviewStyle
} from '../utilities/carOptions'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const loadCars = async () => {
            try {
                const allCars = await getAllCars()
                setCars(allCars)
            } catch (loadError) {
                setError(loadError.message)
            } finally {
                setLoading(false)
            }
        }

        loadCars()
    }, [])

    const handleDelete = async (id) => {
        setDeletingId(id)
        setError('')

        try {
            await deleteCar(id)
            setCars((currentCars) => currentCars.filter((car) => car.id !== id))
        } catch (deleteError) {
            setError(deleteError.message)
        } finally {
            setDeletingId(null)
        }
    }

    const sortedCars = [...cars].sort((firstCar, secondCar) => firstCar.id - secondCar.id)

    if (loading) {
        return (
            <main className='page-shell single-column'>
                <article className='builder-panel'>
                    <h2>Loading garage...</h2>
                </article>
            </main>
        )
    }

    return (
        <main className='page-shell single-column'>

            {error && <p className='error-banner floating-error'>{error}</p>}

            {cars.length === 0 ? (
                <article className='builder-panel empty-state'>
                    <h2>No cars saved yet</h2>
                    <p>Start with a fresh custom build and it will show up here.</p>
                </article>
            ) : (
                <section className='builds-section'>
                    <div className='garage-grid'>
                        {sortedCars.map((car, index) => (
                            <article key={car.id} className='builder-panel garage-card'>
                                <div className='car-preview mini-preview' style={getPreviewStyle(car)}>
                                    <div className='car-silhouette compact'>
                                        <span className='wheel wheel-left' />
                                        <span className='wheel wheel-right' />
                                        <span className='car-body' />
                                    </div>
                                </div>

                                <header>
                                    <p className='eyebrow'>Build #{index+1}</p>
                                    <h3>{car.name}</h3>
                                    <p>{car.summary || getBuildSummary(car)}</p>
                                </header>

                                <p className='price-tag'>{formatPrice(Number(car.price))}</p>

                                <footer className='card-actions'>
                                    <Link to={`/customcars/${car.id}`} role='button'>Details</Link>
                                    <Link to={`/edit/${car.id}`} role='button' className='secondary-button'>Edit</Link>
                                    <button
                                        type='button'
                                        className='secondary-button'
                                        disabled={deletingId === car.id}
                                        onClick={() => handleDelete(car.id)}
                                    >
                                        {deletingId === car.id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </footer>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}

export default ViewCars
