import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpointEquipo } from '../endpoints/Endpoints';


function StatusEquipments() {

    const [equipos, setEquipos] = useState([])

    const getStatusEquipment = async () => {
        try {
            const respuesta = await axios.get(`${endpointEquipo}/estados`)
            setEquipos(respuesta.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStatusEquipment();
    },[])
    
  return (
    <PieChart
   colors={['#73d542', '#38a800', '#ee6868', '#324da3']}
            series={[
                {
                    startAngle: 360,
                    endAngle: 10,
                    data: equipos.map(({ estado, total }) => ({
                        label: estado,
                        value: parseInt(total),
                    })),
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 20,
                    paddingAngle: 5,
                    cornerRadius: 5,
                },
            ]}
/>
  )
}

export default StatusEquipments