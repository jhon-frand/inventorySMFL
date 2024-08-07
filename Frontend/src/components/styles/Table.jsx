import styled from "styled-components"

export const ContainerTable = styled.div`

.table-data, .table-data-category{
  border-radius: 20px;

  th{
    background-color: #38a800;
    color: white;
    padding: 5px;
  }

}

.table-data-category{
  width: 50%;
}
`;

export const options = {
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20],
    tableBodyHeight: "70vh",
  };

export const optionsMedium = {
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20],
    tableBodyHeight: "300px",
  };
export const optionsTableModal = {
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20],
    tableBodyHeight: "50vh",
  };

export const optionsTableUnit = {
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    tableBodyHeight: "300px",
    downloadOptions: {
      useResponsive: true,
      excludeCSV: true,  // Excluir CSV
      excludeXLS: true,  // Excluir XLS
      excludePdf: true,  // Excluir PDF
      excludeSvg: true,  // Excluir SVG
    },
    print: false,  // Deshabilitar la opción de impresión
    viewColumns: false,  // Deshabilitar la opción de mostrar/ocultar columnas
    download: false,  // Deshabilitar la opción de descargar
  };
