import { Divider } from "@mui/material";

import { createRef, MutableRefObject, ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";

import { Modal, RadioButton } from "components";
import { Permission } from "enums";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, List, ListItem } from "./VisibilityModal.style";

export interface VisibilityItem {
  description?: string;
  icon: IconType;
  title: Permission;
}

interface Props {
  bodyDescription?: ReactNode;
  header?: ReactNode;
  items: VisibilityItem[];
  selectedItem: Permission;
  onCloseClick: () => void;
  onDoneClick: (itemTitle: Permission) => void;
}

export function VisibilityModal({
  bodyDescription,
  header,
  items,
  selectedItem: initiallySelectedItem,
  onCloseClick,
  onDoneClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [selectedItem, setSelectedItem] = useState(getInitialSelectedItem());

  const modalContainerRef = createRef<HTMLDivElement>();

  useOutsideClick({
    ref: modalContainerRef as MutableRefObject<HTMLElement>,
    handle: onCloseClick,
  });

  function getInitialSelectedItem() {
    return (
      items.find((item) => item.title === initiallySelectedItem) || items[0]
    );
  }

  function handleDoneClick() {
    onDoneClick(selectedItem.title);
    onCloseClick();
  }

  function handleItemClick(item: VisibilityItem) {
    if (item !== selectedItem) {
      setSelectedItem(item);
    }
  }

  const ModalHeader = header || (
    <Modal.Header
      isTemplate
      rightIcon={MdClose}
      title="Select Audience"
      onRightIconClick={onCloseClick}
    />
  );

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const iconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "DarkJungleGreen";

  return (
    <Modal minHeight="50vh" ref={modalContainerRef} width="35vw">
      <>{ModalHeader}</>
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body color="PhilippineGray" direction="column">
        {bodyDescription}
        <List>
          {items.map((item, index) => {
            const { description, icon: Icon, title } = item;
            const isSelected = item === selectedItem;
            const formattedTitle = title
              .substring(0, 1)
              .concat(title.substring(1).replaceAll("_", " ").toLowerCase());

            return (
              <ListItem.Element
                $isAuthenticated={!!authenticatedUser}
                $theme={theme}
                key={index}
                isSelected={isSelected}
                onClick={() => handleItemClick(item)}
              >
                <ListItem.IconContainer
                  $isAuthenticated={!!authenticatedUser}
                  $theme={theme}
                >
                  <Icon color={Colors[iconColor]} size={24} />
                </ListItem.IconContainer>
                <ListItem.DetailsContainer>
                  <ListItem.Title
                    $isAuthenticated={!!authenticatedUser}
                    $theme={theme}
                  >
                    {formattedTitle}
                  </ListItem.Title>
                  {description && (
                    <p
                      style={{
                        color:
                          !!authenticatedUser && theme === "DARK"
                            ? Colors.Platinum
                            : Colors.PhilippineGray,
                      }}
                    >
                      {description}
                    </p>
                  )}
                </ListItem.DetailsContainer>
                <RadioButton
                  color={isSelected ? "BrilliantAzure" : "PhilippineGray"}
                  isChecked={isSelected}
                  onChange={() => handleItemClick(item)}
                />
              </ListItem.Element>
            );
          })}
        </List>
      </Modal.Body>
      <Modal.Footer
        alignItems="center"
        gap="0.5em"
        justifyContent="flex-end"
        padding="0.75em"
      >
        <Button.Cancel
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          onClick={onCloseClick}
        >
          Cancel
        </Button.Cancel>
        <Button.Done onClick={handleDoneClick}>Done</Button.Done>
      </Modal.Footer>
    </Modal>
  );
}
