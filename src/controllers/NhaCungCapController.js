

const NhaCungCap = require('../model/NhaCungCap')


const NhaCungCapController = {

    getNhaCungCap: async (req, res) => {
        try {
            const nhaCungCap = await NhaCungCap.find();
            res.status(200).json(nhaCungCap);
        } catch (err) {
            res.status(500).json(err);
        }
      },

      createNhaCungCap: async(req, res) =>{  
            try{
            const newNhaCungCap = await new NhaCungCap({
                nameNCC: req.body.nameNCC,
                SDTNCC: req.body.SDTNCC,
                DiaChiNCC: req.body.DiaChiNCC,
                emailNCC: req.body.emailNCC,
                Image:req.body.Image,
            });      
            //Save to DB
            const nhaCungCap = await newNhaCungCap.save();
           return res.status(200).json(nhaCungCap)
      }catch(err){
           return res.status(500).json(err)
      }
    },

}



module.exports = NhaCungCapController;