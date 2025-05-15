'use client';

import { useWavesurfer } from '@/utils/customHook';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';


const WaveTrack = () => {
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

    return <div ref={containerRef} style={{ width: '100%', height: '128px' }} />;
};

export default WaveTrack;
