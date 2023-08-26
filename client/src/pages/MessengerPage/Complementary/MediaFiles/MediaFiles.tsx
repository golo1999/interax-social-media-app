import { useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import { Navbar } from "components";
import { Colors } from "environment";
import { File as FileModel, Media, User } from "models";

import { File } from "./File";
import {
  Container,
  Header,
  Media as StyledMedia,
  Title,
} from "./MediaFiles.style";
import { Video } from "./Video";

interface Props {
  files: FileModel[] | null | undefined;
  isAvailable: boolean;
  media: Media[] | null | undefined;
  selectedOption: "FILES" | "MEDIA";
  user: User | null;
  onIconClick: () => void;
}

export function MediaFiles({
  files,
  isAvailable,
  media,
  selectedOption,
  user,
  onIconClick,
}: Props) {
  const ITEMS = useMemo(() => ["MEDIA", "FILES"], []);

  const [selectedNavbarItem, setSelectedNavbarItem] = useState(
    ITEMS.find((item) => item === selectedOption) || ITEMS[0]
  );

  const isMediaSelected = selectedNavbarItem === ITEMS[0];

  return (
    <Container.Main>
      <Header>
        <HiOutlineArrowLeft onClick={onIconClick} />
        <Title>Media and files</Title>
      </Header>
      <Navbar.Default
        items={ITEMS}
        selectedItem={selectedNavbarItem}
        onItemSelected={(item) => {
          if (selectedNavbarItem !== item) {
            setSelectedNavbarItem(item as string);
          }
        }}
      />
      {isMediaSelected ? (
        <Container.Media itemsCount={media?.length || 0}>
          {!isAvailable ? (
            <UnavailableData />
          ) : media && media.length > 0 ? (
            media.map((item, index) => {
              const { type, url } = item;

              if (type === "VIDEO") {
                return <Video key={index} url={url} />;
              }

              return (
                <StyledMedia alt="CONVERSATION_PHOTO" key={index} src={url} />
              );
            })
          ) : (
            <NoData isMediaSelected={isMediaSelected} user={user} />
          )}
        </Container.Media>
      ) : (
        <Container.Files>
          {!isAvailable ? (
            <UnavailableData />
          ) : files && files.length > 0 ? (
            files.map((item, index) => {
              const isDividerVisible = index < files.length - 1;

              return (
                <File
                  key={index}
                  isDividerVisible={isDividerVisible}
                  item={item}
                />
              );
            })
          ) : (
            <NoData isMediaSelected={isMediaSelected} user={user} />
          )}
        </Container.Files>
      )}
    </Container.Main>
  );
}

interface NoDataProps {
  isMediaSelected: boolean;
  user: User | null;
}

function NoData({ isMediaSelected, user }: NoDataProps) {
  const { firstName, lastName } = { ...user };

  return (
    <Container.NoData>
      {isMediaSelected ? (
        <>
          <p>No media</p>
          <p>
            Photos and videos that you exchange with {firstName} {lastName} will
            appear here.
          </p>
        </>
      ) : (
        <>
          <p>No files</p>
          <p>
            Files that you exchange with {firstName} {lastName} will appear
            here.
          </p>
        </>
      )}
    </Container.NoData>
  );
}

function UnavailableData() {
  return (
    <Container.Unavailable>
      <BsThreeDots color={Colors.OldSilver} size={32} />
    </Container.Unavailable>
  );
}
