import { gql, useMutation } from "@apollo/client";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { memo, useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { PhotoModal } from "components";
import { Permission } from "enums";
import { ADD_USER_PHOTO, firebaseStorage } from "helpers";
import { useScrollLock } from "hooks";
import { UserPhoto } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, Container, Photo, Title } from "./Photos.style";

interface Props {
  photos: UserPhoto[];
}

export const Photos = memo(function Photos({ photos }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [addUserPhoto] = useMutation(ADD_USER_PHOTO, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          photos: (existingPhotos = []) => {
            const newPhotoRef = cache.writeFragment({
              data: data?.addUserPhoto,
              fragment: gql`
                fragment NewPhoto on UserPhoto {
                  id
                }
              `,
            });

            return [newPhotoRef, ...existingPhotos];
          },
        },
        id: cache.identify({ ...authenticatedUser }),
      });
    },
  });
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme } = useSettingsStore();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const closePhotoModal = useCallback(() => {
    unlockScroll();
    setIsPhotoModalOpen(false);
  }, [unlockScroll]);

  function handleTitleClick() {
    if (window.scrollY > 0) {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }

  const openPhotoModal = useCallback(() => {
    lockScroll();
    setIsPhotoModalOpen(true);
  }, [lockScroll]);

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <>
      <Container.Main {...themeProps}>
        <Container.Top>
          <Title {...themeProps} onClick={handleTitleClick}>
            Photos
          </Title>
          <Button {...themeProps} onClick={openPhotoModal}>
            Add photo
          </Button>
        </Container.Top>
        <Container.Photos>
          {photos.map(({ id, url }) => (
            <Container.Photo key={id}>
              <Photo alt={id} src={url} />
            </Container.Photo>
          ))}
        </Container.Photos>
      </Container.Main>
      {isPhotoModalOpen &&
        createPortal(
          <PhotoModal
            onCloseClick={closePhotoModal}
            onSaveClick={(selectedFile) => {
              if (!selectedFile) {
                return;
              }

              const photoType = selectedFile.type.split("/")[1];
              const photoId = `${
                authenticatedUser?.id
              }/photos/${new Date().getTime()}.${photoType}`;
              const storageRef = ref(firebaseStorage, photoId);
              const uploadTask = uploadBytesResumable(
                storageRef,
                selectedFile as Blob
              );

              uploadTask.on(
                "state_changed",
                ({ bytesTransferred, totalBytes }) => {
                  console.log({
                    progress: Math.round((bytesTransferred / totalBytes) * 100),
                  });
                },
                (error) => {
                  console.log({ error });
                },
                async () => {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);

                  addUserPhoto({
                    variables: {
                      input: {
                        ownerId: authenticatedUser!.id,
                        url,
                        visibility: Permission.PUBLIC,
                      },
                    },
                  });
                }
              );
            }}
          />,
          document.body
        )}
    </>
  );
});
