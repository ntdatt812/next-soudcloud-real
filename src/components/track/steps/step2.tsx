'use client'
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Button, MenuItem, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
function LinearWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload({ setInfo, info }: {
    setInfo: (v: INewTrack) => void,
    info: INewTrack

}) {
    const { data: session } = useSession();
    const handleUpload = async (image: any) => {
        const formData = new FormData();
        formData.append('fileUpload', image);
        try {
            const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    target_type: 'images'
                }
            })
            setInfo({
                ...info,
                imgUrl: res.data.data.fileName
            })
        } catch (error) {
            //@ts-ignore
            console.log(">>> check error: ", error?.response?.data?.message)
        }
    }
    return (
        <Button
            onChange={(e) => {
                const event = e.target as HTMLInputElement;
                if (event.files) {
                    handleUpload(event.files[0]);
                }
            }}
            component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

interface INewTrack {
    title: string;
    description: string;
    trackUrl: string;
    imgUrl: string;
    category: string;
}


const Step2 = ({ trackUpload }: { trackUpload: any }) => {
    console.log(">>> check trackUpload 1: ", trackUpload);

    const [info, setInfo] = React.useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: "",
    })

    React.useEffect(() => {
        if (trackUpload && trackUpload.fileNameSaveDB) {
            console.log(">>> check trackUpload: ", trackUpload);
            setInfo({
                ...info,
                trackUrl: trackUpload.fileNameSaveDB
            })
        }

    }, [trackUpload]);

    const category = [
        {
            value: 'CHILL',
            label: 'CHILL',
        },
        {
            value: 'WORKOUT',
            label: 'WORKOUT',
        },
        {
            value: 'PARTY',
            label: 'PARTY',
        }
    ];

    const handleSubmitForm = () => {
        console.log(">>> check info: ", info);
    }

    return (
        <div>
            <div>
                <div>
                    Your uploading track: {trackUpload.fileName}
                </div>
                <LinearProgressWithLabel value={trackUpload.percent} />
            </div>

            <Grid container spacing={2} mt={5}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 250, width: 250, background: "#ccc" }}>
                        <div >
                            {
                                info.imgUrl &&
                                <img
                                    height={250}
                                    width={250}
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`} alt="" />
                            }
                        </div>

                    </div>
                    <div >
                        <InputFileUpload
                            setInfo={setInfo}
                            info={info}
                        />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        value={info?.title}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                title: e.target.value,
                            })
                        }}
                        label="Title"
                        variant="standard"
                        fullWidth
                        margin="dense" />
                    <TextField
                        value={info?.description}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                description: e.target.value,
                            })
                        }}
                        label="Description"
                        variant="standard"
                        fullWidth
                        margin="dense" />
                    <TextField
                        sx={{
                            mt: 3
                        }}
                        value={info?.category}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                category: e.target.value,
                            })
                        }}
                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                    //   defaultValue="EUR"
                    >
                        {category.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 5
                        }}
                        onClick={() => handleSubmitForm()}
                    >Save</Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default Step2;