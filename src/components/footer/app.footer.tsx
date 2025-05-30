'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const playerRef = useRef(null);
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    const hasMounted = useHasMounted();
    console.log(">>> check current: ", currentTrack)
    useEffect(() => {
        if (currentTrack?.isPlaying === false) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause();
        }
        if (currentTrack?.isPlaying === true) {
            //@ts-ignore
            if (playerRef?.current?.audio?.current) {
                //@ts-ignore
                playerRef.current.audio.current.currentTime = 0
            }
        }
    }, [currentTrack])

    if (!hasMounted) return (<></>);
    return (
        <>
            {
                currentTrack._id &&
                <div style={{ marginTop: 50 }}>
                    <AppBar position="fixed"
                        sx={{
                            top: 'auto', bottom: 0,
                            background: "#f2f2f2"
                        }}
                    >
                        <Container
                            disableGutters
                            sx={{
                                display: "flex", gap: 10,
                                ".rhap_main": {
                                    gap: "30px"
                                }
                            }}>
                            <AudioPlayer
                                ref={playerRef}
                                layout='horizontal-reverse'
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                                volume={0.5}
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
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                justifyContent: "center",
                                width: "220px",
                            }}>
                                <div
                                    style={{
                                        color: "#ccc",
                                        width: "100%",
                                        overflow: "hidden",
                                        textOverflow: 'ellipsis',
                                        whiteSpace: "nowrap"
                                    }}>{currentTrack.description}</div>
                                <div style={{
                                    color: "black",
                                    width: "100%",
                                    overflow: "hidden",
                                    textOverflow: 'ellipsis',
                                    whiteSpace: "nowrap"
                                }}>{currentTrack.title}</div>
                            </div>
                        </Container>
                    </AppBar>
                </div >
            }
        </>
    )
}

export default AppFooter