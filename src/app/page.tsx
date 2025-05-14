import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from '@/utils/old.api'

export default async function HomePage() {

  // const res = await fetch("http://localhost:8000/api/v1/tracks/top",
  //   {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       category: "CHILL",
  //       limit: 10
  //     })
  //   }
  // )
  // console.log(">>>Check res server: ", await res.json())

  const res = await sendRequestJS({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 1
    }
  });

  console.log(">check res: ", res)

  return (
    <Container>
      <MainSlider />
    </Container>
  );
}
