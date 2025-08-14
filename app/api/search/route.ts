import { NextResponse } from "next/server";
import { LastFmTrack } from "@/app/page";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const searchRes = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(
      query
    )}&api_key=${process.env.LASTFM_API_KEY}&format=json`
  );

  const searchData = await searchRes.json();
  const tracks = (searchData.results?.trackmatches?.track || [])
    .sort(
      (a: LastFmTrack, b: LastFmTrack) =>
        Number(b.listeners) - Number(a.listeners)
    )
    .slice(0, 12);

  const enrinchedTracks = await Promise.all(
    tracks.map(async (track: LastFmTrack) => {
      try {
        const infoRes = await fetch(
          `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(
            track.name
          )}&artist=${encodeURIComponent(track.artist)}&api_key=${
            process.env.NEXT_PUBLIC_LASTFM_API_KEY
          }&format=json`
        );
        const infoData = await infoRes.json();

        const albumImage = infoData.track?.album?.[3]?.["#text"] || "";

        const isStar = albumImage.includes("2a96cbd8b46e442fc41c2b86b821562f");

        if (albumImage && !isStar) {
          return {
            ...track,
            image: [{ "#text": albumImage, size: "extralarge" }],
          };
        }
        return track;
      } catch {
        return track;
      }
    })
  );

  return NextResponse.json({ results: enrinchedTracks });
}
