import Swal from "sweetalert2"

export const AlertSucces = (title) => { 
      Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
    };
    
export const AlertError = () => { 
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Datos no válidos",
        showConfirmButton: false,
        timer: 1500
      })
    };
export const AlertUser = () => { 
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Usuario no autorizado",
        showConfirmButton: false,
        timer: 1500
      })
    };

