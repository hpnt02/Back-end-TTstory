
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const NhaCungCapSchema= new Schema({
    nameNCC:{type:String, maxlength:255, required: true}, 
    SDTNCC:{type:String, maxlength:20, required: true}, 
    DiaChiNCC:{type:String, maxlength:255, required: true},
    emailNCC:{type:String, maxlength:255, required: true},
    Image:{type:String},
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'NhaCungCap'
},
    {timestamps:true }
)

module.exports = mongoose.model('NhaCungCap',NhaCungCapSchema);