import mongoose from "mongoose";

const Connection= async(username, password)=>{
    const URL=`mongodb://${username}:${password}@ac-mfchgsx-shard-00-00.4wbnqbf.mongodb.net:27017,ac-mfchgsx-shard-00-01.4wbnqbf.mongodb.net:27017,ac-mfchgsx-shard-00-02.4wbnqbf.mongodb.net:27017/?ssl=true&replicaSet=atlas-10mdhk-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true});
        console.log('DB connected');
    } catch (error) {
        console.log('Error while connecting with database ', error);
    }
}

export default Connection;