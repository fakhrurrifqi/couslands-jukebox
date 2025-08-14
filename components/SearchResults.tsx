import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { LastFmTrack } from "@/app/page";

const SearchResults = ({ results }: { results: LastFmTrack[] }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {results.map((track, idx) => {
        const imageUrl = track.image?.[0]?.["#text"] || "/placeholder.jpg";

        const trackId = track.mbid
          ? track.mbid
          : encodeURIComponent(`${track.name}-${track.artist}`);
        return (
          <Link
            href={`/song/${trackId}`}
            key={`${track.mbid || idx}-${track.name}`}
          >
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <Image
                  src={imageUrl}
                  alt={track.name}
                  width={300}
                  height={300}
                  className="rounded"
                />
                <CardTitle className="mt-2 text-lg">{track.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{track.artist}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
