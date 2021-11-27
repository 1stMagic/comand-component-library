"use strict"

const express = require("express")
const multer = require("multer")

const PORT = 8888
const HOST = '0.0.0.0'

const app = express()

app.options("/", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    res.send()
})

app.get("/", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    res.send({success: true, timestamp: Date.now()})
})

app.post("/", multer({dest: "uploads"}).any(), (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    res.send({success: true})
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)