import { Modal, Box, styled, Button } from '@mui/material';
import { ReactElement } from 'react';

interface SimpleModalProps {
  title: string;
  isOpen: boolean;
  setModalOpen?: Function;
  saveFunction?: Function;
  cancelFunction?: Function;
  children?: ReactElement;
}

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  boxShadow: '24',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  // boxShadow: 24,
  // p: 4 
}))

export const SimpleModal = ({ title, isOpen, setModalOpen, saveFunction, cancelFunction, children } : SimpleModalProps) => {
  const handleClose = () => {
    if (setModalOpen)
      setModalOpen(false);
    if (cancelFunction) {
      cancelFunction();
    }
  };

  const handleSave = () => {
    if (setModalOpen) 
      setModalOpen(false);
    if (saveFunction) {
      saveFunction();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <StyledBox>
        <h2 id="modal-title">{title}</h2>
        <div id="modal-description">
          {children}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant="contained" color="secondary" onClick={handleSave} sx={{ mr: 1 }}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </StyledBox>
    </Modal>
  );
};
