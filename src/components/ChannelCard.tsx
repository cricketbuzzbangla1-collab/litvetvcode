import React from "react";
import { useRouter } from "next/router";
import type { Channel } from "../types";

const ChannelCard = ({ channel }: { channel: Channel }) => {
  const router = useRouter();

  const handleChannelClick = () => {
    router.push(`/watch/${channel.id}`);
  };

  return (
    <div
      onClick={handleChannelClick}
      className="cursor-pointer group relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48 bg-gray-700">
        {channel.poster && (
          <img
            src={channel.poster}
            alt={channel.name}
            className="w-full h-full object-cover"
          />
        )}
        {channel.featured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            FEATURED
          </div>
        )}
        {channel.trending && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            TRENDING
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-1">{channel.name}</h3>
        <p className="text-gray-400 text-sm">{channel.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">
            {channel.country} · {channel.language}
          </span>
          <div className="text-xs text-gray-400">
            <svg
              className="w-4 h-4 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v7.263a1 1 0 001.555.83l3.197-2.132a1 1 0 000-1.664z"
              />
              <circle cx={12} cy={12} r={9} />
            </svg>
            HD
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
