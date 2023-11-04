const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT || 9000

//Middleware
app.use(express.json())
app.use('/api', userRoutes)



//routes
app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST')
})

//mongodb connection
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000,
	autoIndex: false, // Don't build indexes
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(process.env.MONGODB_URI_LOCAL, options)
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error(error))

app.listen(port, () => console.log('Server listening on port', port))