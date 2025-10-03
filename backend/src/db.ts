import { Pool } from "pg"
import { z } from "zod"
import { careersSchema } from "./types/types"

export type Career = z.infer<typeof careersSchema>

const pool = new Pool({
    connectionString: "postgres://postgres.example", // replace with full connection URL
})

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
    const result = await pool.query(query, values)
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
