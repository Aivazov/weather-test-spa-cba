import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  onCloseModal: () => void;
  onConfirmModal: () => void;
  text: string;
  title: string;
  approveBtn: string;
};

const Modal = (props: Props) => {
  const { title, text, approveBtn, open, onCloseModal, onConfirmModal } = props;
  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      aria-labelledby='delete-dialog-title'
    >
      <DialogTitle id='delete-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal} color='primary'>
          Отмена
        </Button>
        <Button onClick={onConfirmModal} color='error' variant='contained'>
          {approveBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
