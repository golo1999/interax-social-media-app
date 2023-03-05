import { createRef, MutableRefObject, useState } from "react";
import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";

import { Divider, Modal, RadioButton } from "components";
import { useOutsideClick } from "hooks";
import { Permission } from "models";

import {
  Button,
  CloseIconContainer,
  Footer,
  Header,
  List,
  ListItem,
  Title,
} from "./VisibilityModal.style";

export interface VisibilityItem {
  description?: string;
  icon: IconType;
  title: Permission;
}

interface Props {
  selectedItem: Permission;
  items: VisibilityItem[];
  onCloseClick: () => void;
  onDoneClick: (itemTitle: Permission) => void;
}

export function VisibilityModal({
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

  return (
    <Modal ref={modalContainerRef}>
      <Header>
        <div></div>
        <b>
          <Title>Select audience</Title>
        </b>
        <CloseIconContainer onClick={onCloseClick}>
          <MdClose color="#8d8f93" size={24} />
        </CloseIconContainer>
      </Header>
      <Divider />
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
                <Icon color="#e4e6ea" size={24} />
              </ListItem.IconContainer>
              <ListItem.DetailsContainer>
                <ListItem.Title>{formattedTitle}</ListItem.Title>
                {description && <p>{description}</p>}
              </ListItem.DetailsContainer>
              <RadioButton
                color={isSelected ? "#2e89ff" : "#8d8f93"}
                isChecked={isSelected}
                onChange={() => handleItemClick(item)}
              />
            </ListItem.Element>
          );
        })}
      </List>
      <Footer>
        <Button.Cancel onClick={onCloseClick}>Cancel</Button.Cancel>
        <Button.Done onClick={handleDoneClick}>Done</Button.Done>
      </Footer>
    </Modal>
  );
}
