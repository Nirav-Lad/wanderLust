const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderLust"
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{console.log("Database is connected..")}).catch((err)=>console.log(err));

const initDB=async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6858d7d7cf5568f09e096f5e"}));
    await Listing.insertMany(initData.data);
    console.log("Data saved successfully...");
}

initDB();