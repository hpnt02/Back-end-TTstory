
const bcrypt = require("bcrypt");
const NhanVien = require('../model/NhanVien')
const User = require("../model/User");

const  moment =require('moment')
const parseDate = (dateString) => {
  if (!dateString) {
    throw new Error("dateString is undefined or empty");
  }

  const parts = dateString.split('/');
  if (parts.length !== 3) {
    throw new Error("Invalid date format. Expected format: DD/MM/YYYY");
  }

  const [day, month, year] = parts.map(Number); // Chuyển đổi chuỗi thành số
  return new Date(year, month - 1, day); // Tháng - 1 vì tháng bắt đầu từ 0
};

const NhanVienController = {

     //Lấy danh sách nhân viên
     getNhanVien: async (req, res) => {
      try {
          const nhanvien = await NhanVien.find();
  
          // Định dạng NgaySinh
          const newNhanVien = nhanvien.map(nv => ({
              ...nv.toObject(), // Chuyển đổi Mongoose Document thành Object thường
              NgaySinh: moment(nv.NgaySinh).format('DD/MM/YYYY'), // Định dạng ngày tháng
              NgayVaoLam: moment(nv.NgayVaoLam).format('DD/MM/YYYY'), // Định dạng ngày tháng
          }));
  
          res.status(200).json(newNhanVien);
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Có lỗi xảy ra", error: err });
      }
  },
        //Thêm mới nhân viên
      createNhanVien: async(req, res) =>{  
            const ngaySinh = moment.utc(req.body.NgaySinh, 'DD/MM/YYYY').toDate();
            const ngayVaoLam = moment.utc(req.body.NgayVaoLam, 'DD/MM/YYYY').toDate();
            try{
            const newNhanVien = await new NhanVien({
            MaNhanVien: req.body.MaNhanVien,
            HoTenNV: req.body.HoTenNV,
            NgaySinh: ngaySinh,
            DiaChi: req.body.DiaChi,
            NgayVaoLam: ngayVaoLam,
            SDT: req.body.SDT,
            CCCD: req.body.CCCD,
            });      
            //Save to DB
            const nhanvien = await newNhanVien.save();
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            const newUser = await new User({
              userName: req.body.userName,
              password: hashed,
              rule: true,
              NhanVien:  nhanvien._id ,
              KhachHang: null ,
            });
             const user = await newUser.save();
          
           return res.status(200).json(user)
      }catch(err){
           return res.status(500).json(err)
      }
    },

    //Chỉnh sửa thông tin nhân viên
    updateNhanVien: async (req, res) => {
      try {
        const nhanVien = await NhanVien.findByIdAndUpdate(
          req.params.id, // ID của nhân viên cần cập nhật
          { 
            MaNhanVien: req.body.MaNhanVien,
            HoTenNV: req.body.HoTenNV,
            NgaySinh:req.body.NgaySinh? parseDate(req.body.NgaySinh) : req.body.NgaySinh,
            DiaChi: req.body.DiaChi,
            NgayVaoLam:req.body.NgayVaoLam? parseDate(req.body.NgayVaoLam) : req.body.NgayVaoLam,
            SDT: req.body.SDT,
            CCCD: req.body.CCCD,
            updateAt: Date.now()
          },
          { new: true } 
        );
    
        if (!nhanVien) {
          return res.status(404).json({ message: "Không tìm thấy nhân viên" });
        }
        return res.status(200).json(nhanVien);
      } catch (err) {
        console.error("Error updating employee:", err); // Ghi log thông tin lỗi
        return res.status(500).json({ message: "Đã xảy ra lỗi trên server", error: err.message });
      }
    },

    //Xóa nhân viên
    deleteNhanVien: async (req, res) =>{
      try{
           await NhanVien.findByIdAndDelete({ _id: req.params.id })
         res.status(200).json("Thành công") 
      } catch(err){
          res.status(500).json(err)
      }
    },
    
}



module.exports = NhanVienController;