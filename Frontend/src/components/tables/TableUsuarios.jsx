import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { endpointUser } from '../endpoints/Endpoints'
import ButtonStatus from '../organismos/ButtonStatus'
import ButtonEdit from '../organismos/ButtonEdit'
import { RiUserSettingsLine } from 'react-icons/ri'
import { options } from '../styles/Table'
import MUIDataTable from 'mui-datatables'
import { AlertConfirmation, AlertSucces } from '../alerts/Alerts'

 
function TableUsuarios() {
    const [usuarios, setUsuarios] = useState([])

    const getUsers = async () => {
      try {
        await axios.get(endpointUser).then((response) => {
          const users = response.data;
          setUsuarios(users);
        })
      } catch (error) {
        console.log(error);
      }
    }

    const changeStatus = async (datos) => {
        try {
          const id_usuario = datos[0];
          const estadoUser = datos[8];
          // Determinar el nuevo estado
          const nuevoEstado = estadoUser === "activo" ? "inactivo" : "activo";
          
          const respuesta = await axios.put(`${endpointUser}/estado/${id_usuario}`, {
            estado: nuevoEstado
          });
          
          if (respuesta.status === 200) {
            // Busca el usuario por ID en la lista de usuarios y actualiza su estado
            const updatedUsers = usuarios.map((usuario) => {
              if (usuario.id_usuario === id_usuario) {
                return {
                  ...usuario,
                  estado: nuevoEstado
                };
              }
              // Retorna el usuario sin cambios si no es el usuario con el id al que queremos cambiar el estado
              return usuario; 
            });
        
            setUsuarios(updatedUsers);
            AlertSucces(respuesta.data.message)
          }
        } catch (error) {
          console.log(error);
        }
      }

      
   
    const columnas = [
      {
        name: "id_usuario",
        label: "ID"
      },
      {
        name: "identificacion",
        label: "IDENTIFICACIÓN"
      },
      {
        name: "nombres",
        label: "NOMBRES"
      },
      {
        name: "apellidos",
        label: "APELLIDOS"
      },
      {
        name: "email",
        label: "EMAIL"
      },
      {
        name: "rol",
        label: "ROL"
      },
      {
        name: "nombre_unidad",
        label: "UNIDAD"
      },
      {
       name: "telefono",
       label: "TELEFONO"
      },
      {
       name: "estado",
       label: "ESTADO",
       options: {
         customBodyRender: (value, tableMeta, updateValue) => {
           return (
             // <ButtonStatus text={tableMeta.rowData[8]} funcion={() => changeStatus(tableMeta.rowData)}/>
             <ButtonStatus text={tableMeta.rowData[8]} funcion={() => AlertConfirmation(() => changeStatus(tableMeta.rowData))}/>
           )
         }
       }
     },
      {
       name: "editar",
       label: "ACTIONS",
       options:{
         customBodyRender: (value, tableMeta, updateValue) => {
            const data = tableMeta.rowData;
           return (
             <ButtonEdit icon={<RiUserSettingsLine />} funcion1={() => getData(data)} />
           )
         }
       }
      }
    ];
    
    //#endregion table
   
    useEffect(() => {
     getUsers();
   }, [])
   
  return (
    <>
      <MUIDataTable className="table"
        title= "Lista de usuarios"
        data= {usuarios}
        columns= {columnas}
        options= {options}
        >
        </MUIDataTable>
    </>
  )
}

export default TableUsuarios