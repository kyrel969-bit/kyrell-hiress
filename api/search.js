
export default function handler(req, res) {
  // Hanya menerima permintaan GET
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  // Mengambil kata kunci pencarian
  const query = req.query.q || "";

  // Belum ada sumber musik yang terhubung
  return res.status(200).json({
    tracks: []
  });
}
