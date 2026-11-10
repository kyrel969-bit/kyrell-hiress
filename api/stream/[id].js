export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const trackId = req.query.id;

  return res.status(501).json({
    error: "Streaming source not connected",
    trackId: trackId
  });
}
