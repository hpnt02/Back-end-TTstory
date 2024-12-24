

const Image = require("../model/Image");

const ImageController = {
  createImage: async (req, res) => {
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
      return res.status(200).json(image);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Lấy thông tin sản phẩm
  getImage: async (req, res) => {
    try {
      const image = await Image.find();
      res.status(200).json(image);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};

module.exports = ImageController;

