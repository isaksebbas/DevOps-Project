const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const app = express()

require('dotenv').config()
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'))
const PORT = process.env.PORT || 3030

console.log("Morjens Node!") 


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
}).on('error', (err) => {
    console.error('Error starting server:', err);
});