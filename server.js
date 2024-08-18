const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const telegramToken = '7206464827:AAEDnkJSGJ6_53wnEAk8Gf36Oh55em0B_Y4';
const chatId = '1873800563';

const corsOptions = {
  origin: ['http://localhost:3000', 'https://localserver-3dc89a41feaf.herokuapp.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await axios.post(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        chat_id: chatId,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone},\nMessage: ${message}`,
      }
    );

    res.status(200).send('Message sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
