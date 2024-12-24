const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const KhachHang = require("../model/KhachHang");
const NhanVien = require("../model/NhanVien");
const moment = require("moment");

let refreshTokens = [];

const authController = {
  createAccount: async (req, res) => {
      try {

        const existingUser = await User.findOne({ userName: req.body.userName });
        if (existingUser) {
          return res.status(400).json({ message: "Đã tồn tại" });
        }

            const newKhachHang = await new KhachHang({
              HoTenKH: req.body.HoTenKH,
              SDT: req.body.SDT,
              DiaChi: req.body.DiaChi,
              email: req.body.email,
            });
          
            // Save to DB
            const khachhang = await newKhachHang.save();
            
            const ngaySinh = moment.utc(req.body.NgaySinh, "DD/MM/YYYY").toDate();
            const ngayVaoLam = moment.utc(req.body.NgayVaoLam, "DD/MM/YYYY").toDate();
            
            const newNhanVien = await new NhanVien({
              MaNhanVien: req.body.MaNhanVien,
              HoTenNV: req.body.HoTenNV,
              NgaySinh: req.body.rule ? ngaySinh : null,
              DiaChi: req.body.DiaChi,
              NgayVaoLam: req.body.rule ? ngayVaoLam: null,
              SDT: req.body.SDT,
              CCCD: req.body.CCCD,
            });
          
            // Save to DB
            const nhanvien = await newNhanVien.save();
          
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
          
            const newUser = await new User({
              userName: req.body.userName,
              password: hashed,
              rule: req.body.rule,
              NhanVien: req.body.rule ? nhanvien._id : null,
              KhachHang: req.body.rule ? null : khachhang._id,
            });
          
            // Save to DB
            const user = await newUser.save();
          
            return res.status(200).json(user);
          } catch (error) {
            console.error(error); // Log the error
            return res.status(500).json({ message: "An error occurred", error: error.message });
          }
  },

  //Generate Access Taken
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "30d",
      }
    );
  },
  //Generate Refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },

  //LOGIN
  login: async (req, res) => {
    try {
      // const HocSinh = await HocSinh.findOne({TaiKhoan: req.body.TaiKhoan})
      const user = await User.findOne({ userName: req.body.userName });
      user.TrangThai = true;
        await user.save()
      await user.save(); // Lưu thay đổi v
      if (user.rule === true) {
        await user.populate("NhanVien");
      } else if (user.rule === false) {
        await user.populate("KhachHang");
      }
      if (!user) {
        return res.status(404).json("Wrong username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).json("Refresh token is valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      refreshTokens.push(refreshToken);

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logOut: async (req, res) => {
    try {
        // Clear the refresh token cookie
        res.clearCookie("refreshToken");

        // Update the user's status and last logged in time
        const userId = req.user.id; // Assuming you have the user ID in the request
        await User.findByIdAndUpdate(userId, { 
            TrangThai: false, 
            lastLoggedIn: Date.now() 
        });

        // Remove the token from the array
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        );

        res.status(200).json("Logged out!");
    } catch (error) {
        console.error(error);
        res.status(500).json("An error occurred while logging out.");
    }
}
};

module.exports = authController;
