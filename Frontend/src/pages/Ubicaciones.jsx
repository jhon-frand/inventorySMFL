import { useState, useEffect } from "react";
import axios from "axios";
import MUIDatatable from "mui-datatables"
import { options } from "../components/styles/Table";
import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
import HeaderPage from "../components/organismos/HeaderPage";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import { BsPinMap } from "react-icons/bs";
import { Contenedor } from "../components/styles/StylesPages";
import { AlertSucces, AlertError } from "../components/alerts/Alerts";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Select, TextField } from "@mui/material";
import { 
  endpointUbicacion,
  endpointUnidad
 } from "../components/endpoints/Endpoints";
import { Container, Modales } from "../components/styles/StylesUbicaciones";
import ContentInput from "../components/organismos/ContentInput";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";

function Ubicaciones() {

  //#region funciones

  const [unidades, setUnidades] = useState([])
  const [ubicaciones, setUbicaciones] = useState([])
  const [ubicacionesUnidad, setUbicacionesUnidad] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalUnit, setModalUnit] = useState(false)
  const [modalUpdateUnit, setModalUpdateUnit] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [selectIdUnit, setSelectIdUnit] = useState(null)
  const [errores, setErrores] = useState("")

  const token = localStorage.getItem("token");
  const unidad = localStorage.getItem("unidad")
  const user = localStorage.getItem("user")
  const idunidad = localStorage.getItem("id_unidad")

  const getUnidades = async () => {
    try {
      await axios.get(endpointUnidad).then((response) => {
        const units = response.data;
        setUnidades(units);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getUbicaciones = async () => {
    try {
      await axios.get(endpointUbicacion).then((response) => {
        const ubications = response.data;
        setUbicaciones(ubications);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getUbicacionesUnidad = async () => {
    try {
      await axios.get(`${endpointUbicacion}/${unidad}`).then((response) => {
        const ubications = response.data;
        setUbicacionesUnidad(ubications);
      })
    } catch (error) {
      console.log(error);
    }
  }
 const getIdUnidad = () => {
    try {
      setValores(prevState => ({
        ...prevState,
        fk_unidad_productiva: idunidad
      }));
      setModal(true);
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
    setErrores("")
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
    setErrores("")
    setSelectIdUnit(null)
    setModalUpdateUnit(false)
    setModalUnit(false)
  }
  const getData = (datos) => {

    const unidadProductiva = unidades.find(unit => unit.nombre_unidad === datos[1]);
    const unidadProductivaId = unidadProductiva ? unidadProductiva.id_unidad : "";
    setValores({
      fk_unidad_productiva: unidadProductivaId,
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
      [event.target.name]: event.target.value
    })
  }
  const valorInputUnit = (event) => {
    const { name, value } = event.target;

    setValoresUnit({
      ...valoresUnit,
      [name]: value
    });

  };
  const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }
  const editValorInputUnit = (event) => {
    const { name, value } = event.target;

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
      const respuesta = await axios.post(endpointUbicacion, valores, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormUbi();
      getUbicaciones();
      getUbicacionesUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error.response.data.msg);
    }
  }
  const postUnidad = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointUnidad, valoresUnit, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormUnit();
      getUnidades();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const putUbication = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointUbicacion}/${selectId}`, valores, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormUbi();
      getUbicaciones();
      getUbicacionesUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const putUnidad = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointUnidad}/${selectIdUnit}`, valoresUnit, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormUnit();
      getUnidades();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }

  useEffect(() => {
    getUbicaciones();
    getUbicacionesUnidad();
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
            <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />
          } funcion1={() => getData(tableMeta.rowData)} />
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
            <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />
          } funcion1={() => getDataUnit(tableMeta.rowData)} />
          );
        }
      }
    }
  ]
  //#endregion table
  //#endregion funciones
  return (
    <>
      <Container>
        <Contenedor>
          {
            user && user === "2" ? (
              <HeaderPage
                icon={<BsPinMap />}
                funcion={() => getIdUnidad()}
                titulo="UBICACIONES"
                text="REGISTRAR UBICACIÓN"
                iconButton={<AiOutlinePlus/>}
              />
            ) : (
              <HeaderPageTwo
                icon={<BsPinMap />}
                titulo="UNIDADES Y UBICACIONES"
                textButton1="REGISTRAR UBICACIÓN"
                textButton2="REGISTRAR UNIDAD"
                funcion1={() => setModal(true)}
                funcion2={() => setModalUnit(true)} />
            )
          }
          <Modales>
            <Modal
              titulo="REGISTRAR UBICACIÓN"
              estado={modal}
              cambiarEstado={clearFormUbi}
            >
              <form className="formulario" onSubmit={postUbication}>
                <div className="inputs-data">
                  <div className="filas">
                    <ContentInput>
                      <FormControl>
                        
                        {
                        user && user === "1" ? (
                          <>
                          <InputLabel>Unidad productiva</InputLabel>
                          <Select label="Unidad productiva" name="fk_unidad_productiva" value={valores.fk_unidad_productiva} onChange={valorInput} required>
                            
                            {
                              unidades.map((unidades) => (
                                <MenuItem value={unidades.id_unidad} key={unidades.id_unidad}>{unidades.nombre_unidad}</MenuItem>
                              ))
                            }
                          </Select>
                          </>
                        ) : (
                          <div className="inputs-encar">
                            <TextField 
                              label="ID"
                              className="idUnidad"
                              name="fk_unidad_productiva"
                              value={valores.fk_unidad_productiva}
                              onChange={valorInput}
                              readOnly
                              required
                            />
                            <TextField
                            label="Unidad productiva"
                              value={unidad}
                              readOnly
                              required
                            />
                          </div>
                        )
                      }
                      </FormControl>
                    </ContentInput>
                    <ContentInput>
                      <TextField name="ambiente" value={valores.ambiente} onChange={valorInput} label="Ambiente" variant="outlined" required />
                     {
                        errores && errores.some(([campo]) => campo === "ambiente") && (
                          <p>
                            {errores.find(([campo]) => campo === "ambiente")[1]}
                          </p>
                        )
                      }
                    </ContentInput>
                    <ContentInput>
                      <TextField name="sitio" value={valores.sitio} onChange={valorInput} variant="outlined" label="Sitio" required />
                      {
                        errores && errores.some(([campo]) => campo === "sitio") && (
                          <p>
                            {errores.find(([campo]) => campo === "sitio")[1]}
                          </p>
                        )
                      }
                    </ContentInput>
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
                    <ContentInput>
                      <FormControl>
                      
                      {
                        user && user === "1" ? (
                          <>
                          <InputLabel>Unidad productiva</InputLabel>
                          <Select label="Unidad productiva" name="fk_unidad_productiva" value={valores.fk_unidad_productiva} onChange={editValorInput} required>
                            
                            {
                              unidades.map((unidades) => (
                                <MenuItem value={unidades.id_unidad} key={unidades.id_unidad}>{unidades.nombre_unidad}</MenuItem>
                              ))
                            }
                          </Select>
                          </>
                        ) : (
                          <div className="inputs-encar">
                            <TextField 
                            label="ID"
                            className="idUnidad"
                              name="fk_unidad_productiva"
                              value={valores.fk_unidad_productiva}
                              onChange={editValorInput}
                              readOnly
                              required
                            />
                            <TextField
                            label="Unidad productiva"
                              value={unidad}
                              readOnly
                              required
                            />
                          </div>
                        )
                      }
                      </FormControl>
                    </ContentInput>
                     
                    <ContentInput>
                      <TextField label="Ambiente" name="ambiente" value={valores.ambiente} onChange={editValorInput} type="text" placeholder="Ambiente" />
                      {
                        errores && errores.some(([campo]) => campo === "ambiente") && (
                          <p>
                            {errores.find(([campo]) => campo === "ambiente")[1]}
                          </p>
                        )
                      }
                    </ContentInput>
                    <ContentInput>
                      <TextField label="Sitio" name="sitio" value={valores.sitio} onChange={editValorInput} type="text" placeholder="Sitio" />
                      {
                        errores && errores.some(([campo]) => campo === "sitio") && (
                          <p>
                            {errores.find(([campo]) => campo === "sitio")[1]}
                          </p>
                        )
                      }
                    </ContentInput>
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
                  <ContentInput>
                    <TextField value={valoresUnit.nombre_unidad} onChange={valorInputUnit} name="nombre_unidad" id="outlined-basic" label="Nombre de la Unidad"  />
                    {
                      errores && errores.some(([campo]) => campo === "nombre_unidad") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombre_unidad")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
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
                  <ContentInput>
                    <TextField value={valoresUnit.nombre_unidad} onChange={editValorInputUnit} name="nombre_unidad" id="outlined-basic" label="Nombre de la Unidad" variant="outlined"  />

                    {
                      errores && errores.some(([campo]) => campo === "nombre_unidad") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombre_unidad")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                </div>
                <button>ACTUALIZAR</button>
              </form>
            </Modal>
          </Modales>
          <div className="table-mui">
          {
            user && user === "1" ? (
              <MUIDatatable  className={`table-one ${user === '1' ? 'width-48' : ''}`}
              title="Lista de Ubicaciones"
              data={ubicaciones}
              columns={columnas}
              options={options}
            />
            ): (
              <MUIDatatable  className={`table-one ${user !== '1' ? 'width-90' : ''}`}
              title="Lista de Ubicaciones"
              data={ubicacionesUnidad}
              columns={columnas}
              options={options}
            />
            )
          }

           {
            user && user === "1" && (
              <MUIDatatable className="table-two"
              title="Unidades"
              data={unidades}
              columns={columnasUnidades}
              options={options}
            />
            )
           }
          </div>
        </Contenedor>
      </Container>
    </>
  )
}

export default Ubicaciones