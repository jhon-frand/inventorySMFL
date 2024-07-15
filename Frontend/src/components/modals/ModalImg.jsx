import styled from "styled-components";
import { IoMdClose } from "react-icons/io";;
import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { endpointEquipo } from "../endpoints/Endpoints";
import { MdPermMedia } from "react-icons/md";
import { AlertSucces } from "../alerts/Alerts";

function ModalImg({ children, estado, cambiarEstado, idUpdate, actualizarEquipos }) {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };
 const putImgEquipo = async (event) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('imagen', image);

    try {
      const respuesta = await axios.put(`${endpointEquipo}/imagen/${idUpdate}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (respuesta.status === 200) {
        console.log(respuesta.data.message);  // Verifica la estructura de la respuesta
        cambiarEstado();  // Cierra el modal al finalizar la petición
        actualizarEquipos();
        AlertSucces(respuesta.data.message);
      } else {
        console.log("Respuesta inesperada:", respuesta);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data);
      }
    }
  };

  const fetchOriginalImage = useCallback(async () => {
    try {
      const response = await axios.get(`${endpointEquipo}/imagen/${idUpdate}`);
      if (response.data && response.data.imagen) {
        setPreview(response.data.imagen);
      } else {
        setPreview(null);
      }
    } catch (error) {
      setPreview(null);
    }
  }, [idUpdate]);

   useEffect(() => {
    if (estado) {
      fetchOriginalImage();
    } else {
      setImage(null);
      setPreview(null);
    }
  }, [estado, fetchOriginalImage]);

  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <BotonCerrar onClick={() => cambiarEstado()}>
              <IoMdClose />
            </BotonCerrar>
            <form onSubmit={putImgEquipo}>
            <div className="content">
            {preview ? (
                <img src={preview} alt="Imagen del equipo" />
              ) : (
                children
              )}
            </div>
               <input
                type="file"
                id="file-input"
                name="imagen"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
             <div className="footer">
             <CustomFileButton type="button" onClick={triggerFileInput}>
                <MdPermMedia/>
                Seleccionar Nueva Imagen
              </CustomFileButton>
              <Button size="small" type="submit" variant="contained" color="success">
                Actualizar Imagen
              </Button>
             </div>
            </form>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
}

export default ModalImg;

const Overlay = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background: rgba(0, 0, 0, .5);
z-index: 30;
`;

const ContenedorModal = styled.div`
    width: 50vh;
    height: 65vh;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;

        img{
          width: 80%;
          object-fit: contain;
        }
        
        form{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          .content{
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .footer{
            display: flex;
            flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 20%;
          }
        }
`;
const CustomFileButton = styled.button`
  background-color: white;
  color: #38a800;
  width: 250px;
  border: 1px solid green;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 5px;

  &:hover{
            transition: right ease-in 0.5s;
            border: 1px solid gray;
            color: gray;
          }
`;

const BotonCerrar = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    font-size: 20px;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: white;

    &:hover{
        background: #ff0000c3;
        color: white;
    }
`;