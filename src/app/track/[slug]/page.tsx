'use client'
import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
    console.log(">> check id: ", params);
    const searchParams = useSearchParams();
    const audio = searchParams.get('audio');
    console.log(">>> check audio: ", audio)
    return (
        <div>
            Detai Track
            <div>
                <WaveTrack
                    audio={audio}
                />
            </div>
        </div>
    )
}

export default DetailTrackPage