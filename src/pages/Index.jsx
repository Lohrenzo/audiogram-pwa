import { useState, useEffect } from "react";

// Components
import AudioCard from "../components/AudioCard";

// Zustand
import { useSongStore } from "../store/store";

function Index() {
  const { fetchSongs, songs, index, playlist, setPlaylist, setCurrentSong } =
    useSongStore();

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    setPlaylist(songs);
    setCurrentSong(playlist[index]);
  }, [songs]);

  // const handleCurrentSong = () => {
  // };

  return (
    <div
      style={{ height: "calc(100vh - 100px)" }}
      className="flex flex-col items-start justify-start p-0 w-full page overflow-x-hidden overflow-y-auto"
    >
      {songs.length > 0 ? (
        <>
          <h1 className="mb-1 mt-3 px-3 font-bold text-white text-xl">
            Trending
          </h1>
          <div className="display-cards flex flex-row flex-nowrap items-center justify-start gap-x-5 px-0 mx-auto w-[98%] overflow-x-auto">
            {songs.map((item) => (
              <AudioCard key={item.id} item={item} />
            ))}
            {songs.map((item) => (
              <AudioCard key={item.id} item={item} />
            ))}
            {songs.map((item) => (
              <AudioCard key={item.id} item={item} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 col-start-1 gap-x-5">
            <div>
              <h1 className="mb-1 mt-3 px-3 font-bold text-white text-xl">
                Playlists
              </h1>
              <div className="display-cards flex flex-row flex-nowrap items-center rounded-lg border border-gray-700 py-3 justify-start gap-x-5 px-0 mx-auto w-[98%] overflow-x-auto">
                {songs.map((item) => (
                  <AudioCard key={item.id} item={item} />
                ))}
                {songs.map((item) => (
                  <AudioCard key={item.id} item={item} />
                ))}
                {songs.map((item) => (
                  <AudioCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div>
              <h1 className="mb-1 mt-3 px-3 font-bold text-white text-xl">
                Recently Played
              </h1>
              <div className="display-cards flex flex-row flex-nowrap items-center rounded-lg border border-gray-700 py-3 justify-start gap-x-5 px-0 mx-auto w-[98%] overflow-x-auto">
                {songs.map((item) => (
                  <AudioCard key={item.id} item={item} />
                ))}
                {songs.map((item) => (
                  <AudioCard key={item.id} item={item} />
                ))}
                {songs.map((item) => (
                  <AudioCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-screen h-full">
          <div className="custom-loader"></div>
        </div>
      )}
    </div>
  );
}

export default Index;
