import { MutableRefObject, useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

import { useOutsideClick } from "hooks";
import { DropdownItem } from "models";

import { Container, Header, List, ListItem } from "./Dropdown.style";

interface Props {
  direction?: "BOTTOM" | "TOP";
  displayedItems: number;
  itemHeight: number;
  items: DropdownItem[];
  onItemSelected: (item: string) => void;
}

export function Dropdown({
  direction = "BOTTOM",
  displayedItems,
  itemHeight,
  items,
  onItemSelected,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const listRef = useRef() as MutableRefObject<HTMLUListElement>;
  const headerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (selectedItem !== items[0]) {
      setSelectedItem(items[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useOutsideClick({
    ref: containerRef,
    handle: handleOutsideClick,
  });

  function handleItemClick(item: DropdownItem) {
    if (item !== selectedItem) {
      setSelectedItem(item);
    }
    setIsExpanded((prev) => !prev);
    onItemSelected(item.key);
  }

  function handleOutsideClick() {
    if (isExpanded) {
      setIsExpanded((prev) => !prev);
    }
  }

  const listTopPosition = !isExpanded
    ? 0
    : direction === "BOTTOM"
    ? headerRef.current.offsetHeight
    : -listRef.current.offsetHeight;

  return (
    <Container ref={containerRef}>
      <Header ref={headerRef} onClick={() => setIsExpanded((prev) => !prev)}>
        <p>{selectedItem.value}</p>
        <MdArrowDropDown size={24} />
      </Header>
      <List
        displayedItems={displayedItems}
        isExpanded={isExpanded}
        itemHeight={itemHeight}
        ref={listRef}
        top={listTopPosition}
      >
        {items.map((item, index) => {
          const isSelected = item === selectedItem;

          return (
            <ListItem
              key={index}
              isSelected={isSelected}
              onClick={() => handleItemClick(item)}
            >
              {item.value}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
