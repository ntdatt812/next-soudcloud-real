'use client'
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material"
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTrackContext } from "@/lib/track.wrapper";
import PauseCircle from "@mui/icons-material/PauseCircle";
import Link from "next/link";

const ProfileTracks = ({ item }: { item: ITrackTop }) => {
    const theme = useTheme();
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    return (
        <Card sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: "unset"
                        }}
                        href={`/track/${item._id}?audio=${item.trackUrl}&id=${item._id}`}
                    >
                        <Typography component="div" variant="h5">
                            {item.title}
                        </Typography>
                    </Link>

                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    {
                        (item._id !== currentTrack._id ||
                            item._id === currentTrack._id && currentTrack.isPlaying === false)
                        &&
                        <IconButton aria-label="play/pause"
                            onClick={() => {
                                setCurrentTrack({ ...item, isPlaying: true });
                            }}
                        >
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    }
                    {
                        (item._id === currentTrack._id && currentTrack.isPlaying === true)
                        &&
                        <IconButton aria-label="play/pause"
                            onClick={() => {
                                setCurrentTrack({ ...item, isPlaying: false });
                            }}
                        >
                            <PauseCircle sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    }
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                alt="Live from space album cover"
            />
        </Card >
    )
}

export default ProfileTracks