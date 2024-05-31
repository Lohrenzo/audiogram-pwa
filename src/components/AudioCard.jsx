import React from "react";

const AudioCard = ({ item }) => {
  return (
    <div className="bg-black/55 backdrop-blur-md text-white min-w-[160px] p-2 rounded-md shadow-lg">
      <img
        className="object-cover w-[100%] h-[110px] rounded-md"
        src={
          item?.cover
            ? item.cover
            : "https://placehold.co/800?text=Hello+World&font=roboto"
        }
        alt={item.title}
      />
      <audio className="w-full" src={item.audio} alt={item.title} />
      <p className="text-[0.6rem] anta text-right text-[#8d8c8c]">
        {item.genre}
      </p>
      <p className="font-bold text-[0.84rem]">{item.title}</p>
      <p className="text-[0.7rem] anta text-[#85858E]">Artist: {item.artist}</p>
      <p className="text-[0.7rem] anta text-[#85858E]">Prod. {item.producer}</p>
    </div>
  );
};

export default AudioCard;
