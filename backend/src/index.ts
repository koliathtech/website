import express from "express"
import { api } from "./config"
import { safeParse, z } from "zod"
import { careersSchema } from "./types/types"
const app = express()
const port = 3000

app.get(`${api}/careers`, (req, res) => {
    const body = careersSchema.safeParse(req.body)

    if (!body.success) {
        return res.status(400).json({
            msg: "Invalid Details Sent ",
        })
    }

    const { name, email, contact, linkedin } = body.data

    // Save to db  yet to add , send email etc
    // If you want to be stricter add checks for email if it already exists in db

    res.status(200).json({
        msg: "Career application received successfully",
        data: { name, email, contact, linkedin },
    })
})

app.listen(port)
