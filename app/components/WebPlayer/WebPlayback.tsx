import { VFC, useState, useEffect } from "react";
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdMusicNote } from "react-icons/md";

type Props = {
  token: string;
};

export const WebPlayback: VFC<Props> = ({ token }) => {
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [current_track, setTrack] = useState<Spotify.Track | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          if (!state) {
            setActive(false);
          } else {
            setActive(true);
          }
        });
      });

      player.connect();
    };
  }, [token]);

  if (!player) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="card text-center space-y-4 max-w-md">
          <div className="flex items-center justify-center w-16 h-16 bg-accent-primary/20 rounded-full mx-auto">
            <MdMusicNote className="text-2xl text-accent-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-dark-100">Loading Spotify Player</h3>
            <p className="text-dark-400 text-sm">Please wait while we initialize the music player...</p>
          </div>
        </div>
      </div>
    );
  } else if (!is_active) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="card text-center space-y-4 max-w-md">
          <div className="flex items-center justify-center w-16 h-16 bg-accent-warning/20 rounded-full mx-auto">
            <MdMusicNote className="text-2xl text-accent-warning" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-dark-100">Connect Your Device</h3>
            <p className="text-dark-400 text-sm">
              Transfer your playback to this device using your Spotify app
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card max-w-2xl mx-auto animate-scale-in">
        <div className="flex items-center gap-6">
          {/* Album Art */}
          <div className="flex-shrink-0">
            {current_track && current_track.album.images[0]?.url ? (
              <img
                src={current_track.album.images[0].url}
                className="w-20 h-20 rounded-xl shadow-lg"
                alt={current_track.album.name}
              />
            ) : (
              <div className="w-20 h-20 bg-dark-700 rounded-xl flex items-center justify-center">
                <MdMusicNote className="text-2xl text-dark-400" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-dark-100 truncate">
              {current_track?.name || "No track selected"}
            </h3>
            <p className="text-dark-400 truncate">
              {current_track?.artists[0]?.name || "Unknown artist"}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="p-3 rounded-full bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => player.previousTrack()}
              title="Previous track"
            >
              <MdSkipPrevious className="text-xl" />
            </button>

            <button
              className="p-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => player.togglePlay()}
              title={is_paused ? "Play" : "Pause"}
            >
              {is_paused ? (
                <MdPlayArrow className="text-xl" />
              ) : (
                <MdPause className="text-xl" />
              )}
            </button>

            <button
              className="p-3 rounded-full bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => player.nextTrack()}
              title="Next track"
            >
              <MdSkipNext className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};
