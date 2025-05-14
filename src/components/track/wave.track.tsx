'use client'
import { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {
    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: document.getElementById("ntdat")!,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: '/tracks/hoidanit.mp3',
        })
    }, [])
    return (
        <div id="ntdat" className=''>
            WaveTrack
        </div>
    )
}

export default WaveTrack