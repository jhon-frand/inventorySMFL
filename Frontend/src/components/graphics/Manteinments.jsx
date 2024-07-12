
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpointMantenimientoTipo } from '../endpoints/Endpoints';

function StackedBarChart() {
    const [data, setData] = useState({ unidades: [], predictivos: [], preventivos: [], correctivos: [] });

    const getManteinmentsTipe = async () => {
        try {
            const response = await axios.get(endpointMantenimientoTipo);
            const result = response.data;
            const unidades = result.map(item => item.nombre_unidad);
            const predictivos = result.map(item => parseInt(item.total_predictivos));
            const preventivos = result.map(item => parseInt(item.total_preventivos));
            const correctivos = result.map(item => parseInt(item.total_correctivos));
            setData({ unidades, predictivos, preventivos, correctivos });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getManteinmentsTipe();
    }, []);
    
    return (
          <BarChart 
          width={600}
          height={300}
            series={[
                { data: data.correctivos, label: 'correctivos', id: 'uvId', stack: 'total', color: '#38a800' },
                { data: data.preventivos, label: 'preventivos', id: 'pvId', stack: 'total', color: '#73d542' },
                { data: data.predictivos, label: 'predictivos', id: 'hvId', stack: 'total', color: '#d59042' },
            ]}
            xAxis={[{ data: data.unidades, scaleType: 'band' }]}
        />
    );
}



export default StackedBarChart;
