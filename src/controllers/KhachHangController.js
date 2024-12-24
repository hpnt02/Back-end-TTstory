


const KhachHang = require('../model/KhachHang')
const User = require('../model/User')


const KhachHangController = {

    getAccount: async (req, res) => {
        try {
            const accounts = await User.find({ KhachHang: { $ne: null } }).populate('KhachHang');
            res.status(200).json(accounts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Lấy thông tin sản phẩm
    getKhachHang: async (req, res) => {
        try {
            const khanhHang = await KhachHang.find();
            res.status(200).json(khanhHang);
        } catch (err) {
            res.status(500).json(err);
        }
      },

}



module.exports = KhachHangController;