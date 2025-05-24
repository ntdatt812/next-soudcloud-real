import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';
import Container from '@mui/material/Container';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug

    // fetch post information
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${slug}`,
        method: "GET",
    })

    return {
        title: res?.data?.title,
        description: res?.data?.description,
        openGraph: {
            title: 'Nguyễn Thành Đạt',
            description: 'Beyond Your Coding Skills',
            type: 'website',
            images: [`https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`],
        },

    }
}



const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${params.slug}`,
        method: "GET",
        nextOption: { cache: "no-store" }
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