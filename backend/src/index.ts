import express from "express"
import cors from "cors"
import { api } from "./config"
import { safeParse, z } from "zod"
import { careersSchema } from "./types/types"
import { createCareer } from "./db"
const app = express()
const port = 3000

// CORS configuration
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
    })
)

app.use(express.json())

app.post("/careers", async (req, res) => {
    const body = careersSchema.safeParse(req.body)

    if (!body.success) {
        return res.status(400).json({
            msg: z.treeifyError(body.error),
        })
    }

    const { name, email, contact, linkedin } = body.data
    console.log(body.data)
    try {
        const dbQuery = await createCareer({
            name,
            email,
            contact,
            linkedin,
        })
    } catch (e) {
        res.status(500).json({
            msg: "User already exists or Database went down",
        })
    }

    res.status(200).json({
        msg: "Career application received successfully",
        data: { name, email, contact, linkedin },
    })
})

app.listen(port)
