import { Button } from "../elements/Button";
import { Modal } from "../elements/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteActionModal({
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Title text="Are you sure you want to delete this item?" />
      <Modal.Content>
        <div className="flex gap-4 justify-end">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="error" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
