'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const playerRef = useRef(null);
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    const hasMounted = useHasMounted();
    console.log(">>> check track: ", currentTrack)

    useEffect(() => {
        if (currentTrack.isPlaying === true) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.play();
        } else {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause();
        }
    }, [currentTrack])

    if (!hasMounted) return (<></>);
    return (
        <div style={{ marginTop: "50px" }}>
            <AppBar
                position="fixed"
                sx={{
                    top: 'auto',
                    bottom: 0,
                    background: "#f2f2f2"
                }}
            ><Container sx={{
                display: "flex", gap: 10,
                ".rhap_main": {
                    gap: "30px"
                }
            }}>
                    <AudioPlayer
                        // autoPlay
                        ref={playerRef}
                        layout='horizontal-reverse'
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2"
                        }}
                        onPlay={() => {
                            setCurrentTrack({ ...currentTrack, isPlaying: true })
                        }}
                        onPause={() => {
                            setCurrentTrack({ ...currentTrack, isPlaying: false })
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",
                            minWidth: 300
                        }}
                    >
                        <div style={{ color: "#ccc" }}>{currentTrack.uploader.name}</div>
                        <div style={{ color: "black" }}>{currentTrack.title}</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter