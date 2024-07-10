import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ children, text1, text2, text3 }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Estilos comunes para ambos tabs
  const commonTabStyles = {
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    marginRight: '2px',
    '&.Mui-selected': {
      backgroundColor: '#38a800',
      color: 'white',
    },
  };

  return (
    <Box sx={{ width: '90%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} onChange={handleChange} aria-label="basic tabs example"
        indicatorColor="secondary" 
        textColor="inherit"
        sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#9ada7a',
            },
          }} >
          <Tab label={text1}{...a11yProps(0)} 
            sx={commonTabStyles}
            title="Lista de mantenimientos registrados"
          />
          <Tab label={text2} {...a11yProps(1)} 
          sx={commonTabStyles}
          title="Lista de actividades que se han registrado a los mantenimientos"
          />
          <Tab label={text3} {...a11yProps(2)} 
          sx={commonTabStyles}
          title="Técnicos registrados en el sistema"
          />
        </Tabs>
      </Box>
      {React.Children.map(children, (child, index) => (
        <CustomTabPanel value={value} index={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

BasicTabs.propTypes = {
  children: PropTypes.node.isRequired,
};

