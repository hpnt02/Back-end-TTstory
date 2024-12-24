const Product = require("../model/Product");
const Image = require("../model/Image")
const ProductController = {
  createProduct: async (req, res) => {
    try {
      const newImage = await new Image({
        Image1: req.body.Image1,
        Image2: req.body.Image2,
        Image3: req.body.Image3,
        Image4: req.body.Image4,
        Image5: req.body.Image5,
      });
      //Save to DB
      const image = await newImage.save();

      const priceString = req.body.PriceProduct; // giá nhập vào là chuỗi ví dụ: "95.000.000"
      const priceNumber = parseFloat(
        priceString.replace(/\./g, "").replace(",", ".")
      );
      const khuyenMai = req.body.KhuyenMai; // Nhận giá trị khuyến mãi từ yêu cầu

      // Tính giá bán ra
      const giaBanRa = priceString - priceString * (khuyenMai / 100);
      const newProduct = await new Product({
        nameProduct: req.body.nameProduct,
        Number: req.body.Number,
        PriceProduct: priceNumber,
        describe: req.body.describe,
        Image:image._id,
        NhaCungCap: req.body.NhaCungCap,
        LoaiSanPham: req.body.LoaiSanPham,
        ThanhPhan: req.body.ThanhPhan,
        HuongDanSuDung: req.body.HuongDanSuDung,
        DungTich: req.body.DungTich,
        HanSD: req.body.HanSD,
        KhuyenMai: khuyenMai,
        GiaBanRa: khuyenMai ? giaBanRa :priceNumber , // Gán giá bán ra đã tính
      });
      //Save to DB
      const product = await newProduct.save();
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Lấy thông tin sản phẩm
  getProduct: async (req, res) => {
    try {
      const product = await Product.find().sort({ Number: 1 }).populate("Image");
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Chỉnh sửa thông tin sản phẩm
  updateSanPham: async (req, res) => {
    try {
      const sanPham = await Product.findById(req.params.id);
      
      if (!sanPham) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
  
      // Tính giá bán ra mới
      const giaBanRaMoi = sanPham.PriceProduct - (sanPham.PriceProduct * (req.body.KhuyenMai / 100));
      
      // Cập nhật thông tin hình ảnh
      const updatedImage = await Image.findByIdAndUpdate(
        sanPham.Image, // Assuming sanPham.Image is the ID of the existing Image document
        {
          Image1: req.body.Image1 !== undefined ? req.body.Image1 : null,
          Image2: req.body.Image2 !== undefined ? req.body.Image2 : null, // Cập nhật thành null nếu không có dữ liệu
          Image3: req.body.Image3 !== undefined ? req.body.Image3 : null,
          Image4: req.body.Image4 !== undefined ? req.body.Image4 : null,
          Image5: req.body.Image5 !== undefined ? req.body.Image5 : null,
          updateAt: Date.now()
        },
        { new: true }
      );
  
      // Cập nhật sản phẩm
      const updatedSanPham = await Product.findByIdAndUpdate(
        req.params.id,
        {
          nameProduct: req.body.nameProduct,
          Number: req.body.Number,
          PriceProduct: req.body.PriceProduct,
          describe: req.body.describe,
          Image: updatedImage._id, // Update to the new image
          NhaCungCap: req.body.NhaCungCap,
          LoaiSanPham: req.body.LoaiSanPham,
          ThanhPhan: req.body.ThanhPhan,
          HuongDanSuDung: req.body.HuongDanSuDung,
          DungTich: req.body.DungTich,
          HanSD: req.body.HanSD,
          KhuyenMai: req.body.KhuyenMai,
          GiaBanRa: giaBanRaMoi ||req.body.PriceProduct , // Cập nhật giá bán ra mới
          updateAt: Date.now()
        },
        { new: true }
      );
  
      return res.status(200).json(updatedSanPham);
    } catch (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ message: "Đã xảy ra lỗi trên server", error: err.message });
    }
  },
  //Xóa sản phẩm
  deleteSanPham: async (req, res) => {
    try {
      await Product.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //=============================TÌm kiếm============================
 searchProducts : async (req, res) => {
    const { q, type = 'less' } = req.query;

    // Kiểm tra xem query có tồn tại không
    if (!q) {
        return res.status(400).send('Thiếu truy vấn tìm kiếm.');
    }

    try {
        // Tìm kiếm sản phẩm trong cơ sở dữ liệu
        const result = await Product.find({
            nameProduct: { $regex: q, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
        }).populate("Image");

        // Nếu type là 'less', chỉ trả về một số lượng giới hạn
        const response = type === 'less' ? result.slice(0, 2) : result;

        res.json(response);
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).send('Có lỗi xảy ra trong quá trình tìm kiếm.');
    }
}
};

module.exports = ProductController;
