"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipBackwardFill,
  BsSkipForwardFill,
  BsVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";
import { Book } from "@/types/book";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  book: Book;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function AudioPlayer({ book }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Sync audio events → state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Play / Pause
  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  }

  // Skip forward / backward
  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
  }

  // Seek via progress bar
  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  }

  // Volume
  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 1;
      audio.muted = false;
    } else {
      audio.muted = true;
    }
    setIsMuted((prev) => !prev);
  }

  // Playback speed
  function handleSpeed(e: React.ChangeEvent<HTMLSelectElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.playbackRate = value;
    setSpeed(value);
  }

  function formatTime(secs: number): string {
    if (isNaN(secs) || secs === 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={book.audioLink} preload="metadata" />

      {/* Book info */}
      <div className={styles.bookInfo}>
        <Image
          src={book.imageLink}
          alt={book.title}
          width={48}
          height={48}
          className={styles.cover}
          unoptimized
        />
        <div className={styles.bookText}>
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.bookAuthor}>{book.author}</p>
        </div>
      </div>

      {/* Center: controls + progress */}
      <div className={styles.center}>
        <div className={styles.buttons}>
          <button className={styles.skipBtn} onClick={() => skip(-10)} title="Back 10s">
            <BsSkipBackwardFill />
          </button>
          <button className={styles.playBtn} onClick={togglePlay}>
            {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
          </button>
          <button className={styles.skipBtn} onClick={() => skip(10)} title="Forward 10s">
            <BsSkipForwardFill />
          </button>
        </div>

        <div className={styles.progressRow}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <input
            className={styles.progressBar}
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            style={{ "--progress": `${progressPercent}%` } as React.CSSProperties}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: speed + volume */}
      <div className={styles.right}>
        <select
          className={styles.speedSelect}
          value={speed}
          onChange={handleSpeed}
          title="Playback speed"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>

        <div className={styles.volumeWrapper}>
          <button className={styles.muteBtn} onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <BsVolumeMuteFill />
            ) : (
              <BsVolumeUpFill />
            )}
          </button>
          <input
            className={styles.volumeBar}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            style={
              {
                "--vol": `${(isMuted ? 0 : volume) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}
