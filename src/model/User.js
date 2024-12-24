const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    userName:{type:String, maxlength:20}, 
    password:{type:String,minlengh:6,maxlength:255},   
    NhanVien:{
        type: mongoose.Schema.Types.ObjectId,   ref:'NhanVien'    
     }, 
     KhachHang:{
        type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang'   
     }, 
    rule:{
        type:Boolean
    },
    TrangThai:{
        type:Boolean, default: false
    },
    lastLoggedIn: {type : Date , default: Date.now},
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'User'
},
    {timestamps:true }
)

module.exports = mongoose.model('User',UserSchema);