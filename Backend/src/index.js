import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'url';


dotenv.config();

const app=express()

app.use(cors())

app.use(express.json()); // tells the system that you want json to be used
app.use(express.urlencoded({ extended: true })); // It is a inbuilt method in express to recognize the incoming Request Object as strings or arrays


mongoose
  .connect(
    process.env.MONGODB_URL,
    {
     useNewUrlParser: true,
     useUnifiedTopology: true,    }
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));


// Equivalent of __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));

var options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

import authRoutes from './routes/auth.js'
import planRoutes from './routes/plan.js'
import userRoutes from './routes/user.js'
import bookRoutes from './routes/book.js'
import smartSearchAI from './routes/smartSearchAI.js'

// Initial route
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/books", bookRoutes)
app.use("/api/ai" , smartSearchAI);

app.listen(process.env.PORT||3000,function(){
    console.log("connected to port ",process.env.PORT||3000)
})