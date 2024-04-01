import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";
import { options } from "../styles/Styles";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import moment from "moment";
import { BsListOl } from "react-icons/bs";
import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
import MediumContainer from "../components/organismos/MediumContainer";

function Actividades() {

  const endpointActividad = "http://localhost:3000/actividades"
  const endpointTecnico = "http://localhost:3000/tecnicos"
  const endpointManteni = "http://localhost:3000/mantenimientos"

  const [actividades, setActividades] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [mantenimientos, setMantenimientos] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalTecnico, setModalTecnico] = useState(false)
  const [modalUpdateTecnico, setModalUpdateTecnico] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [selectIdTecnico, setSelectIdTecnico] = useState(null)

  const getActividades = async () => {
    try {
      await axios.get(endpointActividad).then((response) => {
        const activities = response.data;
        setActividades(activities);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getTecnicos = async () => {
    try {
      await axios.get(endpointTecnico).then((response) => {
        const technic = response.data;
        setTecnicos(technic);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getMantenimientos = async () => {
    try {
      await axios.get(endpointManteni).then((response) => {
        const manteinments = response.data;
        setMantenimientos(manteinments);
      })
    } catch (error) {
      console.log(error);
    }
   }

   const [valores, setValores] = useState({
    fecha_actividad: "",
    descripcion: "",
    fk_mantenimiento: "",
    fk_tecnico: ""
   })
   const clearFormActivity = () => {
    setValores({
      fecha_actividad: "",
      descripcion: "",
      fk_mantenimiento: "",
      fk_tecnico: ""
    })
    setSelectId(null)
    setModal(false)
    setModalUpdate(false)
   }
   const [valoresTecnico, setValoresTecnico] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: ""
   })
   const clearFormTecnico = () => {
    setValoresTecnico({
      identificacion: "",
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: ""
    })
    setSelectIdTecnico(null)
    setModalTecnico(false)
    setModalUpdateTecnico(false)
   }

   const getDataTecnico = (datos) => {
    setValoresTecnico({
      identificacion: datos[1],
      nombres: datos[2],
      apellidos: datos[3],
      correo: datos[4],
      telefono: datos[5]
    })
    setSelectIdTecnico(datos[0])
    setModalUpdateTecnico(true)
   }
   const getData = (datos) => {

    const tecnicoActividad = tecnicos.find(tenic => tenic.nombres === datos[4]);
    const tecnicoActividadId = tecnicoActividad ? tecnicoActividad.id_tecnico: "";

    const manteinmentActividad = mantenimientos.find(manteni => manteni.tipo_mantenimiento === datos[3]);
    const manteinmentActividadId = manteinmentActividad ? manteinmentActividad.id_mantenimiento: "";

    const fecha = moment(datos[1]).format('YYYY-MM-DD')

    setValores({
      fecha_actividad: fecha,
      descripcion: datos[2],
      fk_mantenimiento: manteinmentActividadId,
      fk_tecnico: tecnicoActividadId
    })
    setSelectId(datos[0])
    setModalUpdate(true)
   }
   const valorInput = (event) => {
    setValores({
      ...valores,
      [event.target.name] : event.target.value
    })
   }
   const valorInputTecnico = (event) => {
    setValoresTecnico({
      ...valoresTecnico,
      [event.target.name] : event.target.value
    })
   }
   const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
   }
   const editValorInputTecnico = (event) => {
    setValoresTecnico(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
   }
  const postTecnico = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointTecnico, valoresTecnico)
      if (respuesta.status === 200) {
        alert (respuesta.data.message);
      }
      clearFormTecnico();
      getTecnicos();
    } catch (error) {
      console.log(error);
    }
  }
  const postActivity = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointActividad, valores)
      if (respuesta.status === 200) {
        alert (respuesta.data.message);
      }
      clearFormActivity();
      getActividades();
    } catch (error) {
      console.log(error);
    }
  }
  const putActivity = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointActividad}/${selectId}`, valores)
      if (respuesta.status === 200) {
        alert (respuesta.data.message);
      }
      clearFormActivity();
      getActividades();
    } catch (error) {
      console.log(error);
    }
  }
  const putTecnico = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointTecnico}/${selectIdTecnico}`, valoresTecnico)
      if (respuesta.status === 200) {
        alert (respuesta.data.message);
      }
      clearFormTecnico();
      getTecnicos();
    } catch (error) {
      console.log(error);
    }
  }
  const columnas = [
    {
      name: "id_actividad",
      label: "ID"
    },
    {
      name: "fecha_actividad",
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
      name: "tipo_mantenimiento",
      label: "MANTENIMIENTO"
    },
    {
      name: "nombre_tecnico",
      label: "TECNICO"
    },
    {
      name: "nombre_equipo",
      label: "EQUIPO"
    },
    {
      name: "responsable",
      label: "RESPONSABLE"
    },
    {
      name: "descripcion_mantenimiento",
      label: "FALLAS DEL EQUIPO"
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <ButtonEdit funcion1={() => getData(tableMeta.rowData)} />
          )
        }
      }
    }
  ]
  const columnasTecnicos = [
    {
      name: "id_tecnico",
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
      name: "correo",
      label: "EMAIL"
    },
    {
      name: "telefono",
      label: "TELÉFONO"
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <ButtonEdit funcion1={() => getDataTecnico(tableMeta.rowData)} />
          )
        }
      }
    }
  ]

  useEffect(() => {
    getActividades();
    getTecnicos();
    getMantenimientos();
  }, [])

  return (
    <Container>
      <NavBar/>
      <div className="contenedor">
        <MediumContainer>
        <MUIDataTable className= "table-medium"
          title="Técnicos"
          data={tecnicos}
          columns={columnasTecnicos}
          options={options}
           />
        </MediumContainer>
        <HeaderPageTwo 
        icon={<BsListOl/>} 
        titulo="ACTIVIDADES Y TÉCNICOS" 
        textButton1="REGISTRAR ACTIVIDAD" 
        textButton2="REGISTRAR TÉCNICO"
        funcion1={()=> setModal(true)}
        funcion2={() => setModalTecnico(true)}
        />
      <Modales>
        <Modal
        titulo="RESISTRAR ACTIVIDAD"
        estado={modal}
        cambiarEstado={clearFormActivity}
        >
          <form className="formulario" onSubmit={postActivity}>
            <div className="inputs-data">
              <div className="filas">
                <div className="contents">
                  <label>Fecha de Actividad:</label>
                  <input name="fecha_actividad" value={valores.fecha_actividad} onChange={valorInput} type="date" required />
                </div>
                <div className="contents">
                  <label>Mantenimiento:</label>
                  <select name="fk_mantenimiento" value={valores.fk_mantenimiento} onChange={valorInput} required> 
                  <option value="">selecciona una opción</option>
                  {
                    mantenimientos.map((mantenimientos) => (
                      <option value={mantenimientos.id_mantenimiento} key={mantenimientos.id_mantenimiento}>{mantenimientos.id_mantenimiento} {mantenimientos.tipo_mantenimiento} {mantenimientos.resultado}</option>
                    ))
                  }
                  </select>
                </div>
                <div className="contents">
                  <label>Técnico:</label>
                  <select name="fk_tecnico" value={valores.fk_tecnico} onChange={valorInput} required> 
                  <option value="">selecciona una opción</option>
                  {
                    tecnicos.map((tecnicos) => (
                      <option value={tecnicos.id_tecnico} key={tecnicos.id_tecnico}>{tecnicos.nombres} {tecnicos.apellidos}</option>
                    ))
                  }
                  </select>
                </div>
              </div>
              <div className="filas">
              <div className="contents">
                  <label>Descripción</label>
                  <textarea name="descripcion" value={valores.descripcion} onChange={valorInput} maxLength={250} placeholder="Ingresa una descripción" required></textarea>
                </div>
              </div>
            </div>
            <button>REGISTRAR</button>
          </form>
        </Modal>
        <Modal
        titulo="ACTUALIZAR DATOS"
        estado={modalUpdate}
        cambiarEstado={clearFormActivity}
        >
          <form className="formulario" onSubmit={putActivity}>
            <div className="inputs-data">
              <div className="filas">
                <div className="contents">
                  <label>Fecha de Actividad:</label>
                  <input name="fecha_actividad" value={valores.fecha_actividad} onChange={editValorInput} type="date" required />
                </div>
                <div className="contents">
                  <label>Mantenimiento:</label>
                  <select name="fk_mantenimiento" value={valores.fk_mantenimiento} onChange={editValorInput} required> 
                  <option value="">selecciona una opción</option>
                  {
                    mantenimientos.map((mantenimientos) => (
                      <option value={mantenimientos.id_mantenimiento} key={mantenimientos.id_mantenimiento}>{mantenimientos.id_mantenimiento} {mantenimientos.tipo_mantenimiento} {mantenimientos.descripcion}</option>
                    ))
                  }
                  </select>
                </div>
                <div className="contents">
                  <label>Técnico:</label>
                  <select name="fk_tecnico" value={valores.fk_tecnico} onChange={editValorInput} required> 
                  <option value="">selecciona una opción</option>
                  {
                    tecnicos.map((tecnicos) => (
                      <option value={tecnicos.id_tecnico} key={tecnicos.id_tecnico}>{tecnicos.nombres} {tecnicos.apellidos}</option>
                    ))
                  }
                  </select>
                </div>
              </div>
              <div className="filas">
              <div className="contents">
                  <label>Descripción</label>
                  <textarea name="descripcion" value={valores.descripcion} onChange={editValorInput} maxLength={250} placeholder="Ingresa una descripción" required></textarea>
                </div>
              </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
        </Modal>
        <Modal
        titulo="REGISTRAR TÉCNICO"
        estado={modalTecnico}
        cambiarEstado={clearFormTecnico}
        >
          <form className="formulario" onSubmit={postTecnico}>
            <div className="inputs-data-tecnico">
              <div className="filas">
                <div className="contents">
                  <label>Identificación:</label>
                  <input name="identificacion" value={valoresTecnico.identificacion} onChange={valorInputTecnico} type="number" placeholder="Identificación" required />
                </div>
                <div className="contents">
                  <label>Nombres:</label>
                  <input name="nombres" value={valoresTecnico.nombres} onChange={valorInputTecnico} type="text" placeholder="Ingrese Nombres" required/>
                </div>
                <div className="contents">
                  <label>Apellidos:</label>
                  <input name="apellidos" value={valoresTecnico.apellidos} onChange={valorInputTecnico} type="text" placeholder="Ingrese Apellidos" required/>
                </div>
                <div className="contents">
                  <label>Correo:</label>
                  <input name="correo" value={valoresTecnico.correo} onChange={valorInputTecnico} type="email" placeholder="Ingrese un Correo" required/>
                </div>
                <div className="contents">
                  <label>Teléfono:</label>
                  <input name="telefono" value={valoresTecnico.telefono} onChange={valorInputTecnico} type="number" placeholder="Teléfono" required/>
                </div>
              </div>
            </div>
            <button>REGISTRAR</button>
          </form>
        </Modal>
        <Modal
        titulo="ACTUALIZAR DATOS"
        estado={modalUpdateTecnico}
        cambiarEstado={clearFormTecnico}
        >
          <form className="formulario" onSubmit={putTecnico}>
            <div className="inputs-data-tecnico">
              <div className="filas">
                <div className="contents">
                  <label>Identificación:</label>
                  <input name="identificacion" value={valoresTecnico.identificacion} onChange={editValorInputTecnico} type="number" placeholder="Identificación" required />
                </div>
                <div className="contents">
                  <label>Nombres:</label>
                  <input name="nombres" value={valoresTecnico.nombres} onChange={editValorInputTecnico} type="text" placeholder="Ingrese Nombres" required/>
                </div>
                <div className="contents">
                  <label>Apellidos:</label>
                  <input name="apellidos" value={valoresTecnico.apellidos} onChange={editValorInputTecnico} type="text" placeholder="Ingrese Apellidos" required/>
                </div>
                <div className="contents">
                  <label>Correo:</label>
                  <input name="correo" value={valoresTecnico.correo} onChange={editValorInputTecnico} type="email" placeholder="Ingrese un Correo" required/>
                </div>
                <div className="contents">
                  <label>Teléfono:</label>
                  <input name="telefono" value={valoresTecnico.telefono} onChange={editValorInputTecnico} type="number" placeholder="Teléfono" required/>
                </div>
              </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
        </Modal>
      </Modales>
      <div className="table-mui">
        <MUIDataTable className="table"
        title="Lista de Actividades"
        data={actividades}
        columns={columnas}
        options={options}
        />
      </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

.contenedor{
  background: #38A80020;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .table-medium{
    width: 90%;
    padding: 5px;

    th{
     background: #38A800;
     color: white;
     padding: 5px;
    }
  }

}

.table-mui{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .table{
     width: 90%;
     padding: 5px;

     th{
      background: #38A800;
      color: white;
      padding: 5px;
     }
  }
}
`;

const Modales = styled.div`
position: absolute;
top: 0;
left: 0;
z-index: 30;

.formulario{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .inputs-data-tecnico{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #38a80030;
    width: 100%;
    border-radius: 20px;
    padding: 10px;
  }

    .inputs-data{
      display: grid;
      grid-template-columns: 230px 230px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;

      select{
        padding: 4px;
        width: 210px;
        border: none;
        outline: none;
      }
      textarea{
        width: 220px;
        height: 170px;
        border: none;
        outline: none;
        resize: none;
      }
    }


    .filas{
      display: flex;
      flex-direction: column;
      gap: 10px;

      .contents{
        display: flex;
        flex-direction: column;
        background: white;
        padding: 5px;
        border-radius: 5px;
        gap: 10px;

        label{
          font-size: 14px;
          font-weight: 600;
        }
      }

    }
button{
  width: 200px;
  height: 40px;
  background: #38a800;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  margin-top: 20px;

  &:hover{
    cursor: pointer;
    background: #38a80090;
    color: green;
  }
}
}
input{
  padding: 5px;
  width: 180px;
  border: none;
  outline: none;
  border-bottom: 1px solid #38a800;
}
`;
export default Actividades