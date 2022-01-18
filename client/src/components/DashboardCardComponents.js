import React from 'react'
import {Card, CardHeader, CardContent, Typography,
        Box, Modal, Paper, TableRow, TableHead, 
        TableBody, Table, TableContainer} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(plate, model, date, status) {
  return { plate,model,date, status };
}

const rows = [
  createData('AZM1234','XFCE 4010','10/11/2020', 'Active'),
  createData('MYX4567', 'XFCE 4010','10/11/2020', 'Active'),
  createData('ABC2904', 'XFCE 4010', '10/11/2021', 'Active'),
  createData('BST3203', 'XFCE 4010', '10/11/2021', 'Active'),
  createData('LGP2012', 'XFCE 4010', '10/11/2021', 'Active'),
];
export default function DashboardCardComponents({dashcard}) {
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
    return (
        <div>
        <Card elevation={1}>
        <CardHeader
          title={dashcard.title}
          
        />
        <CardContent>
          <Typography onClick={handleModalOpen}  variant="h5" color="textSecondary">
            {dashcard.count}
            {dashcard.icon}
          </Typography>
        </CardContent>
      </Card>
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
                {rows.map((row) => (
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
        </div>
    )
}
