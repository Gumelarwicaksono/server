// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Membuat model daerah
// const Region = mongoose.model(
//   'Region',
//   new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     code: {
//       type: String,
//       required: true,
//     },
//     parentCode: {
//       type: String,
//       required: true,
//     },
//   })
// );

// // Mendapatkan semua daerah
// router.get('/regions', async (req, res) => {
//   const regions = await Region.find();
//   res.send(regions);
// });

// // Menambah daerah baru
// router.post('/regions', async (req, res) => {
//   const region = new Region({
//     name: req.body.name,
//     code: req.body.code,
//     parentCode: req.body.parentCode,
//   });

//   await region.save();
//   res.send(region);
// });

// // Mengupdate daerah
// router.put('/regions/:id', async (req, res) => {
//   const region = await Region.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       code: req.body.code,
//       parentCode: req.body.parentCode,
//     },
//     { new: true }
//   );

//   res.send(region);
// });

// // Menghapus daerah
// router.delete('/regions/:id', async (req, res) => {
//   const region = await Region.findByIdAndRemove(req.params.id);
//   res.send(region);
// });

// module.exports = router;

const router = require('express').Router();
const mongoose = require('mongoose');

// Define MongoDB schema
const regionSchema = new mongoose.Schema({
  lokasi: {
    type: String,
  },
  kode_induk: {
    type: String,
  },
});

// Compile schema into a model
const Region = mongoose.model('Region', regionSchema);

// Define API endpoint for retrieving data
router.get('/regions/:lokasi', (req, res) => {
  const lokasi = req.params.lokasi;
  const kodeInduk = req.query.kode_induk;

  Region.findOne({ lokasi, kodeInduk }, (error, region) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (!region) {
      return res.status(404).send({ message: 'Region not found' });
    }

    res.send(region);
  });
});

// Define API endpoint for creating data
router.post('/regions', (req, res) => {
  const region = new Region(req.body);

  region.save((error, region) => {
    if (error) {
      return res.status(500).send(error);
    }

    res.send(region);
  });
});

// Define API endpoint for updating data
router.put('/regions/:lokasi', (req, res) => {
  const lokasi = req.params.lokasi;
  const kodeInduk = req.query.kode_induk;

  Region.findOneAndUpdate({ lokasi, kodeInduk }, req.body, (error, region) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (!region) {
      return res.status(404).send({ message: 'Region not found' });
    }

    res.send(region);
  });
});

// Define API endpoint for deleting data
router.delete('/regions/:lokasi', (req, res) => {
  const lokasi = req.params.lokasi;
  const kodeInduk = req.query.kode_induk;

  Region.findOneAndDelete({ lokasi, kodeInduk }, (error, region) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (!region) {
      return res.status(404).send({ message: 'Region not found' });
    }

    res.send({ message: 'Region deleted' });
  });
});

module.exports = router;
