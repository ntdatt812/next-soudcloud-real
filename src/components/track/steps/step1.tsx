'use client'
import './theme.css'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback, useState } from 'react';
import { sendRequestFile } from '@/utils/api';
import { useSession } from 'next-auth/react';
import axios from 'axios';

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

function InputFileUpload() {
    return (
        <Button
            onClick={(event) => {
                event.preventDefault()
            }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
            />
        </Button>
    );
}
const Step1 = ({ setValue, setTrackUpload }: { setValue: (v: number) => void, setTrackUpload: any }) => {
    const { data: session } = useSession();
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1);
            const audio = acceptedFiles[0];
            const formData = new FormData();
            formData.append('fileUpload', audio);

            try {
                const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                        target_type: 'tracks'
                    },
                    onUploadProgress: progressEvent => {
                        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                        console.log(">>> check percentCompleted: ", percentCompleted);
                        setTrackUpload({
                            fileName: audio.name,
                            percent: percentCompleted
                        })
                        // do whatever you like with the percentage complete
                        // maybe dispatch an action that will update a progress bar or something
                    }
                })

            } catch (error) {
                //@ts-ignore
                console.log(">>> check error: ", error?.response?.data?.message)
            }
        };
    }, [session])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio': [".mp3"]
        }
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Kéo và thả một số tệp ở đây hoặc nhấp để chọn tệp</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Step1