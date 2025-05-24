'use client'
import { fetchDefaultImages, sendRequest } from "@/utils/api"
import { useHasMounted } from "@/utils/customHook";
import { useToast } from "@/utils/toast";
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WaveSurfer from "wavesurfer.js";
dayjs.extend(relativeTime)

const CommentTrack = ({ comments, track, wavesurfer }: {
    comments: IComment[] | null,
    track: ITrackTop | null
    wavesurfer: WaveSurfer | null
}) => {
    const router = useRouter();
    const [yourComment, setYourComment] = useState<string>("");
    const { data: session } = useSession();
    const toast = useToast();
    const hasMouted = useHasMounted();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
            method: "POST",
            body: {
                content: yourComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                track: track?._id
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            }
        })
        if (res.data) {
            setYourComment("");
            router.refresh()
        } else {
            toast.error(res.message);
        }
    }

    const handleJumpTrack = (moment: number) => {
        if (wavesurfer) {
            const duration = wavesurfer.getDuration();
            console.log(">> check: ", moment, duration)
            wavesurfer.seekTo(moment / duration);
            wavesurfer.play();
        }
    }

    return (
        <div style={{ marginTop: "50px" }}>
            <TextField
                label="Comment"
                variant="standard"
                fullWidth
                value={yourComment}
                onChange={(e) => { setYourComment(e.target.value) }}
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        handleSubmit()
                    }
                }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <div className="left" style={{ width: "190px" }}>
                    <img
                        src={fetchDefaultImages(track?.uploader?.type!)}
                        style={{
                            height: 150, width: 150
                        }}
                    />
                    <span>{track?.uploader.email}</span>
                </div>
                <div className='right' style={{ width: "calc(100% - 200px)" }}>
                    {comments?.map(comment => {
                        return (
                            <Box key={comment._id} sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", gap: "10px", marginBottom: "25px", alignItems: "center" }}>
                                    <img
                                        style={{
                                            height: 40, width: 40,

                                        }}
                                        src={fetchDefaultImages(comment.user.type)}
                                    />
                                    <div>
                                        <div style={{ fontSize: "13px" }}>{comment?.user?.name ?? comment?.user?.email} at
                                            <span style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    handleJumpTrack(comment.moment)
                                                }}
                                            >
                                                &nbsp;{formatTime(comment.moment)}
                                            </span>
                                        </div>
                                        <div>
                                            {comment.content}
                                        </div>
                                    </div>
                                </Box>
                                <div style={{ fontSize: "12px", color: "#999" }}>
                                    {hasMouted && dayjs(comment.createdAt).fromNow()}
                                </div>
                            </Box>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentTrack