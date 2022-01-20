import React from 'react';
import {Card, CardHeader, CardContent, Typography,
    Box, Modal, Paper, TableRow, TableHead, 
    TableBody, Table, TableContainer} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DriversData from "./data/DriversData";





export default function DriversModal() {
  return(
    <Modal
    open={modalOpen}
    onClose={handleModalClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Box sx={style}>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="justify">Plate Number</StyledTableCell>
              <StyledTableCell align="justify">Model</StyledTableCell>
              <StyledTableCell align="justify">Date Added</StyledTableCell>
              <StyledTableCell align="justify">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DriversData.map((dri) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="justify" component="th" scope="row">
                  {row.plate}
                </StyledTableCell>
                <StyledTableCell align="justify">{row.model}</StyledTableCell>
                <StyledTableCell align="justify">{row.date}</StyledTableCell>
                <StyledTableCell align="justify">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Modal>
  );
}
