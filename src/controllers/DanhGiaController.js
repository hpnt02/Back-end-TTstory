

const DanhGia = require('../model/DanhGia')


const DanhGiaController = {

    getDanhGia: async (req, res) => {
        try {
            const danhCap = await DanhGia.find();
            res.status(200).json(danhCap);
        } catch (err) {
            res.status(500).json(err);
        }
      },

      createDanhGia: async(req, res) =>{  
        try{
        const newDanhGia = await new DanhGia({
            KhachHang: req.body.KhachHang,
            Product: req.body.Product,
            Rate: req.body.Rate,
            GhiChu: req.body.GhiChu,
            Images: req.body.Images,
        });      
        //Save to DB
        const danhGia = await newDanhGia.save();
       return res.status(200).json(danhGia)
  }catch(err){
       return res.status(500).json(err)
  }
},
}

module.exports = DanhGiaController;