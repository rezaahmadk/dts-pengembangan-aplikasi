import mongoose from 'mongoose';

const rkhSchema = new mongoose.Schema(
  {
    jenis_kegiatan: {
        type: String,
        required: true,
    },
    keterangan_kegiatan: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    finish_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    quality_check: {
        type: Boolean,
        required: false,
    },
    userid: {
        type: String, 
        required: true
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('RKH', rkhSchema);

export default User;