import { Close } from "@mui/icons-material";

import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { firebaseStorage } from "helpers";

import { Container, Icon } from "./PhotoPage.style";

export function PhotoPage() {
  const { key: locationKey } = useLocation();
  const navigate = useNavigate();
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [isPageHovered, setIsPageHovered] = useState(false);

  const storageRef = ref(firebaseStorage, "Postman.png");

  useEffect(() => console.log({ downloadURL }), [downloadURL]);

  useEffect(() => {
    async function getURL() {
      try {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
      } catch (error) {
        console.log({ error });
      }
    }

    getURL();
  }, [storageRef]);

  function handleBackNavigation() {
    // If the history stack is empty (there is no previous route) => redirecting to the Home page
    if (locationKey === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  return (
    <Container.Main
      onMouseEnter={() => {
        setIsPageHovered(true);
      }}
      onMouseLeave={() => {
        setIsPageHovered(false);
      }}
    >
      <Container.Top>
        <Container.TopIcon onClick={handleBackNavigation}>
          <Close sx={{ color: "white", fontSize: "1.75rem" }} />
        </Container.TopIcon>
      </Container.Top>
      <Container.Navigation.Left
        $isVisible={isPageHovered}
        onClick={() => console.log("back")}
      >
        <Container.NavigationIcon>
          <Icon.Navigation.Back fontSize="large" />
        </Container.NavigationIcon>
      </Container.Navigation.Left>
      <Container.Image>
        <img
          alt=""
          src={downloadURL}
          // src="https://firebasestorage.googleapis.com/v0/b/interax-social-media-app.appspot.com/o/G7hzLHBWCNhUQmjSFterlrrTeHc2%2FprofilePhotos%2F1718292371024.png?alt=media&token=d2937b92-bd9a-45b8-bbcf-145046c49abe"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          onClick={() => {
            console.log("img");
          }}
        />
      </Container.Image>
      <Container.Navigation.Right $isVisible={isPageHovered}>
        <Container.NavigationIcon>
          <Icon.Navigation.Forward fontSize="large" />
        </Container.NavigationIcon>
      </Container.Navigation.Right>
    </Container.Main>
  );
}
