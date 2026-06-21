import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ErrorSnackbar({ errorMessage, onClose }) {
  return (
    <Snackbar
      open={Boolean(errorMessage)} 
      onClose={onClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert 
        onClose={onClose}
        severity="error" 
        variant="filled"
        sx={{ 
          width: '100%', 
          borderRadius: '12px', 
          fontWeight: 500,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)' 
        }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
