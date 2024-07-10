
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from 'react';
import axios from 'axios';
import { endpointTypeMantenimiento } from '../endpoints/Endpoints';
import { useEffect } from 'react';


function TypeManteinments() {

    const [mantenimientos, setMantenimientos] = useState([])

    const getMantenimientos = async () => {
        try {
            const response = await axios.get(endpointTypeMantenimiento)
            const result = response.data;
            setMantenimientos(result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMantenimientos();
    }, [])


    return (
        <PieChart
            colors={['#73d542', '#d59042', '#38a800']}
            series={[
                {
                    startAngle: 400,
                    endAngle: 120,
                    data: mantenimientos.map(({ tipo_mantenimiento, total_mantenimientos }) => ({
                        label: tipo_mantenimiento,
                        value: parseInt(total_mantenimientos),
                    })),
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 20,
                    paddingAngle: 5,
                    cornerRadius: 5,
                },
            ]}
            width={300}
            height={200}
        />
    );
}
export default TypeManteinments;
