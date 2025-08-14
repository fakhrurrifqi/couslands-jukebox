import Image from "next/image";

interface TrackInfoProps {
  data: {
    track?: {
      name: string;
      artist?: { name: string };
      album?: {
        title: string;
        image: { "#text": string; size: string }[];
      };
      listeners?: string;
      wiki?: { summary: string };
    };
  };
}

function TrackDetail({ data }: TrackInfoProps) {
  const track = data.track;
  if (!track) return <div className="p-6">Track not found</div>;
  const imageUrl = track.album?.image?.[3]?.["#text"] || "/placeholder.jpg";
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{track.name}</h1>
      <p className="text-lg text-gray-500">{track.artist?.name}</p>
      <Image
        src={imageUrl}
        alt={track.name}
        width={300}
        height={300}
        className="rounded"
      />
      {track.album && <p className="text-sm">Album: {track.album.title}</p>}
      {track.listeners && (
        <p className="text-sm">
          Listeners: {Number(track.listeners).toLocaleString()}
        </p>
      )}
      {track.wiki?.summary && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: track.wiki.summary }}
        />
      )}
    </div>
  );
}

export default TrackDetail;
