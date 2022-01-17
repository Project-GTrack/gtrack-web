import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DumpstersComponent from "../components/dumpsters/DumpstersComponent";
import AddNewDumpsterModal from "../components/dumpsters/modals/AddNewDumpsterModal";
import PageLayout from "./PageLayout";


const DumpstersPage = () => {
  var accounts;
  const [gender, setGender] = React.useState("Male");
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState("Drivers");
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleGender = (event) => {
    setGender(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };
  return (
    <PageLayout headerTitle={"Dumpsters"}>
      <Grid container spacing={3}>
        <Grid item padding={3}>
          <button
            className="btn btn-success position-absolute -mr-5"
            onClick={handleOpenModal}
          >
            Add New Dumpster
          </button>
          <AddNewDumpsterModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            gender={gender}
            handleGender={handleGender}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
           <DumpstersComponent/>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default DumpstersPage;
