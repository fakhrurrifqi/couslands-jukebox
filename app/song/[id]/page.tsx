import React from "react";
import TrackDetail from "@/components/TrackDetail";

async function getTrackInfoByMbid(id: string) {
  const res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=${id}&api_key=${process.env.LASTFM_API_KEY}&format=json`,
    { cache: "no-store" }
  );
  return res.json();
}

async function getTrackInfoByNameArtist(name: string, artist: string) {
  const res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(
      name
    )}&artist=${encodeURIComponent(artist)}&api_key=${
      process.env.LASTFM_API_KEY
    }&format=json`,
    { cache: "no-store" }
  );
  return res.json();
}

async function TrackPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  let data;

  if (/^[0-9a-fA-F-]{36}$/.test(id)) {
    data = await getTrackInfoByMbid(id);
    if (!data.error || data.track) {
      return <TrackDetail data={data} />;
    }
  }

  const [name, artist] = decodeURIComponent(id).split("-");
  data = await getTrackInfoByNameArtist(name, artist);

  return <TrackDetail data={data} />;
}

export default TrackPage;
