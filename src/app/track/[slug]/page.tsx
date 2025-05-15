'use client'
import WaveTrack from '@/components/track/wave.track';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
    console.log(">> check id: ", params);
    const searchParams = useSearchParams();
    const audio = searchParams.get('audio');
    console.log(">>> check audio: ", audio)
    return (
        <Container>
            Detai Track
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}

export default DetailTrackPage