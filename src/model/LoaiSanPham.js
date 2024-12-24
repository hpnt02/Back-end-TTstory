
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const LoaiSanPhamSchema= new Schema({
    nameLoaiSP:{type:String, maxlength:255, required: true}, 
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'LoaiSanPham'
},
    {timestamps:true }
)

module.exports = mongoose.model('LoaiSanPham',LoaiSanPhamSchema);