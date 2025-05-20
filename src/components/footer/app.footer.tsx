'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) return (<></>)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    console.log(">>> check track: ", currentTrack)
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
                        layout='horizontal-reverse'
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2"
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",
                            minWidth: 200
                        }}
                    >
                        <div style={{ color: "#ccc" }}>Nguyen Thanh Dat</div>
                        <div style={{ color: "black" }}>Gọi mưa</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter