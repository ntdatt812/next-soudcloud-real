'use client';

import { useWavesurfer } from '@/utils/customHook';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';
import './wave.scss'
const WaveTrack = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [waveGradient, setWaveGradient] = useState<CanvasGradient | null>(null);
    const [progressGradient, setProgressGradient] = useState<CanvasGradient | null>(null);

    const searchParams = useSearchParams();
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);

    // Tạo gradient sau khi render trên client
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.height = 100; // đặt chiều cao để tạo gradient chính xác
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // waveColor gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
        gradient.addColorStop(0, '#656666');
        gradient.addColorStop(0.7, '#656666');
        gradient.addColorStop(0.701, '#ffffff');
        gradient.addColorStop(0.702, '#ffffff');
        gradient.addColorStop(0.703, '#B1B1B1');
        gradient.addColorStop(1, '#B1B1B1');

        // progressColor gradient
        const progress = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
        progress.addColorStop(0, '#EE772F');
        progress.addColorStop(0.7, '#EB4926');
        progress.addColorStop(0.701, '#ffffff');
        progress.addColorStop(0.702, '#ffffff');
        progress.addColorStop(0.703, '#F6B094');
        progress.addColorStop(1, '#F6B094');

        setWaveGradient(gradient);
        setProgressGradient(progress);
    }, []);

    const options = useMemo((): Omit<WaveSurferOptions, 'container'> | null => {
        if (!fileName || !waveGradient || !progressGradient) return null;

        return {
            url: `/api?audio=${encodeURIComponent(fileName)}`,
            waveColor: waveGradient,
            progressColor: progressGradient,
            height: 130,
            barWidth: 2,
        };
    }, [fileName, waveGradient, progressGradient]);

    const wavesurfer = useWavesurfer(containerRef, options);

    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);
        const timeEl = document.querySelector('#time')!;
        const durationEl = document.querySelector('#duration')!;
        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration))),
            wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
        ];
        return () => {
            subscriptions.forEach((unsub) => unsub());
        };
    }, [wavesurfer]);

    const onPlayPause = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.playPause();
        }
    }, [wavesurfer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    return (
        <div>
            <div
                className='wave-form-container'
                ref={containerRef}
                style={{ width: '100%', height: '128px' }}
            >    <div id="time">0:00</div>
                <div id="duration">0:00</div>
            </div>
            <button onClick={onPlayPause}>
                {isPlaying ? "Pause" : "Play"}
            </button>

        </div>
    );
};

export default WaveTrack;
