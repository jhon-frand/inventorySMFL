
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
                    
                    data: mantenimientos.map(({ tipo_mantenimiento, total_mantenimientos }) => ({
                        label: tipo_mantenimiento,
                        value: parseInt(total_mantenimientos),
                    })),
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 50,
                    paddingAngle: 3,
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

            width={310}
            height={300}
            margin={{ top: 20, bottom: 40, left: 0, right:0 }}
        />
    );
}
export default TypeManteinments;
