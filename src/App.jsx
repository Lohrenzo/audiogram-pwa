import { useState, useEffect } from "react";

// Components
import RefreshServiceWorker from "./components/RefreshServiceWorker";
import Sidebar from "./components/Sidebar";
import NowPlaying from "./components/NowPlaying";
import Index from "./pages/Index";

// Zustand
import { useSongStore } from "./store/store";

function App() {
  const { fetchSongs } = useSongStore();

  const handleReload = () => {
    fetchSongs();
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen min-w-screen max-w-screen overflow-x-hidden">
      <RefreshServiceWorker onReload={handleReload} />
      <div className="flex h-screen w-screen overflow-x-hidden">
        <Sidebar />
        <Index />
      </div>
      <NowPlaying />
    </section>
  );
}

export default App;
