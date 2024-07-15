import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpointMantenimiento } from '../endpoints/Endpoints';

function TypeManteinmentUnit() {
    const [data, setData] = useState([]);
    const unidad = localStorage.getItem("unidad");

    const getMantenimientos = async () => {
        try {
            const response = await axios.get(`${endpointMantenimiento}/type/${unidad}`);
            const result = response.data[0];

            if (result) {
                // Transformar los datos al formato adecuado para PieChart
                const formattedData = [
                    { id: 'Preventivo', label: 'Preventivo', value: parseInt(result.total_preventivos) },
                    { id: 'Predictivo', label: 'Predictivo', value: parseInt(result.total_predictivos) },
                    { id: 'Correctivo', label: 'Correctivo', value: parseInt(result.total_correctivos) }
                ];

                setData(formattedData);
            } else {
                // Si no hay datos, inicializar con valores por defecto
                setData([
                    { id: 'Preventivo', label: 'Preventivo', value: 0 },
                    { id: 'Correctivo', label: 'Correctivo', value: 0 }
                ]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMantenimientos();
    }, [unidad]);

    return (
        <PieChart
        colors={['#73d542',  '#d59042', '#38a800']}
            series={[{
                data: data.map(item => ({ ...item })),
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                innerRadius: 20,
                paddingAngle: 5,
                cornerRadius: 5,
            }]}
            width={300}
            height={300}
            slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'top', horizontal: 'middle' },
                  padding: 0,
                  labelStyle:{
                    fontSize: 14
                  }
                },
              }}
            margin={{ top: 40, bottom: 20, left: 0, right:0 }}
        />
    );
}

export default TypeManteinmentUnit;

