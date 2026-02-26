import React, { useState, useEffect } from "react";
import { useRouter, useQuery } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Player from "../../components/Player";
import type { Channel } from "../../types";

const Watch = () => {
  const router = useRouter();
  const { id } = useQuery();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const channelRef = doc(db, "channels", id as string);
        const channelDoc = await getDoc(channelRef);
        if (channelDoc.exists()) {
          setChannel(channelDoc.data() as Channel);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching channel:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChannel();
    } else {
      router.push("/");
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white animate-spin rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!channel) {
    return <div>Channel not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push("/")}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">{channel.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Player */}
      <main className="container mx-auto px-4 py-8">
        <Player channel={channel} />
      </main>

      {/* Channel Info */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">About {channel.name}</h2>
          <p className="text-gray-300 mb-4">{channel.description}</p>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span>
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {channel.country}
            </span>
            <span>
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {channel.language}
            </span>
            <span>
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              HD
            </span>
          </div>
        </div>
      </section>

      {/* Related Channels */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Related Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Related channels would be loaded here */}
        </div>
      </section>
    </div>
  );
};

export default Watch;
