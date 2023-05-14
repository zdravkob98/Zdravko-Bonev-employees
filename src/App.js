import { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import { IconButton, Tooltip, Grid, Box } from "@mui/material";
import Uploader from "./components/Uploader";
import Table from "./components/Table";
import Header from "./components/Header";

function App() {
  const [pairOfEmployees, setPairOfEmployees] = useState([]);
  const columns = [
    { field: "employee1", headerName: "Employee ID #1", width: 180 },
    { field: "employee2", headerName: "Employee ID #2", width: 180 },
    { field: "project", headerName: "Project ID", width: 180 },
    { field: "daysWorked", headerName: "Days worked", width: 180 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }} className="background-color" margin={10}>
      <Grid container padding={3} flexDirection="column">
        <Header />
        <Uploader pair={(data) => setPairOfEmployees(data)} />
        <Grid marginBottom={10} color="orange">
          <p>
            The allowed Date formats are: "MM-DD-YYYY" "YYYY-MM-DD" "MM/DD/YYYY
          </p>
        </Grid>
        <Table pairOfEmployees={pairOfEmployees} columns={columns} />
        {pairOfEmployees.length !== 0 && (
          <Grid item container marginTop={10} justifyContent="center">
            <p>
              The employees with IDs{" "}
              <strong>{pairOfEmployees[0].employee1}</strong> and{" "}
              <strong>{pairOfEmployees[0].employee2}</strong> worked together on{" "}
              {pairOfEmployees.length === 1 ? "project" : "projects"} with IDs{" "}
              <strong>
                {pairOfEmployees.map((projects) => ` ${projects.project}, `)}
              </strong>
              for a total of{" "}
              <strong>
                {pairOfEmployees.reduce(
                  (acc, empl) => acc + empl.daysWorked,
                  0
                )}{" "}
                days
              </strong>
              .
            </p>
          </Grid>
        )}

        <Grid container justifyContent="flex-end">
          <Tooltip title="You can import only .CSV file.">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
