import { Divider } from "@mui/material";

import { createRef, MutableRefObject, ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";

import { Modal, RadioButton } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { Permission } from "models";

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

  return (
    <Modal minHeight="50vh" ref={modalContainerRef}>
      <>{ModalHeader}</>
      <Divider color="Onyx" />
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
                key={index}
                isSelected={isSelected}
                onClick={() => handleItemClick(item)}
              >
                <ListItem.IconContainer isSelected={isSelected}>
                  <Icon color={Colors.Platinum} size={24} />
                </ListItem.IconContainer>
                <ListItem.DetailsContainer>
                  <ListItem.Title>{formattedTitle}</ListItem.Title>
                  {description && <p>{description}</p>}
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
        <Button.Cancel onClick={onCloseClick}>Cancel</Button.Cancel>
        <Button.Done onClick={handleDoneClick}>Done</Button.Done>
      </Modal.Footer>
    </Modal>
  );
}
