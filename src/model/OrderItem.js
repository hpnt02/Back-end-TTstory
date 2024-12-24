
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const OrderItemSchema= new Schema({
    KhachHang:{type:String,required: true},
    Number:{type:Number,required: true},
    PriceProduct:{type: Number,required: true},
    Product:{ type:String, ref:"Product"},
    IDHoaDon: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() } ,
    createAt: {type : Date , default: Date.now},
    updateAt: {type : Date , default: Date.now}
},{
    collection:'OrderItem'
},
    {timestamps:true }
)

module.exports = mongoose.model('OrderItem',OrderItemSchema);