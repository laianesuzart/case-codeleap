import { Button } from "../elements/Button";
import { Modal } from "../elements/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDeleteActionModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: Props) {
  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={loading}
    >
      <Modal.Title text="Are you sure you want to delete this item?" />
      <Modal.Content>
        <div className="flex gap-4 justify-end">
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="error"
            onClick={onConfirm}
            disabled={loading}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
