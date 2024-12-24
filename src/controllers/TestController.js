

const OrderItem = require('../model/OrderItem')
const HoaDon = require('../model/HoaDon')
const mongoose = require('mongoose');
const TestController = {
    //Thêm mới giỏ hàng
    createTest: async (req, res) => {
        try {
            const { TenNguoiNhan, SDT, DiaChi, TrangThai, GhiChu, NhanVien, KhachHang, ThanhTien, HoanThanh, PhuongThucThanhToan } = req.body;
    
            // Kiểm tra các trường bắt buộc
            if (!TenNguoiNhan || !SDT || !DiaChi || !KhachHang || ThanhTien == null) {
                return res.status(400).json({ message: "Các trường TenNguoiNhan, SDT, DiaChi, KhachHang và ThanhTien là bắt buộc." });
            }
    
            // Tạo ID cho hóa đơn mới
            const hoaDonId = new mongoose.Types.ObjectId();
    
            // Cập nhật tất cả các OrderItem có IDHoaDon là null cho KhachHang nhất định
            const updatedOrderItems = await OrderItem.updateMany(
                { IDHoaDon: null, KhachHang: KhachHang },
                { $set: { IDHoaDon: hoaDonId } }
            );
    
            // Tạo hóa đơn mới
            const newHoaDon = new HoaDon({
                IDHoaDon: hoaDonId,
                TenNguoiNhan,
                SDT,
                DiaChi,
                TrangThai,
                HoanThanh,
                GhiChu: GhiChu || "",
                NhanVien: NhanVien || null,
                KhachHang: KhachHang,
                ThanhTien,
                PhuongThucThanhToan
            });
    
            // Lưu hóa đơn
            const hoaDon = await newHoaDon.save();
    
            // Trả về hóa đơn đã tạo
            return res.status(201).json(hoaDon);
        } catch (err) {
            return res.status(500).json({ message: "Có lỗi xảy ra.", error: err.message });
        }
    }
}

module.exports = TestController;