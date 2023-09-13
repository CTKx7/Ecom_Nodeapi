import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false)
    const connected = await mongoose.connect(process.env.MONGO_URL);     
     console.log(`Mongodb connected ${connected.connection.host}`);
     console.log("DataBase Connected SuccessFully")  
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;




//Chrome Url For Mongo DB
// https://cloud.mongodb.com/v2/64e35c0b2b9201241082905c#/clusters

//&

//Password For DB Connection
//PI80I3bFRXIwlXL7
