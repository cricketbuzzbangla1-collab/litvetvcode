import React from "react";
import type { LiveEvent } from "../types";

const LiveEventCard = ({ event }: { event: LiveEvent }) => {
  const getStatusBadge = () => {
    switch (event.status) {
      case "upcoming":
        return (
          <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
            UPCOMING
          </div>
        );
      case "live":
        return (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            LIVE NOW
          </div>
        );
      case "finished":
        return (
          <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            FINISHED
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-32 bg-gray-700">
        {event.logoA && (
          <img
            src={event.logoA}
            alt={event.teamA}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 object-contain"
          />
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
          vs
        </div>
        {event.logoB && (
          <img
            src={event.logoB}
            alt={event.teamB}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 object-contain"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-white font-bold text-lg">{event.teamA}</h4>
          <h4 className="text-white font-bold text-lg">{event.teamB}</h4>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>{event.category}</span>
          <span>{event.country}</span>
        </div>
        {getStatusBadge()}
        <div className="text-xs text-gray-400 mt-2">
          {event.status === "upcoming" && (
            <span>Starts: {new Date(event.startTime).toLocaleString()}</span>
          )}
          {event.status === "live" && (
            <span>Live Now</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveEventCard;
