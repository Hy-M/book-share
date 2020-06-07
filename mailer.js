const sender = "annzy_12@hotmail.com";
const receiver = "anisa_patel@live.co.uk";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: receiver, // replace these with your email addresses
  from: sender,
  subject: "🍩 Donuts, at the big donut 🍩",
  text: "Fresh donuts are out of the oven. Get them while they’re hot!",
  html:
    "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("emails sent successfully!");
  })
  .catch((error) => {
    console.log(error);
  });
