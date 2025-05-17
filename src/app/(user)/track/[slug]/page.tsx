'use client'
import WaveTrack from '@/components/track/wave.track';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
    const searchParams = useSearchParams();
    const audio = searchParams.get('audio');
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