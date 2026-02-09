import { useState, useRef, useEffect, type VideoHTMLAttributes } from "react";

interface VideoPlayerProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  width?: string | number;
  height?: string | number;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  playbackRates?: number[];
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  showControls = true,
  width = "100%",
  height = "auto",
  onTimeUpdate,
  onEnded,
  playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
  className = "",
  ...props
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showPlaybackRate, setShowPlaybackRate] = useState(false);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percentage = (bufferedEnd / video.duration) * 100;
        setBuffered(percentage);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("progress", handleProgress);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("progress", handleProgress);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onTimeUpdate, onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.5;
      setVolume(volume || 0.5);
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowPlaybackRate(false);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "🔇";
    if (volume < 0.5) return "🔉";
    return "🔊";
  };

  return (
    <>
      <div className={`video-player-container ${className}`} style={{ width }}>
        <video
          ref={videoRef}
          className="video-player"
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          onClick={togglePlay}
          style={{ width: "100%", height }}
          {...props}
        />

        {showControls && (
          <div className="video-controls">
            {/* Progress bar */}
            <div className="progress-container">
              <div className="progress-buffered" style={{ width: `${buffered}%` }} />
              <input
                type="range"
                className="progress-bar"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
              />
            </div>

            {/* Control buttons */}
            <div className="controls-row">
              <div className="controls-left">
                <button className="control-button" onClick={togglePlay}>
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <div
                  className="volume-control"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button className="control-button" onClick={toggleMute}>
                    {getVolumeIcon()}
                  </button>
                  {showVolumeSlider && (
                    <input
                      type="range"
                      className="volume-slider"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                    />
                  )}
                </div>

                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="controls-right">
                <div className="playback-rate-control">
                  <button
                    className="control-button"
                    onClick={() => setShowPlaybackRate(!showPlaybackRate)}
                  >
                    {playbackRate}x
                  </button>
                  {showPlaybackRate && (
                    <div className="playback-rate-menu">
                      {playbackRates.map((rate) => (
                        <button
                          key={rate}
                          className={`playback-rate-option ${
                            rate === playbackRate ? "active" : ""
                          }`}
                          onClick={() => changePlaybackRate(rate)}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="control-button" onClick={toggleFullscreen}>
                  {isFullscreen ? "⛶" : "⛶"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .video-player-container {
          position: relative;
          background-color: #000;
          border-radius: 8px;
          overflow: hidden;
        }

        .video-player {
          display: block;
          cursor: pointer;
        }

        .video-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          padding: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .video-player-container:hover .video-controls {
          opacity: 1;
        }

        .progress-container {
          position: relative;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .progress-buffered {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 3px;
          pointer-events: none;
        }

        .progress-bar {
          width: 100%;
          height: 100%;
          cursor: pointer;
          opacity: 0;
        }

        .progress-bar::-webkit-slider-thumb {
          opacity: 1;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }

        .controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .controls-left,
        .controls-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .control-button {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
          min-width: 32px;
        }

        .control-button:hover {
          opacity: 0.7;
        }

        .time-display {
          color: white;
          font-size: 14px;
          font-family: monospace;
          white-space: nowrap;
        }

        .volume-control {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .volume-slider {
          width: 80px;
          cursor: pointer;
        }

        .playback-rate-control {
          position: relative;
        }

        .playback-rate-menu {
          position: absolute;
          bottom: 100%;
          right: 0;
          background-color: rgba(0, 0, 0, 0.9);
          border-radius: 4px;
          padding: 4px;
          margin-bottom: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .playback-rate-option {
          background: none;
          border: none;
          color: white;
          padding: 6px 12px;
          cursor: pointer;
          text-align: left;
          border-radius: 2px;
          font-size: 14px;
          white-space: nowrap;
        }

        .playback-rate-option:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .playback-rate-option.active {
          background-color: rgba(255, 255, 255, 0.3);
          font-weight: bold;
        }

        /* Fullscreen styles */
        .video-player-container:fullscreen {
          width: 100vw !important;
          height: 100vh !important;
          border-radius: 0;
        }

        .video-player-container:fullscreen .video-player {
          height: 100% !important;
          object-fit: contain;
        }

        /* Dark mode */
        .dark .video-player-container {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}
