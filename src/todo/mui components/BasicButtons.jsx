import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({loading}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined">{loading ? "Регистрация..." : "Зарегистрироваться"}</Button>
    </Stack>
  );
}
{/* <Button variant="text">Text</Button>
  
<Button variant="contained">Contained</Button> */}