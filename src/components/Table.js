import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

const Table = (props) => {
  const { pairOfEmployees, columns } = props;

  return (
    <Grid item container justifyContent="center">
      <Grid maxWidth={750} minWidth={50}>
        <DataGrid autoHeight rows={pairOfEmployees} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default Table;
