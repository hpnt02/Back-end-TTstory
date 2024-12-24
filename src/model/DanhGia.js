
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const DanhGiaSchema= new Schema({
    KhachHang:{
        type: String, ref: 'KhachHang'   
     }, 
     Product:{type:String, ref:'Product'},
     Rate:{type: Number},
     GhiChu:{type:String},
     Images: {
        type: [String] // Mảng các chuỗi
    },
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'DanhGia'
},
    {timestamps:true }
)

module.exports = mongoose.model('DanhGia',DanhGiaSchema);