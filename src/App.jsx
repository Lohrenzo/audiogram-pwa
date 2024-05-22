import { useState, useEffect } from "react";

import axios from "./api/axios";

function App() {
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/audio");
      let responseData = response?.data || [];
      console.log(responseData);
      setSongs(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>App</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-5">
        {songs.length > 0 ? (
          songs.map((item) => (
            <div className="bg-white text-black p-2 rounded-md" key={item.id}>
              <img
                className="object-cover w-full h-60"
                src={item.cover}
                alt={item.title}
              />
              <audio
                className="w-full"
                src={item.audio}
                alt={item.title}
                controls
              />
              <p>{item.title}</p>
              <p>Artist: {item.artist}</p>
              <p>Producer: {item.producer}</p>
              <p>Genre: {item.genre}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
