import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDatatable from "mui-datatables"
import { options } from "../styles/Styles";
import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
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
  const [modalUnit, setModalUnit] = useState(false)
  const [modalUpdateUnit, setModalUpdateUnit] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [selectIdUnit, setSelectIdUnit] = useState(null)

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
 const clearFormUbi = () => {
  setValores({
    fk_unidad_productiva: "",
    ambiente: "",
    sitio: ""
  })
  setSelectId(null)
  setModalUpdate(false)
  setModal(false)
 }
 const [valoresUnit, setValoresUnit] = useState({
  nombre_unidad: ""
})
const clearFormUnit = () => {
  setValoresUnit({
    nombre_unidad: ""
  })
  setSelectIdUnit(null)
  setModalUpdateUnit(false)
  setModalUnit(false)
}
 const getData = (datos) => {
  setValores({
    fk_unidad_productiva: datos[1],
    ambiente: datos[2],
    sitio: datos[3]
  })
  setSelectId(datos[0])
  setModalUpdate(true)
}
const getDataUnit = (datos) => {
  setValoresUnit({
    nombre_unidad: datos[1]
  })
  setSelectIdUnit(datos[0]);
  setModalUpdateUnit(true);
}
 const valorInput = (event) => {
  setValores({
    ...valores,
    [event.target.name] : event.target.value
  })
 }
 const valorInputUnit = (event) => {
  const { name, value } = event.target;

  // Validar que solo se ingresen letras y espacios
  if (/^[a-zA-Z\s]+$/.test(value) || value === '') {
    setValoresUnit({
      ...valoresUnit,
      [name]: value
    });
  }
};
 const editValorInput = (event) => {
  setValores(prevState => ({
    ...prevState,
    [event.target.name] : event.target.value
  }))
 }
 const editValorInputUnit = (event) => {
  const {name, value} = event.target;

   // Validar que solo se ingresen letras y espacios
   if (/^[a-zA-Z\s]+$/.test(value) || value === '') {
  setValoresUnit(prevState => ({
    ...prevState,
    [name]: value
   }))
}
}

 const postUbication = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.post(endpoint, valores)
    if (respuesta.status === 200) {
      alert(respuesta.data.message) 
    }
    clearFormUbi();
    getUbicaciones();
  } catch (error) {
    console.log(error);
  }
 }
 const postUnidad = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.post(endpointUnit, valoresUnit)
    if (respuesta.status === 200) {
      alert (respuesta.data.message)
    }
    clearFormUnit();
    getUnidades();
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
    clearFormUbi();
    getUbicaciones();
  } catch (error) {
    console.log(error);
  }
 }
 const putUnidad = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.put(`${endpointUnit}/${selectIdUnit}`, valoresUnit)
    if (respuesta.status === 200) {
      alert(respuesta.data.message)
    }
    clearFormUnit();
    getUnidades();
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
  const columnasUnidades = [
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
              <ButtonEdit funcion1={() => getDataUnit(tableMeta.rowData)} />
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
      <HeaderPageTwo 
      icon={<BsPinMap/>} 
      titulo="UNIDADES Y UBICACIONES" 
      textButton1="REGISTRAR UBICACIÓN" 
      textButton2="REGISTRAR UNIDAD" 
      funcion1={() => setModal(true)} 
      funcion2={() => setModalUnit(true)} />
      <Modales>
        <Modal
        titulo="REGISTRAR UBICACIÓN"
        estado={modal}
        cambiarEstado={clearFormUbi}
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
        cambiarEstado={clearFormUbi}
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
        <Modal  
            titulo="REGISTRAR UNIDAD PRODUCTIVA"
            estado={modalUnit}
            cambiarEstado={clearFormUnit}
            >
            <form onSubmit={postUnidad} className="formulario" >
            <div className="inputs-data">
              <div className="contents">
              <label>Nombre de la Unidad: </label>
              <input value={valoresUnit.nombre_unidad} onChange={valorInputUnit} name="nombre_unidad" type="text" placeholder="Nombre de la Unidad" required/>
               </div>
            </div>
            <button>REGISTRAR</button>
          </form>
          </Modal>
          <Modal 
            titulo="ACTUALIZAR DATOS"
            estado={modalUpdateUnit}
            cambiarEstado={clearFormUnit}
            >
               <form onSubmit={putUnidad} className="formulario" >
            <div className="inputs-data">
              <div className="contents">
              <label>Nombre de la Unidad: </label>
              <input value={valoresUnit.nombre_unidad} onChange={editValorInputUnit} name="nombre_unidad" type="text" placeholder="Nombre de la Unidad" required/>
               </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
            </Modal>
      </Modales>
      <div className="table-mui">
     <MUIDatatable className="table-one"
     title="Lista de Ubicaciones"
    data={ubicaciones}
    columns={columnas}
    options={options}
    />
     <MUIDatatable className="table-two" 
     title="Unidades"
     data={unidades}
     columns={columnasUnidades}
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
  justify-content: center;
  align-items: center;
  gap:20px;

  .table-one{
     width: 48%;
     padding: 5px;

     th{
      background: #38A800;
      color: white;
      padding: 10px;
     }
  }
  .table-two{
     width: 40%;
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
  
      }

      input{
        padding: 5px;
        width: 200px;
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
`;

export default Ubicaciones