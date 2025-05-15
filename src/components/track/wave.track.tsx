'use client';

import { useWavesurfer } from '@/utils/customHook';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';


const WaveTrack = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);

    const options = useMemo<Omit<WaveSurferOptions, 'container'> | null>(() => {
        if (!fileName) return null;
        return {
            waveColor: '#2800DA',
            progressColor: '#008CFF',
            url: `/api?audio=${encodeURIComponent(fileName)}`,
        };
    }, [fileName]);

    const wavesurfer = useWavesurfer(containerRef, options);

    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);
        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false))
        ]
        return () => {
            subscriptions.forEach((unsub) => unsub());
        }
    }, [])

    const onPlayPause = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer])



    return (
        <div
        >
            <div
                ref={containerRef}
                style={{ width: '100%', height: '128px' }}
            />

            <button
                onClick={() => {
                    onPlayPause()
                }}
            >
                {isPlaying === true ? "Pause" : "Play"}
            </button>

        </div>

    );

};

export default WaveTrack;
