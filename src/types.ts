export interface Channel {
  id?: string;
  name: string;
  poster: string;
  description: string;
  country: string;
  category: string;
  language: string;
  m3u8Url: string;
  embedUrl?: string;
  featured: boolean;
  trending: boolean;
  forcePlayer: number;
  active: boolean;
  createdAt: Date | firebase.firestore.FieldValue;
}

export interface LiveEvent {
  id?: string;
  teamA: string;
  teamB: string;
  logoA: string;
  logoB: string;
  matchLocation: string;
  category: string;
  country: string;
  liveStreamUrl: string;
  status: "upcoming" | "live" | "finished";
  featured: boolean;
  startTime: Date | firebase.firestore.FieldValue;
}

export interface Category {
  id?: string;
  name: string;
  icon: string;
  order: number;
}

export interface Country {
  id?: string;
  name: string;
  code: string;
  flag: string;
  isDefault: boolean;
}

export interface AdminCode {
  id?: string;
  code: string;
  role: "super-admin" | "admin";
  active: boolean;
}

export interface Settings {
  id?: string;
  appName: string;
  logo: string;
  websiteUrl: string;
  favicon: string;
  metaTitle: string;
  metaDescription: string;
  noticeText: string;
  noticeEnabled: boolean;
  telegramLink: string;
  defaultTheme: "dark-neon" | "dark-blue" | "amoled-black" | "light";
  adsEnabled: boolean;
  adsScript: string;
  playerSettings: PlayerSettings;
}

export interface PlayerSettings {
  defaultPlayer: number;
  enablePlayers: boolean[];
  retryCount: number;
  httpHttpsControl: boolean;
  proxy: string;
}

export interface Notice {
  id?: string;
  text: string;
  speed: number;
  color: string;
  enabled: boolean;
}

export interface Ad {
  id?: string;
  enabled: boolean;
  script: string;
  header: boolean;
  sidebar: boolean;
  watchPage: boolean;
}

export interface User {
  id?: string;
  email: string;
  role: "super-admin" | "admin" | "user";
  lastLogin: Date | firebase.firestore.FieldValue;
}
