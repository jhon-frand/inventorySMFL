import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpointEquipo } from '../endpoints/Endpoints';


function TotalEquipments() {
    const [data, setData] = useState({ unidades: [], activos: [], inactivos: [], mantenimientos: [] });

    const getEquiposEstado = async () => {
        try {
            const response = await axios.get(`${endpointEquipo}/total/equipos/estado`);
            const result = response.data;
            const unidades = result.map(item => item.nombre_unidad);
            const activos = result.map(item => parseInt(item.total_activos));
            const inactivos = result.map(item => parseInt(item.total_inactivos));
            const mantenimientos = result.map(item => parseInt(item.total_mantenimiento));
            setData({ unidades, activos, inactivos, mantenimientos });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEquiposEstado();
    }, []);

    return (
        <BarChart
            width={600}
            height={300}
            series={[
                { data: data.activos, label: 'Activos', id: 'uId', stack: 'total', color: '#38a800' },
                { data: data.inactivos, label: 'Inactivos', id: 'pvId', stack: 'total', color: '#73d542' },
                { data: data.mantenimientos, label: 'Mantenimiento', id: 'hvId', stack: 'total', color: '#d59042' },
            ]}
            xAxis={[{ data: data.unidades, scaleType: 'band' }]}
        />
    );
}

export default TotalEquipments;


