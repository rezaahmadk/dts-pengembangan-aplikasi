import express from 'express';
import bodyParser from 'body-parser';
import RKH from '../models/RKH.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// READ ALL RKH DATA
router.get('/', async (req, res) => {
    try {
        const daftarRKH = await RKH.find();

        if(daftarRKH){
            res.status(200).send({ auth: true, data: daftarRKH });
        } else {
            res.status(201).json({ auth: true, status: "RKH Tidak Ditemukan" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE RKH with QUALITY CHECK
router.put('/update/:id', async (req, res) => {
    try {
        const{ quality_check } = req.body;
        const daftarRKH = await RKH.findById(req.params.id);

        if(daftarRKH){
            daftarRKH.quality_check = quality_check;

            const updatedQC = await daftarRKH.save();
            res.status(200).json({ auth: true, message: 'Quality Check Ditambahkan!', data: updatedQC });
        } else {
            res.status(404).json({ auth: true, message: 'RKH Tidak Ditemukan!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;