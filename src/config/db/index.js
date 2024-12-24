
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
async function connect(){
    try {
       await mongoose.connect(process.env.MONGODB_URL);
        console.log('Thanh cong')
    } catch (error) {
        console.log('That bai')    
    }
}

module.exports= {connect}