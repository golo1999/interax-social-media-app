import { MdAddCircleOutline } from "react-icons/md";

import { AddData, AddPlace, PlacesHistory } from "components";
import { FriendshipStatus } from "enums";
import { Colors } from "environment";
import { Place, User } from "models";
import { useAuthenticationStore } from "store";

interface Props {
  filteredPlacesHistory: Place[];
  friendshipStatus: FriendshipStatus;
  isAddPlaceVisible: boolean;
  user: User;
  closeAddPlace: () => void;
  openAddPlace: () => void;
}

export function PlacesLived({
  filteredPlacesHistory,
  friendshipStatus,
  isAddPlaceVisible,
  user,
  closeAddPlace,
  openAddPlace,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();

  const userIsAuthenticatedUser = user.id === authenticatedUser?.id;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        <h4 style={{ color: Colors.LightGray }}>Places lived</h4>
        {userIsAuthenticatedUser && (
          <>
            {!isAddPlaceVisible ? (
              <AddData
                icon={MdAddCircleOutline}
                text="Add a city"
                textFontWeight="500"
                onClick={openAddPlace}
              />
            ) : (
              <AddPlace
                user={user}
                onCancelClick={closeAddPlace}
                onSaveClick={closeAddPlace}
              />
            )}
          </>
        )}
        <PlacesHistory
          data={filteredPlacesHistory}
          friendshipStatus={friendshipStatus}
          user={user}
        />
      </div>
    </div>
  );
}
