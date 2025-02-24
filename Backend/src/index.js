// importing dependencies
import express from 'express';

import postRoutes from './Routes/postRoutes.js';
import { authMiddleware } from './Middlewares/authMiddleware.js';
import { connectDB } from './Config/dbconfig.js';
 
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import ip from 'ip';
import cors from 'cors';
// creating express app
const app = express();
const port = 3000;

app.use(cors({
    origin:true,
    credentials:true
}));

// swagger documentation
const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'My Sasta Instagram Clone API',
                version: '1.0.0',
                description: 'API documentation for My Sasta Instagram Clone',
            },
            servers: [
                {
                    url: 'http://localhost:3000/api/v1',
                },
            ],
        },
        apis: ['/Users/Shubham Ashish/OneDrive/Desktop/All Projects/Backend/Practice/src/Routes/v1/*.js'],
    };
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


// routes
app.use('/api', postRoutes );

app.get('/' ,(req, res) => {
    console.log(req.user);
    const ipaddress = ip.address();
    res.send('Hello Shubham Ashish! this is just a check request'+ipaddress);
})
app.get('/auth', authMiddleware ,(req, res) => {
    console.log(req.user);
    res.send('User Authenticated!');
})

connectDB();
// starting server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    connectDB();
});

