import express from 'express';
import bodyParser from 'body-parser';
import RKH from '../models/RKH.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// ADD RKH
router.post('/add', async (req, res) => {
    try {
        const{jenis_kegiatan, keterangan_kegiatan, start_date, finish_date, status, link, userid } = req.body;

        RKH.create({
            jenis_kegiatan : jenis_kegiatan,
            keterangan_kegiatan : keterangan_kegiatan,
            start_date : start_date,
            finish_date : finish_date,
            status : status,
            link : link,
            userid : userid
        }, 
        function (err, user) {
            if (err) {
                res.status(500).send({ auth: true, message: 'Data RKH Gagal Disimpan!' });
            } else {
                res.status(200).json({ auth: true, message: 'Data RKH Disimpan!', data: user });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// READ RKH BY USER ID
router.get('/:id', async (req, res) => {
    try {
        const daftarRKH = await RKH.find({userid: req.params.id});

        if(daftarRKH){
            res.status(200).send({ auth: true, data: daftarRKH });
        } else {
            res.status(201).json({ auth: true, status: "RKH Tidak Ditemukan" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE RKH
router.put('/update/:id', async (req, res) => {
    try {
        const{jenis_kegiatan, keterangan_kegiatan, start_date, finish_date, status, link, userid } = req.body;
        const daftarRKH = await RKH.findById(req.params.id);

        if(daftarRKH){
            daftarRKH.jenis_kegiatan = jenis_kegiatan;
            daftarRKH.keterangan_kegiatan = keterangan_kegiatan;
            daftarRKH.start_date = start_date;
            daftarRKH.finish_date = finish_date;
            daftarRKH.status = status;
            daftarRKH.link = link;
            daftarRKH.userid = userid;

            const updatedRKH = await daftarRKH.save();
            res.status(200).json({ auth: true, message: 'Data RKH Diubah!', data: updatedRKH });
        } else {
            res.status(404).json({ auth: true, message: 'RKH Tidak Ditemukan!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE RKH
router.delete('/delete/:id', async (req, res) => {
    try {
        const daftarRKH = await RKH.findById(req.params.id);

        if(daftarRKH){
            await daftarRKH.remove();
            res.json({ auth: true, message: 'Data RKH Dihapus!' });
        } else {
            res.status(404).json({ auth: true, message: 'RKH Tidak Ditemukan' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;