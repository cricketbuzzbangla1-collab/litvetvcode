import { useState, useEffect } from "react";
import { db } from "../firebase";
import type { Channel, LiveEvent, Category, Country, Settings } from "../types";

export const useChannels = (categoryId?: string, countryId?: string) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("channels")
      .where("active", "==", true)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const data: Channel[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as Channel);
          });
          setChannels(data);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching channels:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { channels, loading };
};

export const useLiveEvents = () => {
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("liveEvents")
      .where("status", "in", ["upcoming", "live"])
      .orderBy("startTime", "asc")
      .onSnapshot(
        (querySnapshot) => {
          const data: LiveEvent[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as LiveEvent);
          });
          setLiveEvents(data);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching live events:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { liveEvents, loading };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("categories")
      .orderBy("order", "asc")
      .onSnapshot(
        (querySnapshot) => {
          const data: Category[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as Category);
          });
          setCategories(data);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching categories:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { categories, loading };
};

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("countries")
      .orderBy("isDefault", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const data: Country[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as Country);
          });
          setCountries(data);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching countries:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { countries, loading };
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("settings")
      .doc("appSettings")
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setSettings(doc.data() as Settings);
          } else {
            setSettings(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching settings:", error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { settings, loading };
};
