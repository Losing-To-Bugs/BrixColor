/** 
 * This program demonstrates the containerized code within the server.
 * The code utilizes a mongodb NoSQL datastore to handle storing and retrieving data given HTTP Requests VIA a RESTful API.
*/

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb"); 
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const app = express();
app.use(bodyParser.json());
const PORT = 6969;


const URI = process.env.MONGODB_URI
const client = new MongoClient(URI);



const shutdown = async () =>{
    try {
        await client.close();
        console.log("Client Connection Closed:\n\tShutting Down...");
        process.exit(0);

    } catch (err) {
        console.log(`Client Connection FAILED to Close:\n\tError: ${err}\nShutting Down...`);
        process.exit(1);
    }
}

// Listen for shutdown signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(PORT, async ()=>{

    console.log("BrixColor Server Listening on Port:", PORT);
    await connect();

});



const connect = async () =>{
    try{
        await client.connect();
        console.log("Connected succesfully to MongoDB");
        return client
    }
    catch(err){
        console.error("Error Connecting to Database:",err);
        return false;
    }
}


/** 
 * Will Expect  format of:
 * {
 *  uid: string,
 *  textSize: "medium",
 *  theme: "sunset",
 *  etc...
 *  ...
 * }
*/
app.post("/userSettings", async (req, res) =>{
    const userSetting = req.body;
    console.log(userSetting);

    if (!userSetting.uid || typeof userSetting.uid !== "string"){
        return res.status(400).json({ error: "Invalid UID format." });
    }

    try{
        const db = client.db("brixColor");
        const collection = db.collection("settings")

        await collection.updateOne(
            { uid: userSetting.uid }, // Query to find the document
            { $set: userSetting },    // Update fields
            { upsert: true }          // Create a new document if it doesn't exist
        );
        
        res.status(201).json({message: "Setting Saved"})
    }
    catch (err){
        console.error("Error Storing Settings:",err);
        res.status(500).json({error: "Internal Server Error"})
    }
    
});

app.get("/userSettings", async (req, res) =>{
    const uid = req.query.uid;
    console.log(req.query)

    if (!uid || typeof uid !== "string"){
        return res.status(400).json({ error: "Invalid UID format." });
    }

    try{
        const db = client.db("brixColor");
        const collection = db.collection("settings");

        const item = await collection.findOne({uid: uid});
        
        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.status(200).json(item);

    }
    catch(err){
        console.error("Error Getting User Settings for User: [", uid, " ]:\n\t", err);
        res.status(500).json({error: "Internal Server Error"})
    }
});




app.post("/userHistory", async (req, res) =>{
    const userHistory = req.body;

    if (!userHistory.uid || typeof userHistory.uid !== "string"){
        return res.status(400).json({ error: "Invalid UID format." });
    }

    try{
        const db = client.db("brixColor");
        const collection = db.collection("history")
        await collection.updateOne(
            {uid: userHistory.uid},
            {$set: userHistory},
            {upsert: true}

        );
        res.status(201).json({message: "History Saved"})
    }
    catch (err){
        console.error("Error Storing History:",err);
        res.status(500).json({error: "Internal Server Error"})
    }
});


app.get("/userHistory", async (req, res) =>{
    const uid = req.query.uid;

    if (!uid || typeof uid !== "string"){
        return res.status(400).json({ error: "Invalid UID format." });
    }

    try{
        const db = client.db("brixColor");
        const collection = db.collection("history");

        const item = await collection.findOne({uid: uid});

        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.status(200).json(item);

    }
    catch(err){
        console.error("Error Getting User History for User: [", uid, " ]:\n\t", err);
        res.status(500).json({error: "Internal Server Error"})
    }
});