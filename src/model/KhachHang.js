
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const KhachHangSchema= new Schema({
    HoTenKH:{type:String, maxlength:255, }, 
    SDT:{type:String, maxlength:20, },
    DiaChi:{type:String, maxlength:255, },
    email:{type:String, maxlength:255, },
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'KhachHang'
},
    {timestamps:true }
)

module.exports = mongoose.model('KhachHang',KhachHangSchema);