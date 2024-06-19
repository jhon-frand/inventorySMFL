import styled from "styled-components"
import logo from "../../assets/logogreentool.png"
import { AiOutlineLeft, AiOutlineHome } from "react-icons/ai"
import { GoTools } from "react-icons/go";
import { BsPinMap } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { CgToolbox } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom"
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { RiMenuFill } from "react-icons/ri";

function SideBar({ openSide, setOpenSide }) {

    const user = localStorage.getItem("user");

    const navigate = useNavigate();
    const closeSesion = () => {
        localStorage.clear();
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
                <RiMenuFill className="cerrarSideBar" />
            </button>
            <div className="logoContent">
                <img src={logo} alt="Logo Inventory" />

                <h2>INVENTORY</h2>
            </div>
            <div className="content-links">
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
            </div>
            <footer>
                <div className="content-footer">
                    <button onClick={closeSesion}><LuLogOut /><p>Cerrar Sesión</p></button>
                </div>
            </footer>
        </Container>
    )
}
//#region links
const linksArray = [
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/dashboard"
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
display: flex;
flex-direction: column;
justify-content: space-between;
//box-shadow: 0 0 5px 1px gray;

.content-footer{
    padding: 5px;
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
        background: #becccab3;
      }

      svg{
        font-size: 25px;
      }
    }

    p{
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    color: #23500d;
}
}

.sideBarButton{
    position: absolute;
    top: 0;
    right: -50px;
    width: 50px;
    height: 70px;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: white;

    .cerrarSideBar{
        font-size: 40px;
        color: #38a800;
        transition: 0.5s;
        border-radius: 10px;
        background-color: #38a80032;
        padding: 5px;
        transform: ${({ $isOpen }) => ($isOpen ? `` : `rotate(180deg)`)};
        
        &:hover{
            background-color: #38a800;
            color: white;
        }
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

    img{
        width: 60px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        transform: ${({ $isOpen }) => ($isOpen ? `scale(0.9)` : `scale(1.0)`)};
}
}



.linkContainer{

    .links{
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: black;
        padding: 15px;
        margin: 2px;

        &:hover{
            border-radius: 10px;
            color: white;
            background: #38a800c5;
           // width: ${({ $isOpen }) => ($isOpen ? "" : "250px")}; 
                
        
        }
        
        span{
            width: 150px;
        }
        .linkIcon{
            width: 50px;
            display: flex;
            justify-content: center;

            svg{
                font-size: 24px;
            }
        }
        &.active{
            border-radius: 10px;
            color: white;
            font-weight: 700;
            background: #38a800; 
        }
    }
}

`;
export default SideBar
