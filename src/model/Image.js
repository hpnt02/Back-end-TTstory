
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const ImageSchema= new Schema({
    Image1:{type:String},
    Image2:{type:String},
    Image3:{type:String},
    Image4:{type:String},
    Image5:{type:String},
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'Image'
},
    {timestamps:true }
)

module.exports = mongoose.model('Image',ImageSchema);