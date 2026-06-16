import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';

export default function AddTaskButton({ loading }) {
  return (
    <LoadingButton
      type="submit"
      loading={loading}
      loadingPosition="start"
      startIcon={<AddIcon />}
      variant="contained"
      sx={{
        backgroundColor: '#6366f1',
        color: '#fff',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '15px',
        borderRadius: '12px',
        padding: '10px 24px',
        height: '46px',
        boxShadow: 'none',
        
        '&:hover': {
          backgroundColor: '#4f46e5',
          boxShadow: 'none',
        },
        
        // Стили кнопки во время загрузки (когда она disabled)
        '&.Mui-disabled': {
          backgroundColor: '#a5b4fc',
          color: '#ffffff',
        },
        
        // Цвет самого крутящегося спиннера
        '& .MuiLoadingButton-loadingIndicator': {
          color: '#fff',
        },
      }}
    >
      Добавить
    </LoadingButton>
  );
}
