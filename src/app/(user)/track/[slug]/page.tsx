import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';
import Container from '@mui/material/Container';


const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${params.slug}`,
        method: "GET"
    })

    const comments = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: params.slug,
            sort: "-createdAt"
        }
    })
    console.log(">> check commment: ", comments.data?.result)
    return (
        <Container>
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                    comments={comments?.data?.result ?? null}
                />
            </div>
        </Container>
    )
}

export default DetailTrackPage