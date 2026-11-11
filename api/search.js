
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const query = req.query.q || "";

  if (!query.trim()) {
    return res.status(200).json({
      tracks: []
    });
  }

  try {
    const apiURL =
      `https://api.audius.co/v1/tracks/search?query=${encodeURIComponent(query)}`;

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Audius API request failed");
    }

    const result = await response.json();

    const tracks = (result.data || []).map((track) => ({
      id: String(track.track_id),
      title: track.title,
      artist: track.user?.name || "Unknown Artist",
      duration: track.duration || 0,
      artworkURL:
        track.artwork?.["480x480"] ||
        track.artwork?.["150x150"] ||
        undefined,
      format: "mp3",
      audioQuality: "HIGH"
    }));

    return res.status(200).json({ tracks });

  } catch (error) {
    return res.status(502).json({
      error: "Unable to search Audius",
      details: error.message
    });
  }
}
