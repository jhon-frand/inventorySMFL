import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#38a800',
      '&:hover': {
        backgroundColor: 'rgba(56, 168, 0, 0.1)',
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#38a800',
    },
  }));

function ToggleStatus({ text, funcion, checked }) {
    return (
        <div>
         <CustomSwitch
        title={text}
        onClick={funcion}
        checked={checked}
      />
        </div>
    )
}

export default ToggleStatus;