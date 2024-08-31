import mongoose from "mongoose";

const connectDatabase = async() => {
    try{
        await mongoose.connect(process.env.db_url, {
            dbName: "pinterest",
        });
          console.log("Database connection established successfully");

    }
    catch(error){
        console.log(error);
    }
};

export default connectDatabase;