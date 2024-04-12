const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on('connected',()=>{
    console.log('Database connected');
})
mongoose.connection.on('disconnected',(err)=>{
    console.log(`Database disconnected due to ${err}`);
});

module.exports = {connect};
