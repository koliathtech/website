import { Pool } from "pg"
import { z } from "zod"
import { careersSchema } from "./types/types"

export type Career = z.infer<typeof careersSchema>

const pool = new Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/mydb",
})

async function createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact BIGINT NOT NULL,
    linkedin VARCHAR(255) NOT NULL )`
    try {
        const result = await pool.query(query)
    } catch (e) {
        console.log(e)
        throw e
    }
    await createTable().catch((err) => {
        console.log("error : " + err)
    })
}

export async function createCareer(data: Career) {
    const validated = careersSchema.parse(data)
    const query = `
    INSERT INTO careers (name, email, contact, linkedin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `
    const values = [
        validated.name,
        validated.email,
        validated.contact,
        validated.linkedin,
    ]
    let result
    try {
        result = await pool.query(query, values)
    } catch (e) {
        console.log(e)
        throw e
    }
    if (!result) {
        throw "The result is missing"
    }
    return result.rows[0]
}

export async function getAllCareers() {
    const result = await pool.query("SELECT * FROM careers;")
    return result.rows
}

export async function getCareerById(id: number) {
    const result = await pool.query("SELECT * FROM careers WHERE id = $1;", [
        id,
    ])
    return result.rows[0]
}
