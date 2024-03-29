import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDatatable from "mui-datatables"
import { options } from "../styles/Styles";
import HeaderPage from "../components/organismos/HeaderPage";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import { BsPinMap } from "react-icons/bs";

function Ubicaciones() {

  const endpoint = "http://localhost:3000/ubicaciones"
  const endpointUnit = "http://localhost:3000/unidades"
  
  const [unidades, setUnidades] = useState([])
  const [ubicaciones, setUbicaciones] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [selectId, setSelectId] = useState(null)

 const getUnidades = async () => {
  try {
    await axios.get(endpointUnit).then((response) => {
      const units = response.data;
      setUnidades(units);
    })
  } catch (error) {
    console.log(error);
  }
}
 const getUbicaciones = async () => {
     try {
         await axios.get(endpoint).then((response) => {
             const ubications = response.data;
             setUbicaciones(ubications);
         })
     } catch (error) {
         console.log(error);
     }
 }

 const [valores, setValores] = useState({
  fk_unidad_productiva: "",
  ambiente: "",
  sitio: ""
 })
 const getData = (datos) => {
  setValores({
    fk_unidad_productiva: datos[1],
    ambiente: datos[2],
    sitio: datos[3]
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
 const editValorInput = (event) => {
  setValores(prevState => ({
    ...prevState,
    [event.target.name] : event.target.value
  }))
 }

 const postUbication = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.post(endpoint, valores)
    if (respuesta.status === 200) {
      alert(respuesta.data.message) 
    }
    setModal(false);
    getUbicaciones();
  } catch (error) {
    console.log(error);
  }
 }
 const putUbication = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.put(`${endpoint}/${selectId}`, valores)
    if (respuesta.status === 200) {
      alert(respuesta.data.message) 
    }
    setModalUpdate(false);
    getUbicaciones();
  } catch (error) {
    console.log(error);
  }
 }

   useEffect(() => {
        getUbicaciones();
        getUnidades();
    }, [])

    const columnas = [
      {
          name: "id_ubicacion",
          label: "ID"
      },
      {
          name: "nombre_unidad",
          label: "UNIDAD"
      },
      {
          name: "ambiente",
          label: "AMBIENTE"
      },
      {
          name: "sitio",
          label: "SITIO"
      },
      {
        name: "editar",
        label: "ACTIONS",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <ButtonEdit funcion1={() => getData(tableMeta.rowData)}/>
            );
        }
        }
      }
  ]

    //#endregion table

  return (
    <>
    <Container>
      <NavBar/>
      <div className="contenedor">
      <HeaderPage icon={<BsPinMap/>} titulo="UBICACIONES" textButton="REGISTRAR UBICACIÓN" funcion={() => setModal(true)} />
      <Modales>
        <Modal
        titulo="REGISTRAR UBICACIÓN"
        estado={modal}
        cambiarEstado={setModal}
        >
          <form className="formulario" onSubmit={postUbication}>
            <div className="inputs-data">
              <div className="filas">
                  <div className="contents">
                    <label>Unidad Productiva</label>
                    <select name="fk_unidad_productiva" value={valores.fk_unidad_productiva} onChange={valorInput}>
                      <option value="">Selecciona una opción</option>
                      {
                        unidades.map((unidades) => (
                          <option value={unidades.id_unidad} key={unidades.id_unidad}>{unidades.nombre_unidad}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="contents">
                    <label>Ambiente:</label>
                    <input name="ambiente" value={valores.ambiente} onChange={valorInput} type="text" placeholder="Ambiente" />
                  </div>
                  <div className="contents">
                    <label>Sitio</label>
                    <input name="sitio" value={valores.sitio} onChange={valorInput} type="text" placeholder="Sitio" />
                  </div>
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
          <form className="formulario" onSubmit={putUbication}>
            <div className="inputs-data">
              <div className="filas">
                  <div className="contents">
                    <label>Unidad Productiva</label>
                    <select name="fk_unidad_productiva" value={valores.fk_unidad_productiva} onChange={editValorInput}>
                      <option value="">Selecciona una opción</option>
                      {
                        unidades.map((unidades) => (
                          <option value={unidades.id_unidad} key={unidades.id_unidad}>{unidades.nombre_unidad}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="contents">
                    <label>Ambiente:</label>
                    <input name="ambiente" value={valores.ambiente} onChange={editValorInput} type="text" placeholder="Ambiente" />
                  </div>
                  <div className="contents">
                    <label>Sitio</label>
                    <input name="sitio" value={valores.sitio} onChange={editValorInput} type="text" placeholder="Sitio" />
                  </div>
              </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
        </Modal>
      </Modales>
      <div className="table-mui">
     <MUIDatatable className="table"
    data={ubicaciones}
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
height: 100vh;

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
  justify-content: space-around;
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
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;
      width: 100%;

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

export default Ubicaciones