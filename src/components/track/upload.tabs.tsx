'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Step1 from './steps/step1';
import Step2 from './steps/step2';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index &&
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>}
        </div>
    );
}


const UploadTabs = () => {
    const [value, setValue] = React.useState(0);
    const [trackUpload, setTrackUpload] = React.useState({
        fileName: "",
        percent: 0,
        fileNameSaveDB: ""
    });


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', border: "1px solid #ccc", marginTop: "50px" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Track" disabled={value !== 0} />
                    <Tab label="Basic Information" disabled={value !== 1} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Step1
                    setValue={setValue}
                    setTrackUpload={setTrackUpload}
                    trackUpload={trackUpload}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Step2
                    trackUpload={trackUpload}
                    setValue={setValue}
                />
            </CustomTabPanel>
        </Box>
    );
}

export default UploadTabs