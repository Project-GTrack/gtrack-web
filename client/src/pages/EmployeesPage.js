import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DriversComponent from "../components/employees/DriversComponent";
import AdminsComponent from "../components/employees/AdminsComponent";
import InactiveAccountsComponent from "../components/employees/InactiveAccountsComponent";
import AddNewEmployeeModal from "../components/employees/modals/AddNewEmployeeModal";
import PageLayout from "./PageLayout";

const pages = ["Drivers", "Admins", "Inactive Accounts"];

const EmployeesPage = () => {
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
  if (anchorElNav === "Drivers") {
    accounts = <DriversComponent />;
  } else if (anchorElNav === "Admins") {
    accounts = <AdminsComponent />;
  } else {
    accounts = <InactiveAccountsComponent />;
  }
  return (
    <PageLayout headerTitle={"Employees"}>
      <Grid container spacing={3}>
        <Grid item padding={3}>
          <button
            className="btn btn-success position-absolute -mr-5"
            onClick={handleOpenModal}
          >
            Add New Employee
          </button>
          <AddNewEmployeeModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            gender={gender}
            handleGender={handleGender}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginTop: -3,
              }}
            >
              {pages.map((page) =>
                anchorElNav === page ? (
                  <Button
                    key={page}
                    onClick={() => setAnchorElNav(page)}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      borderBottom: 3,
                      borderRadius: 0,
                      borderBottomColor: "black",
                    }}
                  >
                    {page}
                  </Button>
                ) : (
                  <Button
                    key={page}
                    onClick={() => setAnchorElNav(page)}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    {page}
                  </Button>
                )
              )}
            </Box>
            {accounts}
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default EmployeesPage;
