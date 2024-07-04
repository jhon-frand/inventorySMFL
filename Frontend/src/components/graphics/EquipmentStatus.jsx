import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { endpointEquipo } from '../endpoints/Endpoints';

function EquipmentStatus() {

    const unidad = localStorage.getItem("unidad")

    const [data, setData] = useState({ estados: [], totales: [] });

    const getEquiposStatus = async () => {
        try {
            const respuesta = await axios.get(`${endpointEquipo}/estado/${unidad}`);
            const rawData = respuesta.data;

            // Transformar los datos al formato adecuado para BarChart
            const estados = rawData.map(item => item.estado);
            const totales = rawData.map(item => item.total);

            setData({ estados, totales });
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getEquiposStatus();
    }, []);

    return (
        <BarChart
            width={500}
            height={300}
            xAxis={[{ data: data.estados, scaleType: 'band'  }]}
            series={[{ 
                data: data.totales ,
                label: 'Equipos',
                color: '#38a800'
            }]}
        />
    );
}

export default EquipmentStatus;
