import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { endpointUnidad } from '../endpoints/Endpoints';
import { useState, useEffect } from 'react';

function TotalEquipments() {
    const [data, setData] = useState([]);

    const getTotalEquiposUnit = async (nombre_unidad) => {
        try {
            const respuesta = await axios.get(`${endpointUnidad}/equipos/${nombre_unidad}`);
            return respuesta.data.total_equipos;
        } catch (error) {
            console.log(error);
            return 0;
        }
    };

    const getUnidades = async () => {
        try {
            const response = await axios.get(endpointUnidad);
            const unidades = response.data;

            // Iterar sobre cada unidad y obtener el total de equipos
            const newData = await Promise.all(
                unidades.map(async (unidad) => {
                    const totalEquipos = await getTotalEquiposUnit(unidad.nombre_unidad);
                    return { unidad: unidad.nombre_unidad, totalEquipos: totalEquipos };
                })
            );

            setData(newData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUnidades();
    }, []);

    return (
        <BarChart
            width={500}
            height={300}
            series={[
                {
                    data: data.map((item) => item.totalEquipos),
                    label: 'Equipos',
                    color: '#38a800'
                },
            ]}
            xAxis={[{ data: data.map((item) => item.unidad), scaleType: 'band' }]}
        />
    );
}

export default TotalEquipments;

