import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';

const useConfirm = (title: string, message: string): [React.FC, () => Promise<boolean>, (newMessage: string) => void] => {
  const [promiseResolver, setPromiseResolver] = useState<{resolve: (b: boolean) => void} | null>(null);
  const [currentMessage, setCurrentMessage] = useState("")

  const confirm = () => new Promise((resolve: (b: boolean) => void, reject: (b: boolean) => void) => {
    setPromiseResolver({ resolve });
  });

  const handleClose = () => {
    setPromiseResolver(null);
  };

  const handleConfirm = () => {
    promiseResolver?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promiseResolver?.resolve(false);
    handleClose();
  };

  const changeCurrentMessage = (newMessage: string) => {
    setCurrentMessage(newMessage);
  }

  const ConfirmationDialog = () => (
    <Dialog
      open={promiseResolver !== null}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{currentMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Igen</Button>
        <Button onClick={handleCancel}>Mégse</Button>
      </DialogActions>
    </Dialog>
  );

  useEffect(() => {
    setCurrentMessage(message)
  }, [message])
  

  return [ConfirmationDialog, confirm, changeCurrentMessage];
};

export default useConfirm;
