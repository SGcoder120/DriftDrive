import { pool } from '../config/database.js'

const TABLE_NAME = 'cars'
const VALID_IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]*$/

const formatColumnName = (columnName) => {
    if (!VALID_IDENTIFIER.test(columnName)) {
        throw new Error(`Invalid column name: ${columnName}`)
    }

    return `"${columnName}"`
}

const getBodyColumns = (body) => {
    return Object.keys(body).filter((key) => key !== 'id')
}

export const getCars = async (_, res) => {
    try {
        const results = await pool.query(`SELECT * FROM ${TABLE_NAME} ORDER BY id ASC`)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getCarById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const results = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createCar = async (req, res) => {
    try {
        const columns = getBodyColumns(req.body)

        if (columns.length === 0) {
            return res.status(400).json({ error: 'Request body must include car fields to save' })
        }

        const formattedColumns = columns.map(formatColumnName).join(', ')
        const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ')
        const values = columns.map((column) => req.body[column])

        const results = await pool.query(
            `INSERT INTO ${TABLE_NAME} (${formattedColumns}) VALUES (${placeholders}) RETURNING *`,
            values
        )

        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCar = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const columns = getBodyColumns(req.body)

        if (columns.length === 0) {
            return res.status(400).json({ error: 'Request body must include car fields to update' })
        }

        const setClause = columns
            .map((column, index) => `${formatColumnName(column)} = $${index + 1}`)
            .join(', ')
        const values = columns.map((column) => req.body[column])

        const results = await pool.query(
            `UPDATE ${TABLE_NAME} SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *`,
            [...values, id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteCar = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const results = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`, [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
