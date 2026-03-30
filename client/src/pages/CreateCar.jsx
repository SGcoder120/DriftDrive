import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { createCar } from '../services/CarsAPI'
import { calculatePrice, formatPrice } from '../utilities/calcPrice'
import {
    CAR_OPTIONS,
    DEFAULT_CAR_FORM,
    getBuildSummary,
    getOptionLabel,
    getPreviewStyle
} from '../utilities/carOptions'
import { validateCarConfiguration } from '../utilities/validation'

const CreateCar = ({ title }) => {
    const navigate = useNavigate()
    const [carForm, setCarForm] = useState(DEFAULT_CAR_FORM)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

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
            const payload = {
                ...carForm,
                price: totalPrice,
                summary: getBuildSummary(carForm)
            }

            const newCar = await createCar(payload)
            navigate(`/customcars/${newCar.id}`)
        } catch (submitError) {
            setError(submitError.message)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <main className='page-shell'>
            <section className='page-grid'>
                <article className='builder-panel form-panel'>
                    <header>
                        <p className='eyebrow'>Garage Builder</p>
                        <h2>Create a custom car</h2>
                        <p>Pick a setup, preview the build, and save it to your garage.</p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='name'>Build name</label>
                        <input
                            id='name'
                            name='name'
                            placeholder='Weekend Flash'
                            required
                            value={carForm.name}
                            onChange={handleChange}
                        />

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
                        <textarea
                            id='notes'
                            name='notes'
                            placeholder='Favorite road trip route, delivery notes, or a custom nickname...'
                            rows='4'
                            value={carForm.notes}
                            onChange={handleChange}
                        />

                        {(error || configError) && (
                            <p className='error-banner'>{error || configError}</p>
                        )}

                        <footer className='form-actions'>
                            <button type='submit' disabled={isSaving || Boolean(configError)}>
                                {isSaving ? 'Saving build...' : 'Save custom car'}
                            </button>
                        </footer>
                    </form>
                </article>

                <article className='builder-panel preview-panel'>
                    <header>
                        <p className='eyebrow'>Live Preview</p>
                        <h2>{carForm.name || 'Unnamed build'}</h2>
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
                            <h3>{getOptionLabel('models', carForm.model)}</h3>
                            <p>Model</p>
                        </div>
                        <div>
                            <h3>{getOptionLabel('paints', carForm.paint)}</h3>
                            <p>Paint</p>
                        </div>
                        <div>
                            <h3>{getOptionLabel('packages', carForm.package)}</h3>
                            <p>Package</p>
                        </div>
                    </section>
                </article>
            </section>
        </main>
    )
}

export default CreateCar
