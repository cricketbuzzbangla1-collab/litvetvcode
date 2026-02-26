import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useChannels, useLiveEvents, useCategories, useCountries, useSettings } from "../hooks/useFirestore";
import ChannelCard from "../components/ChannelCard";
import LiveEventCard from "../components/LiveEventCard";
import { motion } from "framer-motion";

const Home = () => {
  const router = useRouter();
  const { channels, loading: channelsLoading } = useChannels();
  const { liveEvents, loading: liveEventsLoading } = useLiveEvents();
  const { categories, loading: categoriesLoading } = useCategories();
  const { countries, loading: countriesLoading } = useCountries();
  const { settings, loading: settingsLoading } = useSettings();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (countries.length > 0) {
      const defaultCountry = countries.find(c => c.isDefault);
      if (defaultCountry) {
        setSelectedCountry(defaultCountry.id);
      }
    }
  }, [countries]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(countryId);
  };

  const filteredChannels = channels.filter(channel => {
    if (selectedCountry && channel.country !== selectedCountry) return false;
    if (selectedCategory && channel.category !== selectedCategory) return false;
    return true;
  });

  const featuredChannels = filteredChannels.filter(c => c.featured).slice(0, 6);
  const trendingChannels = filteredChannels.filter(c => c.trending).slice(0, 6);
  const recentChannels = filteredChannels.slice(0, 12);

  if (channelsLoading || liveEventsLoading || categoriesLoading || countriesLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white animate-spin rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {settings?.logo && (
              <img
                src={settings.logo}
                alt={settings.appName}
                className="h-10 w-auto"
              />
            )}
            <h1 className="text-2xl font-bold">{settings?.appName || "Live TV"}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Featured Channels */}
        {featuredChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Featured Channels</h2>
              <button className="text-blue-500 hover:text-blue-400 transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * featuredChannels.indexOf(channel) }}
                >
                  <ChannelCard channel={channel} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Countries */}
        {countries.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Countries</h2>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountryClick(country.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCountry === country.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Trending Channels */}
        {trendingChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Trending Now</h2>
              <button className="text-blue-500 hover:text-blue-400 transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * trendingChannels.indexOf(channel) }}
                >
                  <ChannelCard channel={channel} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Channels */}
        {recentChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Recently Added</h2>
              <button className="text-blue-500 hover:text-blue-400 transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * recentChannels.indexOf(channel) }}
                >
                  <ChannelCard channel={channel} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Live Events */}
        {liveEvents.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">Live Events</h2>
              <button className="text-blue-500 hover:text-blue-400 transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liveEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * liveEvents.indexOf(event) }}
                >
                  <LiveEventCard event={event} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings?.appName || "Live TV"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
