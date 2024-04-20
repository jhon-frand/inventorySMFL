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

export const AlertConfirmation = (onConfirm, onCancel) => {
  Swal.fire({
    title: "¿Quieres cambiar el estado del usuario?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: "SÍ",
    cancelButtonText: "NO",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm(); // Función a ejecutar si se confirma la alerta
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel(); // Función a ejecutar si se cancela la alerta
    }
  });
};

