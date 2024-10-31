import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/experience', (req, res) => {
  res.render('experience');
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.get('/certificates', (req, res) => {
  res.render('certificates');
});

app.get('/artist', (req, res) => {
  res.render('artist');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Contact form submission
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sasindu.diluranga@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'sasindu.diluranga@gmail.com',
    subject: `Portfolio Contact: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// CV download route
app.get('/download/cv', (req, res) => {
  const file = join(__dirname, '../public/files/cv.pdf');
  res.download(file, 'Sasindu_Diluranga_CV.pdf');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});