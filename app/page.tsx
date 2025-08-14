"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import SearchResults from "@/components/SearchResults";

export interface LastFmTrack {
  name: string;
  artist: string;
  url: string;
  image: { "#text": string; size: string }[];
  mbid: string;
  listeners: string;
}

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LastFmTrack[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Cousland&apos;s Jukebox</h1>
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search for a song..."
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <SearchResults results={results} />
    </div>
  );
};

export default HomePage;
