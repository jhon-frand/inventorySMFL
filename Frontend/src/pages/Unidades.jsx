import styled from "styled-components"
import { useState, useEffect } from 'react'
import HeaderPage from "../components/organismos/HeaderPage";
import { options } from "../styles/Styles";
import NavBar from "../components/organismos/NavBar";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import { PiBoundingBox } from "react-icons/pi";


function Unidades() {

  const endpoint = "http://localhost:3000/unidades"

  const [unidades, setUnidades] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [selectId, setSelectId] = useState(null)

  const [valores, setValores] = useState({
    nombre_unidad: ""
  })

  const getData = (datos) => {
    setValores({
      nombre_unidad: datos[1]
    })
    setSelectId(datos[0]);
    setModalUpdate(true);
  }

  const getUnidades = async () => {
      try {
          await axios.get(endpoint).then((response) => {
              const units = response.data;
              setUnidades(units);
          })
      } catch (error) {
          console.log(error);
      }
  }

  const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const putUnidad = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpoint}/${selectId}`, valores)
      if (respuesta.status === 200) {
        alert(respuesta.data.message)
      }
      setModalUpdate(false);
      getUnidades();
    } catch (error) {
      console.log(error);
    }
  }


  
  const valorInput = (event) => {
    setValores({
      ...valores,
      [event.target.name] : event.target.value
    })
  }
  const postUnidad = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpoint, valores)
      if (respuesta.status === 200) {
        alert (respuesta.data.message)
      }
      setModal(false);
      getUnidades();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      getUnidades();
  }, [])

  const columnas = [
      {
          name: "id_unidad",
          label: "ID"
      },
      {
          name: "nombre_unidad",
          label: "NOMBRE"
      },
       {
        name: "editar",
        label: "ACTIONS",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <ButtonEdit funcion1={() => getData(tableMeta.rowData)} />
            );
        }
        }
      }
  ]

  return (
  <>
    <Container>
      <NavBar/>
        <div className="contenedor">
          <HeaderPage icon={<PiBoundingBox />} titulo="UNIDADES PRODUCTIVAS" textButton="REGISTRAR UNIDAD PRODUCTIVA" funcion={()=> setModal(true)}/> 
          <div className="table-mui">
          <Modales>
            <Modal  
            titulo="REGISTRAR UNIDAD PRODUCTIVA"
            estado={modal}
            cambiarEstado={setModal}
            >
            <form onSubmit={postUnidad} className="formulario" >
            <div className="inputs-data">
              <div className="contents">
              <label>Nombre de la Unidad: </label>
              <input value={valores.nombre_unidad} onChange={valorInput} name="nombre_unidad" type="text" placeholder="Nombre de la Unidad" required/>
               </div>
            </div>
            <button>REGISTRAR</button>
          </form>
            </Modal>
            <Modal 
            titulo="ACTUALIZAR DATOS"
            estado={modalUpdate}
            cambiarEstado={setModalUpdate}
            >
               <form onSubmit={putUnidad} className="formulario" >
            <div className="inputs-data">
              <div className="contents">
              <label>Nombre de la Unidad: </label>
              <input value={valores.nombre_unidad} onChange={editValorInput} name="nombre_unidad" type="text" placeholder="Nombre de la Unidad" required/>
               </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
            </Modal>
          </Modales>
            <MUIDataTable className="table" 
            data={unidades}
            columns={columnas}
            options={options}
            />
          </div>
        </div>
    </Container>
  </>
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
  width: 40%;
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

  .contents{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 15px;
    border-radius: 5px;
    gap: 10px;

    label{
      font-size: 14px;
      font-weight: 600;
    }

    input{
      padding: 5px;
      width: 280px;
      border: none;
      outline: none;
      border-bottom: 1px solid #38a800;
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
.inputs-data{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #38a80030;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}
`;
export default Unidades