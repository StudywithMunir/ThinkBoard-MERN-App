import express from "express";
import dotenv from "dotenv";
// for cross origin requests (frontend to backend)
import cors from "cors";

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// intitializing enviroment variables file
dotenv.config();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
}));
app.use(express.json()); //for form data (req.body)
app.use(rateLimiter); //custom middleware

// whenever a request come for /api/notes it jumps to notesRoute file
app.use("/api/notes",notesRoute);
// below we can can add how many routes for api we want let say we have /api/products
// we just add the below line, create productRoutes and creates its controller etc same as notesRoute
// e.g, app.use("/api/product",productRoute);


// Once Database is connected then listen
// making DB connection
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}.`);
    });
});