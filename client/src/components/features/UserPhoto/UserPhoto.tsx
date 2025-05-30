import { Close, PhotoCamera } from "@mui/icons-material";

import { useState } from "react";
import { FaUser } from "react-icons/fa";

import { Colors } from "environment";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import { Container, Photo } from "./UserPhoto.style";
import { Props } from "./UserPhoto.types";

export function UserPhoto({
  containerSize,
  containerStyle,
  iconSize,
  iconStyle,
  isChatHead,
  isProfilePhoto,
  isSquare,
  photoStyle,
  user = null,
  onChangePhotoClick,
  onPhotoClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { closeMessageBox } = useMessagesStore();
  const { theme } = useSettingsStore();
  const [isCloseChatHeadIconVisible, setIsCloseChatHeadIconVisible] =
    useState(false);

  if (!user) {
    return (
      <Container.Main
        containerSize={containerSize}
        hasProfilePhoto={false}
        isSquare={isSquare}
        style={containerStyle}
        onClick={onPhotoClick}
      >
        <FaUser color={Colors.RaisinBlack} size={iconSize} style={iconStyle} />
      </Container.Main>
    );
  }

  const { profilePhoto } = user;

  const hasProfilePhoto = !!profilePhoto;

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main
      containerSize={containerSize}
      hasProfilePhoto={hasProfilePhoto}
      isSquare={isSquare}
      style={containerStyle}
      onClick={onPhotoClick}
    >
      {hasProfilePhoto ? (
        <Container.Photo
          onMouseEnter={() => {
            if (isChatHead) {
              setIsCloseChatHeadIconVisible(true);
            }
          }}
          onMouseLeave={() => {
            if (isChatHead) {
              setIsCloseChatHeadIconVisible(false);
            }
          }}
        >
          <Photo
            alt="PROFILE_PHOTO"
            isSquare={isSquare}
            src={profilePhoto.url}
            style={photoStyle}
          />
          {isChatHead && isCloseChatHeadIconVisible && (
            <Container.CloseChatHead
              {...themeProps}
              onClick={(e) => {
                e.stopPropagation();
                closeMessageBox(authenticatedUser!.id, user.id);
              }}
            >
              <Close
                sx={{
                  color:
                    !!authenticatedUser && theme === "DARK"
                      ? Colors.Platinum
                      : Colors.VampireBlack,
                  fontSize: "12px",
                }}
              />
            </Container.CloseChatHead>
          )}
          {isProfilePhoto && authenticatedUser?.id === user.id && (
            <Container.ChangePhoto
              {...themeProps}
              onClick={(e) => {
                e.stopPropagation();
                onChangePhotoClick();
              }}
            >
              <PhotoCamera
                fontSize="small"
                sx={{
                  color:
                    !!authenticatedUser && theme === "DARK"
                      ? Colors.White
                      : Colors.VampireBlack,
                }}
              />
            </Container.ChangePhoto>
          )}
        </Container.Photo>
      ) : (
        <Container.NoPhoto
          onMouseEnter={() => {
            if (isChatHead) {
              setIsCloseChatHeadIconVisible(true);
            }
          }}
          onMouseLeave={() => {
            if (isChatHead) {
              setIsCloseChatHeadIconVisible(false);
            }
          }}
        >
          <FaUser
            color={Colors.RaisinBlack}
            size={iconSize}
            style={iconStyle}
          />
          {isChatHead && isCloseChatHeadIconVisible && (
            <Container.CloseChatHead
              {...themeProps}
              onClick={(e) => {
                e.stopPropagation();
                closeMessageBox(authenticatedUser!.id, user.id);
              }}
            >
              <Close
                sx={{
                  color:
                    !!authenticatedUser && theme === "DARK"
                      ? Colors.Platinum
                      : Colors.VampireBlack,
                  fontSize: "12px",
                }}
              />
            </Container.CloseChatHead>
          )}
          {isProfilePhoto && authenticatedUser?.id === user.id && (
            <Container.ChangePhoto
              {...themeProps}
              onClick={(e) => {
                e.stopPropagation();
                onChangePhotoClick();
              }}
            >
              <PhotoCamera
                fontSize="small"
                sx={{
                  color:
                    !!authenticatedUser && theme === "DARK"
                      ? Colors.White
                      : Colors.VampireBlack,
                }}
              />
            </Container.ChangePhoto>
          )}
        </Container.NoPhoto>
      )}
    </Container.Main>
  );
}
