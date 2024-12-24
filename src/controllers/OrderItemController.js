

const OrderItem = require('../model/OrderItem')
const mongoose = require('mongoose');
const OrderItemController = {
    //Thêm mới giỏ hàng
    createOrderItem: async (req, res) => {
        
      try{
        const newOrderItems = await new OrderItem({
            KhachHang: req.body.KhachHang,
            Number: req.body.Number,
            PriceProduct: req.body.PriceProduct,
            Product: req.body.Product,
            IDHoaDon: null
        });      
        //Save to DB
        const orderItems = await newOrderItems.save();
       return res.status(200).json(orderItems)
  }catch (err) {
          return res.status(500).json({ message: "Có lỗi xảy ra.", error: err.message });
      }
  },
    //Chỉnh sửa thông tin
    updateOrderItem: async (req, res) => {
        try {
          const orderItem = await OrderItem.findByIdAndUpdate(
            req.params.id, // 
            {  Number: req.body.Number,
              KhachHang: req.body.KhachHang,
            PriceProduct: req.body.PriceProduct,
            Product: req.body.Product,
               updateAt: Date.now()
             },
            // Dữ liệu mới cho trường MaHS
            { new: true } // Tùy chọn để trả về học sinh đã được cập nhật
          );
          if (!orderItem) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
          }
          return res.status(200).json(orderItem);
        } catch (err) {
          return res.status(500).json(err);
        }
      },

      //Xóa sản phẩm trong giỏ hàng
      deleteOrderItem: async (req, res) =>{
        try{
             await OrderItem.findByIdAndDelete({ _id: req.params.id })
           res.status(200).json("Thành công") 
        } catch(err){
            res.status(500).json(err)
        }
      },
      getChiTietHoaDon: async (req, res) => {
        try {
            const chiTietHoaDon = await OrderItem.find();
            res.status(200).json(chiTietHoaDon);
        } catch (err) {
            res.status(500).json(err);
        }
      },
      
}



module.exports = OrderItemController;