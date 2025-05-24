'use client'
import Chip from "@mui/material/Chip"
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const LikeTrack = ({ track }: {
    track: ITrackTop | null
}) => {
    const session = useSession();
    const [trackLike, setTrackLike] = useState<ITrackLike[]>([]);
    const router = useRouter()

    const fetchTrackLike = async () => {
        const trackLike = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: "GET",
            queryParams: {
                current: 1,
                pageSize: 100
            },
            headers: {
                Authorization: `Bearer ${session.data?.access_token}`
            }
        })
        if (trackLike?.data?.result) {
            setTrackLike(trackLike.data.result);
        }
    }

    useEffect(() => {
        fetchTrackLike();
    }, [session]);

    const handleLikeAndDislike = async () => {
        await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: "POST",
            body: {
                track: track?._id,
                quantity: trackLike.some(tl => tl._id === track?._id) ? -1 : 1
            },
            headers: {
                Authorization: `Bearer ${session.data?.access_token}`
            }
        })
        fetchTrackLike()
        router.refresh();
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <div>
                <Chip
                    variant="outlined"
                    icon={<FavoriteIcon />}
                    color={trackLike.some(tl => tl._id === track?._id) ? "error" : "default"}
                    label="Like"
                    onClick={() => {
                        handleLikeAndDislike();
                    }}
                />
            </div>
            <div>
                <Chip
                    variant="filled"
                    icon={<PlayArrowIcon />}
                    label={track?.countPlay}
                    sx={{
                        marginRight: "10px",
                    }}
                />
                <Chip
                    variant="outlined"
                    icon={<FavoriteIcon />}
                    label={track?.countLike}
                />
            </div>
        </div>
    )
}

export default LikeTrack