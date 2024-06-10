import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { endpointUnidad } from '../endpoints/Endpoints'; // Asegúrate de que este sea el camino correcto a tu archivo de endpoints

const StraightAnglePieChart = () => {

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
      const units = response.data;

      // Iterar sobre cada unidad y agregar el total de equipos
      const updatedUnits = await Promise.all(
        units.map(async (unidad) => {
          const totalEquipos = await getTotalEquiposUnit(unidad.nombre_unidad);
          return { ...unidad, total_equipos: totalEquipos };
        })
      );

       // Filtrar las unidades que tienen equipos
       const filteredUnits = updatedUnits.filter(unit => unit.total_equipos > 0);

       // Transformar los datos para el PieChart
       const chartData = filteredUnits.map((unit) => ({
         label: unit.nombre_unidad,
         value: unit.total_equipos,
       }));

      setData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUnidades();
  }, []);

  return (
    <PieChart
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          data,
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default StraightAnglePieChart;

