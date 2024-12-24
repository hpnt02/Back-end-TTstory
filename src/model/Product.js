
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const ProductSchema= new Schema({
    key:{type:String},
    nameProduct:{type:String, maxlength:255, required: true}, 
    Number:{type:Number,required: true},
    PriceProduct:{type: Number,required: true},
    describe:{type: String},
    Image:{type: mongoose.Schema.Types.ObjectId, ref:'Image'},
    NhaCungCap:{type:String, ref:"NhaCungCap"},
    LoaiSanPham:{type:String, ref:"LoaiSanPham"},
    ThanhPhan:{type:String}, 
    HuongDanSuDung:{type:String},
    DungTich:{type: String},
    HanSD:{type: String},
    KhuyenMai: { type: Number },
    GiaBanRa:{type: Number},
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'Product'
},
    {timestamps:true }
)

module.exports = mongoose.model('Product',ProductSchema);