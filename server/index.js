const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the sendgrid email server");
});

app.get("/send-email", (req, res) => {
  const { recipient, sender, subject, text } = req.query;
  const msg = {
    to: recipient,
    from: sender,
    subject: subject,
    text: text,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("emails sent successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
