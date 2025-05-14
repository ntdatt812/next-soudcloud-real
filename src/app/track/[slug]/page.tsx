'use client'
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
    console.log(">> check id: ", params);
    const searchParams = useSearchParams();
    const search = searchParams.get('audio');
    console.log(">>> check audio: ", search)
    return (
        <div>DetailTrackPage</div>
    )
}

export default DetailTrackPage