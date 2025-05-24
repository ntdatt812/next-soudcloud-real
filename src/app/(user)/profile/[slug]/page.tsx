import ProfileTracks from "@/components/header/profile.tracks";
import { sendRequest } from "@/utils/api";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
    const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
        method: "POST",
        body: {
            id: params.slug
        }
    });
    const tracks = res?.data?.result;

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={5}>
                {
                    tracks?.map((item: ITrackTop, index: number) => {
                        return (
                            <Grid item xs={12} md={6} key={index}>
                                <ProfileTracks item={item} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}

export default ProfilePage