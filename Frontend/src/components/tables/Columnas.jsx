export const columnasDashboard = [
    {
      name: "nombre_unidad",
      label: "NOMBRE"
    },
    {
      name: "total_equipos",
      label: "EQUIPOS"
    }  
  ]

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
         return (
           <ButtonEdit icon={<RiUserSettingsLine />} funcion1={() => getData(tableMeta.rowData)} />
         )
       }
     }
    }
  ];