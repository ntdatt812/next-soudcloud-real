'use client'
import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
    console.log(">> check id: ", params);
    const searchParams = useSearchParams();
    const search = searchParams.get('audio');
    console.log(">>> check audio: ", search)
    return (
        <div>
            Detai Track
            <div>
                <WaveTrack />
            </div>
        </div>
    )
}

export default DetailTrackPage