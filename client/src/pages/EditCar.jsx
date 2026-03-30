import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { deleteCar, getCar, updateCar } from '../services/CarsAPI'
import { calculatePrice, formatPrice } from '../utilities/calcPrice'
import {
    CAR_OPTIONS,
    DEFAULT_CAR_FORM,
    getBuildSummary,
    getPreviewStyle
} from '../utilities/carOptions'
import { validateCarConfiguration } from '../utilities/validation'

const EditCar = ({ title }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [carForm, setCarForm] = useState(DEFAULT_CAR_FORM)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const loadCar = async () => {
            try {
                const car = await getCar(id)
                setCarForm({
                    name: car.name || '',
                    model: car.model || DEFAULT_CAR_FORM.model,
                    paint: car.paint || DEFAULT_CAR_FORM.paint,
                    wheels: car.wheels || DEFAULT_CAR_FORM.wheels,
                    interior: car.interior || DEFAULT_CAR_FORM.interior,
                    package: car.package || DEFAULT_CAR_FORM.package,
                    notes: car.notes || ''
                })
            } catch (loadError) {
                setError(loadError.message)
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

    const totalPrice = useMemo(() => calculatePrice(carForm), [carForm])
    const configError = validateCarConfiguration(carForm)
    const previewStyle = useMemo(() => getPreviewStyle(carForm), [carForm])

    const handleChange = (event) => {
        const { name, value } = event.target
        setCarForm((currentForm) => ({
            ...currentForm,
            [name]: value
        }))

        if (error) {
            setError('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (configError) {
            setError(configError)
            return
        }

        setIsSaving(true)
        setError('')

        try {
            await updateCar(id, {
                ...carForm,
                price: totalPrice,
                summary: getBuildSummary(carForm)
            })

            navigate(`/customcars/${id}`)
        } catch (submitError) {
            setError(submitError.message)
        } finally {
            setIsSaving(false)
        }
    }

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
                    <h2>Loading car configuration...</h2>
                </article>
            </main>
        )
    }

    if (error && !carForm.name) {
        return (
            <main className='page-shell single-column'>
                <article className='builder-panel'>
                    <h2>Unable to load this build</h2>
                    <p>{error}</p>
                    <Link to='/customcars' role='button'>Back to garage</Link>
                </article>
            </main>
        )
    }

    return (
        <main className='page-shell'>
            <section className='page-grid'>
                <article className='builder-panel form-panel'>
                    <header>
                        <p className='eyebrow'>Garage Editor</p>
                        <h2>Edit custom car</h2>
                        <p>Fine-tune the saved build and update your garage entry.</p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='name'>Build name</label>
                        <input id='name' name='name' required value={carForm.name} onChange={handleChange} />

                        <label htmlFor='model'>Model</label>
                        <select id='model' name='model' value={carForm.model} onChange={handleChange}>
                            {CAR_OPTIONS.models.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label} ({formatPrice(option.price)})
                                </option>
                            ))}
                        </select>

                        <label htmlFor='paint'>Paint</label>
                        <select id='paint' name='paint' value={carForm.paint} onChange={handleChange}>
                            {CAR_OPTIONS.paints.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label} ({formatPrice(option.price)})
                                </option>
                            ))}
                        </select>

                        <label htmlFor='wheels'>Wheels</label>
                        <select id='wheels' name='wheels' value={carForm.wheels} onChange={handleChange}>
                            {CAR_OPTIONS.wheels.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label} ({formatPrice(option.price)})
                                </option>
                            ))}
                        </select>

                        <label htmlFor='interior'>Interior</label>
                        <select id='interior' name='interior' value={carForm.interior} onChange={handleChange}>
                            {CAR_OPTIONS.interiors.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label} ({formatPrice(option.price)})
                                </option>
                            ))}
                        </select>

                        <label htmlFor='package'>Package</label>
                        <select id='package' name='package' value={carForm.package} onChange={handleChange}>
                            {CAR_OPTIONS.packages.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label} ({formatPrice(option.price)})
                                </option>
                            ))}
                        </select>

                        <label htmlFor='notes'>Driver notes</label>
                        <textarea id='notes' name='notes' rows='4' value={carForm.notes} onChange={handleChange} />

                        {(error || configError) && (
                            <p className='error-banner'>{error || configError}</p>
                        )}

                        <footer className='form-actions split-actions'>
                            <button type='submit' disabled={isSaving || isDeleting || Boolean(configError)}>
                                {isSaving ? 'Updating...' : 'Update build'}
                            </button>
                            <button
                                type='button'
                                className='secondary-button'
                                onClick={handleDelete}
                                disabled={isSaving || isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete build'}
                            </button>
                        </footer>
                    </form>
                </article>

                <article className='builder-panel preview-panel'>
                    <header>
                        <p className='eyebrow'>Updated Preview</p>
                        <h2>{carForm.name}</h2>
                        <p>{getBuildSummary(carForm)}</p>
                    </header>

                    <div className='car-preview' style={previewStyle}>
                        <div className='car-silhouette'>
                            <span className='wheel wheel-left' />
                            <span className='wheel wheel-right' />
                            <span className='car-body' />
                        </div>
                    </div>

                    <section className='spec-grid'>
                        <div>
                            <h3>{formatPrice(totalPrice)}</h3>
                            <p>Total price</p>
                        </div>
                        <div>
                            <h3>{carForm.notes?.trim() ? 'Saved' : 'Optional'}</h3>
                            <p>Notes</p>
                        </div>
                    </section>
                </article>
            </section>
        </main>
    )
}

export default EditCar
