'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

type WaveSurferOptions = {
    waveColor: string;
    progressColor: string;
    url: string;
};

const useWavesurfer = (containerRef: React.RefObject<HTMLDivElement>, options: WaveSurferOptions | null) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (!containerRef.current || !options) return;

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        });

        setWavesurfer(ws);

        return () => {
            ws.destroy();
            setWavesurfer(null);
        };
    }, [containerRef, options?.url]);

    return wavesurfer;
};

const WaveTrack = () => {
    const searchParams = useSearchParams();
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);

    const options = useMemo<WaveSurferOptions | null>(() => {
        if (!fileName) return null;
        return {
            waveColor: '#2800DA',
            progressColor: '#008CFF',
            url: `/api?audio=${encodeURIComponent(fileName)}`,
        };
    }, [fileName]);

    useWavesurfer(containerRef, options);

    return <div ref={containerRef} style={{ width: '100%', height: '128px' }} />;
};

export default WaveTrack;
