const { type } = require('express/lib/response');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const NhanVienSchema= new Schema({
    MaNhanVien:{type:String, maxlength:20,},
    HoTenNV:{type:String, maxlength:255,},
    NgaySinh:{type:Date, },
    DiaChi:{type:String, maxlength:255,},
    NgayVaoLam:{type:Date, },
    SDT:{type:String,},
    CCCD:{type:String, },
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'NhanVien'
},
    {timestamps:true }
)

module.exports = mongoose.model('NhanVien',NhanVienSchema);