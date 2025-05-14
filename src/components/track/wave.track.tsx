'use client'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("> check containerRef: ", containerRef.current);
        const wavesurfer = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: '/tracks/hoidanit.mp3',
        })
    }, [])
    return (
        <div ref={containerRef}>
            WaveTrack
        </div>
    )
}

export default WaveTrack