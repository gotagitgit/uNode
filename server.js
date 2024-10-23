if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config()
}

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path'
import indexRouter from './routes/index.js';
import mongoose from 'mongoose';

const app = express();

const __dirname = path.resolve();

// setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)

// express middleware
// app.use(express.static("public"))
// app.use(express.urlencoded())
// app.use(express.json())

// routers
app.use('/', indexRouter)

// db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.on('open', () => console.log('Connected to DB'))

app.listen(process.env.PORT || 3000);