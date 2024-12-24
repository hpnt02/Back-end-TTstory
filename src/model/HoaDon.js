


const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const generateMaHoaDon = () => {
    let maHoaDon = '';
    for (let i = 0; i < 12; i++) {
        maHoaDon += Math.floor(Math.random() * 10); // Sinh số từ 0 đến 9
    }
    return maHoaDon;
};

const HoaDonSchema= new Schema({
    IDHoaDon: { type: mongoose.Schema.Types.ObjectId} ,
    MaHoaDon: { type: String, default: generateMaHoaDon }, // Thêm trường MaHoaDon
    TenNguoiNhan:{type:String},
    SDT:{type:String},
    DiaChi:{type:String},
    GhiChu:{type:String},
    TrangThai:{type: Boolean, default: false},
    HoanThanh:{type: Boolean, default: false},
    NhanVien:{
        type: mongoose.Schema.Types.ObjectId, ref:'NhanVien'    
     }, 
     KhachHang:{
        type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang'   
     }, 
     ThanhTien:{type:Number},
     PhuongThucThanhToan:{type: Boolean},
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'HoaDon'
},
    {timestamps:true }
)

module.exports = mongoose.model('HoaDon',HoaDonSchema);