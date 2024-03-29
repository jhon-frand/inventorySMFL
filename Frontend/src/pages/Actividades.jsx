import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";
import HeaderPage from "../components/organismos/HeaderPage";
import { options } from "../styles/Styles";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Modal from "../components/modals/Modal";

function Actividades() {

  const endpointActividad = "http://localhost:3000/actividades"
  const endpointTecnico = "http://localhost:3000/tecnicos"
  const endpointManteni = "http://localhost:3000/mantenimientos"

  const [actividades, setActividades] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [mantenimientos, setMantenimientos] = useState([])
  const [modal, setModal] = useState(false)

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
   const valorInput = (event) => {
    setValores({
      ...valores,
      [event.target.name] : event.target.value
    })
   }
  const postActivity = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointActividad, valores)
      if (respuesta === 200) {
        alert (respuesta.data.message);
      }
      setModal(false);
      getActividades();
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
      label: "FECHA"
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
        <HeaderPage titulo="ACTIVIDADES" textButton="REGISTRAR ACTIVIDAD" funcion={()=> setModal(true)}/>
      <Modales>
        <Modal
        titulo="RESISTRAR ACTIVIDAD"
        estado={modal}
        cambiarEstado={setModal}
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
                      <option value={mantenimientos.id_mantenimiento} key={mantenimientos.id_mantenimiento}>{mantenimientos.id_mantenimiento} {mantenimientos.tipo_mantenimiento}</option>
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
      </Modales>
      <div className="table-mui">
        <MUIDataTable className="table"
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
      padding: 10px;
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

    .inputs-data{
      display: grid;
      grid-template-columns: 230px 230px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;

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

      input{
        padding: 5px;
        width: 180px;
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
      }
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
`;
export default Actividades