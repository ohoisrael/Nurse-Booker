// server.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import nurseRoute from './Routes/nurse.js';
import bookingRoute from './Routes/booking.js';
import path from 'path'

dotenv.config();

const __dirname = path.resolve()

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};


// database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDb Database is connected');
    } catch (error) {
        console.log('MongoDB database connection failed');
    }
};
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/nurses', nurseRoute);
app.use('/api/v1/bookings', bookingRoute);

app.use(express.static(path.join(__dirname, '/Frontend/dist')))

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
})

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on Port${port}`);
});
