
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const trackId = req.query.id;

  if (!trackId) {
    return res.status(400).json({
      error: "Track ID is required"
    });
  }

  try {
    const streamURL =
      `https://api.audius.co/v1/tracks/${encodeURIComponent(trackId)}/stream`;

    return res.status(200).json({
      url: streamURL,
      format: "mp3",
      quality: "HIGH",
      codec: "mp3",
      container: "mp3",
      manifest: "none",
      encrypted: false
    });

  } catch (error) {
    return res.status(502).json({
      error: "Unable to resolve stream"
    });
  }
}
