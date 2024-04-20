import styled from "styled-components"
import logo from "../../assets/sena.png"
import { AiOutlineLeft, AiOutlineHome } from "react-icons/ai"
import { GoTools } from "react-icons/go";
import { BsPinMap } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { PiBoundingBox } from "react-icons/pi";
import { CgToolbox } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom"
import { LuLogOut } from "react-icons/lu";

function SideBar({ openSide, setOpenSide }) {

    const user = localStorage.getItem("user");

    const navigate = useNavigate();
    const closeSesion = () => {
      alert('quieres cerrar sesión?')
      localStorage.removeItem("token");
      navigate("/")
      window.location.reload()
    }

    const filteredLinksArray = user === "2"
        ? linksArray.filter(link => link.label !== "Usuarios" && link.label !== "Unidades")
        : linksArray;
    const modificarSideBar = () => {
        setOpenSide(!openSide);
    }
    return (
        <Container $isOpen={openSide}>
            <button className="sideBarButton"
                onClick={modificarSideBar}>
                <AiOutlineLeft className="cerrarSideBar" />
            </button>
            <div className="logoContent">
                <div className="imgContent">
                    <img src={logo} alt="Logo Inventory" />
                </div>
                <h2>SENA - YAMBORÓ</h2>
            </div>
            {
                filteredLinksArray.map(({ icon, label, to }) => (
                    <div className="linkContainer" key={label}>
                        <NavLink to={to} className={({ isActive }) => `links ${isActive ? `active` : ``}`}>
                            <div className="linkIcon">
                                {icon}
                            </div>
                            {
                                openSide && (
                                    <span>{label}</span>
                                )
                            }
                        </NavLink>
                    </div>
                ))
            }
            <footer>
             <div className="content-footer">
             {
                    user && user === "1" && (
                        <p>Administrador</p>
                    )
                }
                {
                    user && user === "2" && (
                        <p>Encargado</p>
                    )
                }
                <button onClick={closeSesion}><LuLogOut /><p>Cerrar Sesión</p></button>
             </div>
            </footer>
        </Container>
    )
}
//#region links
const linksArray = [
    {
        label: "Dashboard",
        icon: <AiOutlineHome />,
        to: "/dashboard"
    },
    {
        label: "Unidades",
        icon: <PiBoundingBox />,
        to: "/unidades"
    },
    {
        label: "Usuarios",
        icon: <FiUsers />,
        to: "/usuarios"
    },
    {
        label: "Equipos",
        icon: <CgToolbox />,
        to: "/equipos"
    },
    {
        label: "Mantenimientos",
        icon: <GoTools />,
        to: "/mantenimientos"
    },
    {
        label: "Ubicaciones",
        icon: <BsPinMap />,
        to: "/ubicaciones"
    }
];

//#endregion links
const Container = styled.div`
position: fixed;
width: ${({ $isOpen }) => ($isOpen ? "250px" : "80px")}; 
transition: width 0.3s;
height: 100vh;
background: white;

.content-footer{
    padding: 5px;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    button{
      padding: 10px;
      border-radius: 10px;
      border: none;
      color: #23500d;
      background: #beccca87;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      p{
        color: #23500d;
      }

      &:hover{
        background: #38A80050;
      }

      svg{
        font-size: 25px;
      }
    }

    p{
    display: ${({$isOpen}) => ($isOpen ? "block" : "none")};
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    color: #23500d;
}
}

.sideBarButton{
    position: absolute;
    top: 80px;
    right: -30px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    background: #38A800;
    box-shadow: 0 0 5px #38A800;
    transition: all 0.5s;
    transform: ${({ $isOpen }) => ($isOpen ? `` : `rotate(180deg)`)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .cerrarSideBar{
        font-size: 16px;
        color: white;
    }
}

.logoContent{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    gap: 10px;

    h2{
        font-size: 18px;
        display: ${({ $isOpen }) => ($isOpen ? `block` : `none`)};
    }
}

.imgContent{
    display: flex;
    img{
        width: 80px;
    }
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    transform: ${({ $isOpen }) => ($isOpen ? `scale(0.9)` : `scale(1.1)`)};
}

.linkContainer{
    display: flex;
    justify-content: center;
    flex-direction: column;

    .links{
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: black;
        padding: 10px;
        margin: 2px;

        &:hover{
            border-radius: 10px;
            color: #006400;
            background: #38A80060;
                 }
        
        span{
            width: 150px;
        }
        .linkIcon{
            width: 50px;
            display: flex;
            justify-content: center;
            svg{
                font-size: 20px;
            }
        }
        &.active{
            border-radius: 10px;
            color: #006400;
            font-weight: 700;
            background: #38A80060; 
        }
    }
}

`;
export default SideBar
