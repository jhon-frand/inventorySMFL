import MUIDataTable from 'mui-datatables'
import React from 'react'
import { endpointMantenimiento } from '../endpoints/Endpoints';

function TableMantenimientos() {

    const [mantenimientos, setMantenimientos] = useState([])
    const [mantenimientosUnit, setMantenimientosUnit] = useState([])
    const user = localStorage.getItem("user");

    const getMantenimientos = async () => {
        try {
          await axios.get(endpointMantenimiento).then((response) => {
            const manteinments = response.data;
            setMantenimientos(manteinments);
          })
        } catch (error) {
          console.log(error);
        }
       }

       const getMantenimientosUnidad = async () => {
        try {
          await axios.get(`${endpointMantenimiento}/${unidadUser}`).then((response) => {
            const manteinmentUnit = response.data;
            setMantenimientosUnit(manteinmentUnit);
          })
         
        } catch (error) {
          console.log(error);
        }
       }
       const columnas =[
        {
          name: "id_mantenimiento",
          label: "ID"
        },
        {
          name: "tipo_mantenimiento",
          label: "TIPO"
        },
        {
          name: "fecha_mantenimiento",
          label: "FECHA",
          options: {
            customBodyRender: (value) => {
              const fecha = moment(value).format('YYYY-MM-DD');
              return fecha;
            }
          }
        },
        {
          name: "descripcion",
          label: "DESCRIPCION"
        },
        {
          name: "usuario",
          label: "RESPONSABLE"
        },
        {
          name: "nombre_equipo",
          label: "EQUIPO"
        },
        {
          name: "resultado",
          label: "RESULTADO"
        },
        {
          name: "editar",
          label: "EDITAR",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />} funcion1={() => getData(tableMeta.rowData)} />
              )
            }
          }
        },
        {
          name: "editar",
          label: "ACTIVIDADES",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <>
               <div className="btns-edit">
               <ButtonEdit titulo="Registrar Actividad" icon={<FaSquarePlus />} funcion1={() => getIdMantenimiento(tableMeta.rowData)} />
                <IoEyeSharp title="Ver actividades" className="icon-activity" onClick={() => getActividadesMantenimiento(tableMeta.rowData[0])}/>
               </div>
                </>
              )
            }
          }
        }
       ]
  return (
    <div className="table-mui">
        {
          user && user === "1" ? (
            <MUIDataTable className="table"
            title="Lista de Mantenimientos"
           data={mantenimientos}
           columns={columnas}
           options={options}
            />
          ):(
            <MUIDataTable className="table"
            title="Lista de Mantenimientos"
           data={mantenimientosUnit}
           columns={columnas}
           options={options}
            />
          )
        }
       
      </div>
  )
}

export default TableMantenimientos