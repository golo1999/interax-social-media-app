import { createRef, MutableRefObject } from "react";
import { MdAddCircleOutline, MdClose } from "react-icons/md";

import { AddData, Divider, Modal } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";

import { Button, CloseIconContainer, Title } from "./EditDetailsModal.style";

interface Props {
  onCloseClick: () => void;
  onSaveClick: () => void;
}

export function EditDetailsModal({ onCloseClick, onSaveClick }: Props) {
  const modalContainerRef = createRef<HTMLDivElement>();

  useOutsideClick({
    ref: modalContainerRef as MutableRefObject<HTMLElement>,
    handle: onCloseClick,
  });

  return (
    <Modal minHeight="50vh" ref={modalContainerRef} width="550px">
      <Modal.Header
        alignItems="center"
        color={Colors.Platinum}
        gap="0.5em"
        justifyContent="space-between"
        padding="0.75em"
      >
        <div></div>
        <b>
          <Title>Edit details</Title>
        </b>
        <CloseIconContainer onClick={onCloseClick}>
          <MdClose color={Colors.PhilippineGray} size={24} />
        </CloseIconContainer>
      </Modal.Header>
      <Divider thickness="1px" />
      <Modal.Body
        color={Colors.Platinum}
        direction="column"
        gap="1em"
        padding="0.75em"
      >
        <div>
          <h4>Customize your intro</h4>
          <p style={{ color: Colors.PhilippineGray }}>
            Details you select will be public.
          </p>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75em" }}
        >
          <h4>Work</h4>
          <AddData
            icon={MdAddCircleOutline}
            text="Add a workplace"
            onClick={() => {
              // TODO
            }}
          />
        </div>
        <div>
          <h4>Education</h4>
        </div>
        <div>
          <h4>Relationship</h4>
        </div>
      </Modal.Body>
      <Divider thickness="1px" />
      <Modal.Footer gap="0.5em" justifyContent="space-between" padding="0.75em">
        <h4 style={{ color: Colors.BrightNavyBlue }}>
          Update Your Information
        </h4>
        <div style={{ display: "flex", gap: "0.5em" }}>
          <Button.Cancel onClick={onCloseClick}>Cancel</Button.Cancel>
          <Button.Save onClick={onSaveClick}>Save</Button.Save>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
