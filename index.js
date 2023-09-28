import express from "express";
import initApp from "./Src/Modules/app.router.js";
import * as dotenv from "dotenv";
import SendEmail from "./Src/Services/SendEmail.js";
dotenv.config();
const app = express();
const PORT = 5500;

initApp(app,express);
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})