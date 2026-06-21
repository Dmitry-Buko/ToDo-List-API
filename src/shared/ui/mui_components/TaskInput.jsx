import TextField from '@mui/material/TextField';

export default function TaskInput({ value, onChange, disabled, error, helperText }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={!!error}
      helperText={helperText}
      placeholder="Новая задача..."
      variant="outlined"
      fullWidth
      slotProps={{
        htmlInput: { maxLength: 100 },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '46px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          '& fieldset': {
            borderColor: '#e0e0e0',
          },
          '&:hover fieldset': {
            borderColor: '#b0b0b0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6366f1',
          },
          '&.Mui-error fieldset': {
            borderColor: '#d32f2f',
          },
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#a0a0a0',
          opacity: 1,
        },
        '& .MuiFormHelperText-root': {
          position: 'absolute',
          bottom: '-20px',
          left: '4px',
          margin: 0,
          fontSize: '12px',
        },
      }}
    />
  );
}
