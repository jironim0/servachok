import express from 'express'
import { connect } from 'http2';
import mongoose from 'mongoose'
import cors from 'cors'

import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js'

import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.9zwaubm.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB.ok')
}).catch((err) => {
    console.log('DB error', err)
})

const app = express();

app.use(cors())

app.use(express.json())

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

// app.get('/posts', PostController.getAll)
// app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
// app.delete('/posts', PostController.remove)
// app.patch('/posts', PostController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})