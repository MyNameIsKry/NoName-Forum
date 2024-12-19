import { NotiType } from '@/types';
import { Snackbar, Alert } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  severity: NotiType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ open, message, severity, onClose }) => {
    return (
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={onClose} 
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
};

export default Notification;