import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { deleteCar, getCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import {
    getBuildSummary,
    getOptionLabel,
    getPreviewStyle
} from '../utilities/carOptions'

const CarDetails = ({ title }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const loadCar = async () => {
            try {
                const currentCar = await getCar(id)
                setCar(currentCar)
            } catch (loadError) {
                setError(loadError.message)
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

    const previewStyle = useMemo(() => {
        if (!car) {
            return {}
        }

        return getPreviewStyle(car)
    }, [car])

    const handleDelete = async () => {
        setIsDeleting(true)
        setError('')

        try {
            await deleteCar(id)
            navigate('/customcars')
        } catch (deleteError) {
            setError(deleteError.message)
            setIsDeleting(false)
        }
    }

    if (loading) {
        return (
            <main className='page-shell single-column'>
                <article className='builder-panel'>
                    <h2>Loading garage entry...</h2>
                </article>
            </main>
        )
    }

    if (!car) {
        return (
            <main className='page-shell single-column'>
                <article className='builder-panel'>
                    <h2>Car not found</h2>
                    <p>{error || 'This build may have been removed from the garage.'}</p>
                    <Link to='/customcars' role='button'>Back to garage</Link>
                </article>
            </main>
        )
    }

    return (
        <main className='page-shell single-column'>
            <article className='builder-panel details-panel'>
                <header className='details-header'>
                    <div>
                        <p className='eyebrow'>Garage Details</p>
                        <h2>{car.name}</h2>
                        <p>{car.summary || getBuildSummary(car)}</p>
                    </div>
                    <div className='details-actions'>
                        <Link to={`/edit/${car.id}`} role='button'>Edit build</Link>
                        <button
                            type='button'
                            className='secondary-button'
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete build'}
                        </button>
                    </div>
                </header>

                {error && <p className='error-banner'>{error}</p>}

                <div className='car-preview detail-preview' style={previewStyle}>
                    <div className='car-silhouette'>
                        <span className='wheel wheel-left' />
                        <span className='wheel wheel-right' />
                        <span className='car-body' />
                    </div>
                </div>

                <section className='details-stack'>
                    <div className='details-list'>
                        <article className='detail-row'>
                            <p>Total package price</p>
                            <h3>{formatPrice(Number(car.price))}</h3>
                        </article>
                        <article className='detail-row'>
                            <p>Selected model</p>
                            <h3>{getOptionLabel('models', car.model)}</h3>
                        </article>
                        <article className='detail-row'>
                            <p>Exterior paint</p>
                            <h3>{getOptionLabel('paints', car.paint)}</h3>
                        </article>
                        <article className='detail-row'>
                            <p>Wheel setup</p>
                            <h3>{getOptionLabel('wheels', car.wheels)}</h3>
                        </article>
                        <article className='detail-row'>
                            <p>Interior trim</p>
                            <h3>{getOptionLabel('interiors', car.interior)}</h3>
                        </article>
                        <article className='detail-row'>
                            <p>Driving package</p>
                            <h3>{getOptionLabel('packages', car.package)}</h3>
                        </article>
                    </div>

                    <article className='notes-panel'>
                        <header>
                            <h3>Driver notes</h3>
                        </header>
                        <p>{car.notes?.trim() || 'No notes were saved for this build.'}</p>
                    </article>
                </section>
            </article>
        </main>
    )
}

export default CarDetails
