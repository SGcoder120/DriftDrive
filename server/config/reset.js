import 'dotenv/config'
import { pool } from './database.js'

const createCarsTable = `
    DROP TABLE IF EXISTS cars;

    CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        model VARCHAR(50) NOT NULL,
        paint VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        interior VARCHAR(50) NOT NULL,
        package VARCHAR(50) NOT NULL,
        notes TEXT,
        price INTEGER NOT NULL,
        summary TEXT NOT NULL
    );
`

const resetDatabase = async () => {
    try {
        await pool.query(createCarsTable)
        console.log('cars table created successfully')
    } catch (error) {
        console.error('database reset failed:', error.message)
    } finally {
        await pool.end()
    }
}

resetDatabase()
