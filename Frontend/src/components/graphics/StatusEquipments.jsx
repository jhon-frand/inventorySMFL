import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpointEquipo } from '../endpoints/Endpoints';

function StatusEquipments() {

    const [equipos, setEquipos] = useState([]);

    const getStatusEquipment = async () => {
        try {
            const respuesta = await axios.get(`${endpointEquipo}/estados`);
            setEquipos(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStatusEquipment();
    }, []);

    return (
        <PieChart
            width={310}
            height={300}
            colors={['#73d542', '#38a800', '#385c57', '#cb7755']}
            series={
                [
                    {
                      data: equipos.map(({ estado, total }) => ({
                            label: estado,
                            value: parseInt(total),
                        })),
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 50,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    },
                ]}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                    labelStyle:{
                        fontSize: 14
                      }
                },
            }}
            margin={{ top: 15, bottom: 65, left: 0, right: 0 }}
        />

    );
}

export default StatusEquipments;

