const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// AWS S3 configuratie
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer configuratie voor bestandsuploads
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Max 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Alleen afbeeldingen zijn toegestaan'));
    }
  }
});

// Routes
app.post('/api/bookings', upload.single('idCard'), async (req, res) => {
  try {
    const { name, email, phone, period, startDate, cabinId } = req.body;
    let idCardUrl = null;

    // Upload ID kaart naar S3 als het een dagboeking is
    if (period === 'day' && req.file) {
      const key = `id-cards/${Date.now()}-${req.file.originalname}`;
      
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }));

      idCardUrl = key;
    }

    // Hier zou je normaal de boeking in een database opslaan
    const booking = {
      name,
      email,
      phone,
      period,
      startDate,
      cabinId,
      idCardUrl
    };

    // Stuur bevestigingsmail (placeholder)
    console.log(`Bevestigingsmail verzonden naar ${email}`);

    res.json({
      success: true,
      message: 'Boeking succesvol verwerkt',
      booking
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Er ging iets mis bij het verwerken van uw boeking'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server draait op port ${PORT}`);
});
