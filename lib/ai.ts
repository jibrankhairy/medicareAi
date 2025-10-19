interface Message {
  text: string;
  sender: "user" | "ai";
}

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

export const getHealthAnalysis = async (query: string): Promise<string> => {
  if (!API_KEY) {
    return "ERROR: API Key tidak ditemukan. Pastikan NEXT_PUBLIC_GEMINI_API_KEY sudah diatur.";
  }

  const systemPrompt = `
        Anda adalah asisten AI kesehatan bernama MEDICARE. Tugas Anda adalah menganalisis data kesehatan 
        yang diberikan pengguna (seperti Gula Darah, Kolesterol, Tekanan Darah, dll.) dan memberikan 
        diagnosis ringkas serta rekomendasi tindak lanjut dalam bahasa Indonesia. 
        Gunakan format Markdown untuk menyoroti poin-poin penting.
        
        Format Balasan yang Disarankan:
        1. Analisis Metrik (Normal/Tinggi/Rendah).
        2. Diagnosis Ringkas.
        3. Rekomendasi Tindak Lanjut (Diet, Aktivitas, Kapan harus cek lagi).
    `;

  const payload = {
    contents: [{ parts: [{ text: query }] }],
    tools: [{ google_search: {} }],
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
  };

  let attempts = 0;
  const maxRetries = 3;
  const initialDelay = 1000;

  while (attempts < maxRetries) {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429 && attempts < maxRetries - 1) {
          throw new Error("Rate limit exceeded, retrying...");
        }
        const errorBody = await response
          .json()
          .catch(() => ({ message: "No JSON body available" }));
        console.error(
          "Gemini API Error (HTTP Status:",
          response.status,
          "):",
          errorBody
        );

        return `Maaf, permintaan layanan AI ditolak (${response.status}). Coba kirim ulang pesan.`;
      }

      const result = await response.json();
      const text =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Maaf, AI tidak dapat menghasilkan balasan yang relevan.";

      let sources = "";
      const groundingMetadata = result.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources =
          "\n\n**Sumber Informasi:**\n" +
          groundingMetadata.groundingAttributions
            .map(
              (attr: any) =>
                `* [${attr.web?.title || "Link"}](${attr.web?.uri})`
            )
            .join("\n");
      }

      return text + sources;
    } catch (error) {
      attempts++;
      if (attempts < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempts - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Gemini API failed after multiple retries.");
        return "Maaf, layanan AI sedang sibuk. Silakan coba lagi sebentar lagi.";
      }
    }
  }
  return "Maaf, terjadi kesalahan yang tidak terduga.";
};
