import { VFC } from "react";
import Link from "next/link";
import { SiSpotify } from "react-icons/si";
import { MdMusicNote } from "react-icons/md";

export const Login: VFC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="card text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto">
          <MdMusicNote className="text-3xl text-white" />
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-dark-100">
            Connect Your Music
          </h2>
          <p className="text-dark-400">
            Connect your Spotify account to enjoy music during your workouts
          </p>
        </div>
        
        {/* Login Button */}
        <Link href="/api/auth/login" className="inline-block">
          <div className="bg-[#1DB954] hover:bg-[#1ed760] text-white py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200">
            <SiSpotify className="text-xl" />
            Login with Spotify
          </div>
        </Link>
        
        {/* Note */}
        <p className="text-xs text-dark-500">
          You need a Spotify Premium account to use the music player
        </p>
      </div>
    </div>
  );
};
