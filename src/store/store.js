import { create } from "zustand";

// Axios
import axios from "../api/axios";

// Store for managing sidebar popup state
export const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

// Store for songs state
export const useSongStore = create((set) => ({
  fetchSongs: async () => {
    set({ songs: [] });
    try {
      const response = await axios.get("/audio");
      let responseData = response?.data || [];
      set({ songs: responseData });
    } catch (error) {
      console.error("Error fetching songs:", error);
      set({ songs: [] });
    }
  },

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  songs: [],
  setSongs: (songs) => set({ songs }),

  playlist: [],
  setPlaylist: (playlist) => set({ playlist }),

  currentSong: {},
  setCurrentSong: (currentSong) => set({ currentSong }),

  index: 0,
  setIndex: (index) => set({ index }),

  setCurrentSongByIndex: (index) =>
    set((state) => {
      if (index >= 0 && index < state.playlist.length) {
        return { currentSong: state.playlist[index] };
      }
      return { currentSong: {} };
    }),
}));

// Store for managing feedback popup state
export const useFeedbackStore = create((set) => ({
  isOpen: false,
  message: "Feedback default message!",
  bgColour: "#121d3457", // Default background colour
  textColour: "#000000", // Default text colour
  openFeedbackPopup: (message, bgColour, textColour) => {
    set({ isOpen: true, message, bgColour, textColour });
    // Set timer to automatically close the popup after 8 seconds
    setTimeout(() => {
      set({ isOpen: false });
    }, 12000);
  },
  closeFeedbackPopup: () => set({ isOpen: false }),
}));
