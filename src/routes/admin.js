const LoaiSanPhamController = require('../controllers/LoaiSanPhamController')
const NhaCungCapController = require('../controllers/NhaCungCapController')
const ProductController = require('../controllers/ProductController')
const OrderItemController = require('../controllers/OrderItemController')
const NhanVienController = require('../controllers/NhanVienController')

const router = require('express').Router()
const middleWareController = require('../controllers/middleWareController')
const HoaDonController = require('../controllers/HoaDonController')
const KhachHangController = require('../controllers/KhachHangController')
const TestController = require('../controllers/TestController')
const ImagesController = require('../controllers/ImagesController')
const DanhGiaController = require('../controllers/DanhGiaController')




//Thêm mới
router.post("/loaisanpham/create", LoaiSanPhamController.createLoaiSanPham)
router.post("/nhacungcap/create", NhaCungCapController.createNhaCungCap)
router.post("/sanpham/create", ProductController.createProduct)
router.post("/orderItem/create", OrderItemController.createOrderItem)
router.post("/nhanvien/create", NhanVienController.createNhanVien)
// router.post("/hoadon/create", HoaDonController.createHoaDon)
router.post("/hoadon/create", TestController.createTest)
router.post("/images/create", ImagesController.createImage)
router.post("/danhgia/create", DanhGiaController.createDanhGia)


//Lấy thông tin
router.get("/sanpham" ,ProductController.getProduct)
router.get("/nhanvien" ,NhanVienController.getNhanVien)
router.get("/nhacungcap" ,NhaCungCapController.getNhaCungCap)
router.get("/loaisanpham" ,LoaiSanPhamController.getLoaiSanPham)
router.get("/hoadon" ,HoaDonController.getHoaDon)
router.get("/khachhang" ,KhachHangController.getKhachHang)
router.get("/chitiethoadon" ,OrderItemController.getChiTietHoaDon)
router.get("/account" ,KhachHangController.getAccount)
router.get("/search",ProductController.searchProducts)
router.get("/danhgia",DanhGiaController.getDanhGia)


//Cập nhập thông tin
router.put("/:id/orderItem",  OrderItemController.updateOrderItem)
router.put("/:id/nhanvien",  NhanVienController.updateNhanVien)
router.put("/:id/sanpham", ProductController.updateSanPham)
router.put("/:id/hoadon", HoaDonController.updateHoaDon)

//Xóa thông tin
router.delete("/:id/deleteorderItem",middleWareController.verifyToken,  OrderItemController.deleteOrderItem)
router.delete("/:id/deletenhanvien", middleWareController.verifyToken, NhanVienController.deleteNhanVien)
router.delete("/:id/deletesanpham", middleWareController.verifyToken, ProductController.deleteSanPham)


module.exports = router