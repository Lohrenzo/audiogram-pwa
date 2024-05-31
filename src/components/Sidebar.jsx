import React from "react";

// Zustand
import { useSidebarStore } from "../store/store";

// Icons
import { CiSettings } from "react-icons/ci";
import { BiSolidDoorOpen, BiSolidAlbum, BiSolidPlaylist } from "react-icons/bi";
import {
  IoMdSettings,
  IoIosPerson,
  IoIosMusicalNotes,
  IoIosAnalytics,
} from "react-icons/io";
import { IoHeadset } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { FaCaretRight } from "react-icons/fa6";

const Sidebar = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebarStore();
  return (
    <div
      style={{ height: "calc(100vh - 100px)" }}
      className={`${
        !isSidebarOpen && "sidebar-hide"
      } overflow-y-hidden overflow-x-hidden transition-all ease-in-out duration-300 z-10 md:min-w-[240px] hidden md:flex flex-row items-center gap-0 justify-start text-gray-400`}
    >
      <div
        className={`sidebar w-full h-full overflow-y-auto flex flex-col gap-y-6 items-start justify-start bg-[#080810] text-sm shadow-md border-r-4 border-gray-800 p-4`}
      >
        <div className="flex flex-row items-center gap-x-1">
          <img
            src="/public/images/audiogram-removebg.png"
            alt="logo"
            className="md:w-12 md:h-12 h-8 w-8 object-cover"
          />
          {isSidebarOpen && (
            <h1 className="md:text-xl text-base text-gray-400 font-bold drop-shadow">
              AudioGram
            </h1>
          )}
        </div>
        {isSidebarOpen && (
          <input type="text" className="search-input" placeholder="Search..." />
        )}
        <p className="flex flex-row justify-start items-center gap-x-2 border-gray-700 w-full">
          <MdExplore size={35} /> {isSidebarOpen && "Explore"}
        </p>
        <div className="w-full">
          {isSidebarOpen && (
            <p className="border-b pb-1 mb-2 border-gray-700 w-full">
              Your Library
            </p>
          )}
          <p className="flex flex-row justify-start items-center gap-x-2">
            <IoIosMusicalNotes size={35} /> {isSidebarOpen && "Songs"}
          </p>
          <p className="flex flex-row justify-start items-center gap-x-2">
            <IoIosPerson size={35} /> {isSidebarOpen && "Artists"}
          </p>
          <p className="flex flex-row justify-start items-center gap-x-2">
            <BiSolidAlbum size={35} /> {isSidebarOpen && "Albums"}
          </p>
          <p className="flex flex-row justify-start items-center gap-x-2 text-nowrap">
            <IoHeadset size={35} /> {isSidebarOpen && "Recently Played"}
          </p>
        </div>
        <div className="w-full">
          {isSidebarOpen && (
            <p className="border-b pb-1 mb-2 border-gray-700 w-full">
              Your Playlists
            </p>
          )}
          <p className="flex flex-row justify-start items-center gap-x-2">
            <IoIosAnalytics size={35} /> {isSidebarOpen && "Playlist1"}
          </p>
          <p className="flex flex-row justify-start items-center gap-x-2">
            <IoIosAnalytics size={35} /> {isSidebarOpen && "Playlist2"}
          </p>
          <p className="flex flex-row justify-start items-center gap-x-2">
            <IoIosAnalytics size={35} /> {isSidebarOpen && "Playlist3"}
          </p>
        </div>
        <div className="border-t pt-2 border-gray-700 w-full">
          <p className="flex flex-row justify-start items-center gap-x-2">
            <IoMdSettings size={35} /> {isSidebarOpen && "Settings"}
          </p>
          <p className="flex flex-row justify-start items-center gap-x-2">
            <BiSolidDoorOpen size={35} /> {isSidebarOpen && "Log Out"}
          </p>
        </div>
      </div>
      <div
        onClick={isSidebarOpen ? closeSidebar : openSidebar}
        className={`sidebar-control ${
          isSidebarOpen && "rotate-180"
        } flex items-center justify-center hover:scale-125 cursor-pointer text-[2rem] transition-all duration-200 text-[#454370] hover:text-[#6562a9]`}
      >
        <FaCaretRight />
      </div>
    </div>
  );
};

export default Sidebar;
