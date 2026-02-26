import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { useRouter } from "next/router";
import { useToast } from "react-hot-toast";
import type { Channel } from "../../types";

const Player = ({ channel }: { channel: Channel }) => {
  const [playerType, setPlayerType] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const loadPlayer = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const src = channel.m3u8Url;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsPlaying(true);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play();
    } else {
      toast.error("Your browser doesn't support this video format");
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = (e: React.TimeUpdateEvent) => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleBuffering = () => {
    setBuffering(true);
  };

  const handleBufferEnd = () => {
    setBuffering(false);
  };

  return (
    <div className="relative w-full h-[400px] bg-gray-900">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onWaiting={handleBuffering}
        onPlaying={handleBufferEnd}
        onCanPlayThrough={handleBufferEnd}
      />
      <div className="absolute inset-0 bg-black/50% flex items-center justify-center gap-4 px-4">
        <button
          onClick={handlePlayPause}
          className="bg-white/80 rounded-full p-3 transition-all hover:bg-white/90"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isPlaying ? "M5.5 5.5 19.5 5.5 19.5 19.5 5.5 19.5 5.5 5.5Z" : "M14 6l4.22 2.15-4.22 2.15M6 18l4.22-2.15 4.22 2.15"}
            />
          </svg>
        </button>
        <div className="flex items-center gap-2 text-white text-sm">
          <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = parseFloat(e.target.value);
              }
            }}
            className="w-32"
          />
          <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60)}</span>
        </div>
        <button
          onClick={handleVolumeChange}
          className="bg-white/80 rounded-full p-2 transition-all hover:bg-white/90"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8a3 3 0 10-5.328-1 5.73 5.73 0 00-2.894 4.561M5.974 15a2 2 0 104 0M9.216 13.528a1 1 0 10-1.736-.74M3 3l3.83 2.12M11.188 10.32a1 1 0 10-1.636-.89M16.072 9a1 1 0 00-1.636.89M4.886 12.78A1 1 0 1010.792 12M1.453 11.945l1.466 1.348a1 1 0 10-1.05 1.676l-.094-.08a2 2 0 01-1.666-.955H1V9.5a1 1 0 011-1h5a1 1 0 011 1v3.5h-.616a2 2 0 00-1.543.829l-.18.18a1 1 0 01-1.374-1.334l1.906-1.755a1 1 0 10-1.045-1.538l-.04.03z"
            />
          </svg>
        </button>
        <button
          onClick={handleFullscreen}
          className="bg-white/80 rounded-full p-2 transition-all hover:bg-white/90"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m6 0h6"
            />
          </svg>
        </button>
        <button
          onClick={() => setPlayerType((prev) => (prev % 4) + 1)}
          className="bg-white/80 rounded-full p-2 transition-all hover:bg-white/90"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </button>
      </div>
      {buffering && (
        <div className="absolute inset-0 bg-black/50% flex items-center justify-center">
          <div className="bg-white/80 rounded-full p-4">
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m7 2a10.001 10.001 0 01-15.365 2.495A9.982 9.982 0 004.582 15"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
