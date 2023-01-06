/**
 * @file app.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @desc use this file to launch the note-taking app
 */
import process from "process";
import express from "express";
//import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { router } from "./routes/routes.js";
// See sandbox/dirname.js for why we defined these variables.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ "extended" : true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(router);                        // Apply our routes!

app.listen(PORT,(err) => {
    if(err) console.error(err);
    console.log(`App listening on PORT: ${PORT}`);
});