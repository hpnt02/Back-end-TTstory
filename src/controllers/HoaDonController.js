

const HoaDon = require('../model/HoaDon')

const HoaDonController = {

  //Lấy thông tin hóa đơn
  getHoaDon: async (req, res) => {
    try {
        const hoaDon = await HoaDon.find();
        res.status(200).json(hoaDon);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  //Thêm mới hóa đơn
      createHoaDon: async(req, res) =>{  
            try{
            const newHoaDon = await new HoaDon({
                IDHoaDon: req.body.IDHoaDon,
                TenNguoiNhan: req.body.TenNguoiNhan,
                SDT: req.body.SDT,
                DiaChi: req.body.DiaChi,
                TrangThai: req.body.TrangThai,
                HoanThanh: req.body.HoanThanh,
                GhiChu: req.body.GhiChu || "", // Để trống nếu không có GhiChu
                NhanVien: req.body.NhanVien || null, // Trả về null nếu không có NhanVien
                KhachHang: req.body.KhachHang || null, // Trả về null nếu không có KhachHang
            });      
            //Save to DB
            const hoaDon = await newHoaDon.save();
           return res.status(200).json(hoaDon)
      }catch(err){
        console.error(err); // In ra lỗi để kiểm tra
        return res.status(500).json({ message: "Có lỗi xảy ra.", error: err.message });
      }
    },

    //Cập nhập hóa đơn
    updateHoaDon: async (req, res) => {
      try {
        const hoaDon = await HoaDon.findByIdAndUpdate(
          req.params.id, // ID của nhân viên cần cập nhật
          { 
            IDHoaDon: req.body.IDHoaDon,
            TenNguoiNhan: req.body.TenNguoiNhan,
            SDT: req.body.SDT,
            DiaChi: req.body.DiaChi,
            TrangThai: req.body.TrangThai,
            HoanThanh: req.body.HoanThanh,
            GhiChu: req.body.GhiChu || "", // Để trống nếu không có GhiChu
            NhanVien: req.body.NhanVien, 
            KhachHang: req.body.KhachHang, 
            ThanhTien: req.body.ThanhTien, 
            updateAt: Date.now()
          },
          { new: true } 
        );
        if (!hoaDon) {
          return res.status(404).json({ message: "Không tìm thấy nhân viên" });
        }
        return res.status(200).json(hoaDon);
      } catch (err) {
        console.error("Error updating employee:", err); // Ghi log thông tin lỗi
        return res.status(500).json({ message: "Đã xảy ra lỗi trên server", error: err.message });
      }
    },

}



module.exports = HoaDonController;