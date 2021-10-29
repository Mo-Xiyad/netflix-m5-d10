import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";

const Home = () => {
  const [vidoes, setVidoes] = useState(null);

  const index = Math.floor(Math.random(0) * 15);

  const fetchTrailer = async () => {
    try {
      const response = await fetch(`https://api.pexels.com/videos/popular`, {
        headers: {
          Authorization:
            "563492ad6f9170000100000120628be3036d41feb0b2936d48c5d3a4",
        },
      });

      if (response.ok) {
        let data = await response.json();
        // console.log(data.videos[1].video_files[1].link);
        setVidoes(data.videos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [vidoes]);

  return (
    <Container fluid className="video-container">
      {!vidoes ? (
        <h1>Loading.......</h1>
      ) : (
        <video height="700" loop autoPlay playsinline className="video">
          <source src={vidoes[index].video_files[1].link} type="video/mp4" />
        </video>
      )}
    </Container>
  );
};

export default Home;
