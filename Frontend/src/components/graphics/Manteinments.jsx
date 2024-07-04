
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpointMantenimientoTipo } from '../endpoints/Endpoints';
import styled from 'styled-components';

function StackedBarChart() {
    const [data, setData] = useState({ unidades: [], preventivos: [], tecnicos: [] });

    const getManteinmentsTipe = async () => {
        try {
            const response = await axios.get(endpointMantenimientoTipo);
            const result = response.data;
            const unidades = result.map(item => item.nombre_unidad);
            const preventivos = result.map(item => parseInt(item.total_preventivos));
            const tecnicos = result.map(item => parseInt(item.total_tecnicos));
            setData({ unidades, preventivos, tecnicos });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getManteinmentsTipe();
    }, []);
    
    return (
      <Content>
          <BarChart className='grafica'
          width={600}
          height={300}
            series={[
                { data: data.tecnicos, label: 'técnicos', id: 'uvId', stack: 'total', color: '#38a800' },
                { data: data.preventivos, label: 'preventivos', id: 'pvId', stack: 'total', color: '#73d542' },   
            ]}
            xAxis={[{ data: data.unidades, scaleType: 'band' }]}
        />
      </Content>
    );
}

const Content = styled.div`

.grafica{
    margin: 10px;
}

`;

export default StackedBarChart;
