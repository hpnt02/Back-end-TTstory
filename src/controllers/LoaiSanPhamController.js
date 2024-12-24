

const LoaiSanPham = require('../model/LoaiSanPham')


const LoaiSanPhamController = {

    getLoaiSanPham: async (req, res) => {
        try {
            const loaiSanPham = await LoaiSanPham.find();
            res.status(200).json(loaiSanPham);
        } catch (err) {
            res.status(500).json(err);
        }
      },

      createLoaiSanPham: async(req, res) =>{  
           
            try{
            const newLoaiSanPham = await new LoaiSanPham({
                nameLoaiSP: req.body.nameLoaiSP,
            });      
            //Save to DB
            const loaiSanPham = await newLoaiSanPham.save();
           return res.status(200).json(loaiSanPham)
      }catch(err){
           return res.status(500).json(err)
      }
    },

}



module.exports = LoaiSanPhamController;