'use client';

import Header from "@/components/Header";
import WeatherCardsList from "@/components/WeatherCardsList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto px-4 py-8">
        <WeatherCardsList />
      </main>
    </div>
  );
}
