import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

 function FloatingIcon({funcion1, icon}) {
  return (
    <Fab 
    onClick={() => funcion1()}
    title='Editar'
      size="small" 
      sx={{ 
        bgcolor: '#babdb9', 
        color: '#ffff', 
        width: 30,  
        height: 30, 
        minHeight: 'unset', // Resetea la altura mínima predeterminada
        '&:hover': { 
          bgcolor: '#38a800' 
        } 
      }}
    >
      {<EditIcon sx={{ fontSize: 18 }} />}
    </Fab>
  );
}
export default FloatingIcon;
