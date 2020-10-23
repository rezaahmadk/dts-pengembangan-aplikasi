import express from 'express';
import bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';
import bodyParser from 'body-parser';
import User from '../models/User.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// ADD User
router.post('/add', async (req, res) => {
    try {
        const{namalengkap, password, role} = req.body;

        const idLenght = 10;
        const userID = await customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-',idLenght)

        const saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);

        User.create({
            namalengkap : namalengkap,
            userID : userID(),
            password : hashedPw,
            role : role
        }, 
        function (err, user) {
            if (err) {
                res.status(500).send({ auth: true, message: 'Data User Gagal Disimpan!' });
            } else {
                res.status(200).json({ auth: true, message: 'Data User Disimpan!', data: user });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE User BY ID
router.put('/update/:id', async (req, res) => {
    try {
        const{namalengkap, password, role} = req.body;

        const saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);

        const user = await User.findById(req.params.id);

        if (user) {
            switch (user.role) {
                case 0: // CASE BOSS
                    user.namalengkap = namalengkap;
                    user.password = hashedPw;
                    user.role = role;
                
                    const updatedbyBoss = await user.save();
                
                    res.status(200).json({ auth: true, message: 'Data User Diubah!', data: updatedbyBoss });
                    break;

                case 1: // CASE ADMIN
                    user.namalengkap = namalengkap;
                    user.password = hashedPw;
                    user.role = role;
                
                    const updatedbyAdmin = await user.save();
                
                    res.status(200).json({ auth: true, message: 'Data User Diubah!', data: updatedbyAdmin });
                    break;
    
                case 2: // CASE PEGAWAI
                    user.namalengkap = namalengkap;
                    user.password = hashedPw;
                
                    const updatedbyUser = await user.save();
                
                    res.status(200).json({ auth: true, message: 'Data User Diubah!', data: updatedbyUser });
                    break;
                
                default:
                    res.status(500).json({ auth: false, message: "Tidak Memiliki Wewenang!"});
                    break;
            }
        } else {
            res.status(404).json({ auth: true, message: 'User Tidak Ditemukan!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE User by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(user){
            await user.remove();
            res.json({ auth: true, message: 'Data User Dihapus!' });
        } else {
            res.status(404).json({ auth: true, message: 'User Tidak Ditemukan' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;