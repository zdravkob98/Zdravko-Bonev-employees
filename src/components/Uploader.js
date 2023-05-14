import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Grid, Button } from "@mui/material";

const Uploader = (props) => {
  const { pair } = props;
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const result = findLongestWorkPeriod(text);
      pair(result);
    };
    reader.readAsText(file);
  };

  function getDate(employee) {
    const dateFromFirstEmployee = new Date(employee[2]);
    const dateToFirstEmployee =
      employee[3] !== "NULL\r" &&
      employee[3] !== "NULL" &&
      employee[3] !== "null\r" &&
      employee[3] !== "null"
        ? new Date(employee[3])
        : new Date();
    console.log(dateFromFirstEmployee);
    console.log(dateToFirstEmployee);

    return {
      dateFrom: dateFromFirstEmployee,
      dateTo: dateToFirstEmployee,
    };
  }

  function compareDays(employee, secondEmployee) {
    const fistEmplDate = getDate(employee);
    const dateFromFirstEmployee = fistEmplDate.dateFrom;
    const dateToFirstEmployee = fistEmplDate.dateTo;

    const secondEmplDate = getDate(secondEmployee);
    const dateFromSecondEmployee = secondEmplDate.dateFrom;
    const dateToSecondEmployee = secondEmplDate.dateTo;

    if (
      dateFromFirstEmployee <= dateToSecondEmployee &&
      dateFromSecondEmployee <= dateToFirstEmployee
    ) {
      const overlapDays = Math.floor(
        (Math.min(dateToFirstEmployee, dateToSecondEmployee) -
          Math.max(dateFromFirstEmployee, dateFromSecondEmployee)) /
          (1000 * 60 * 60 * 24)
      );

      return {
        id: employee[1] + overlapDays,
        employee1: employee[0],
        employee2: secondEmployee[0],
        project: employee[1],
        daysWorked: overlapDays,
      };
    }
  }

  function findLongestWorkPeriod(text) {
    const data = text
      .trim()
      .split("\n")
      .slice(1)
      .map((row) => row.split(","));
    let longestPeriod = 0;
    let result = [];

    data.map((employee) => {
      let longestPeriodPerPair = 0;
      let resultPerPair = [];

      const secondEmployee = data.filter(
        (empl) => employee[0] !== empl[0] && employee[1] === empl[1]
      );
      if (secondEmployee.length !== 0) {
        const workedDays = compareDays(employee, secondEmployee[0]);
        if (workedDays !== undefined) {
          longestPeriodPerPair = workedDays.daysWorked;
          resultPerPair.push(workedDays);
        }

        const firstEmployeeProjects = data.filter(
          (empl) => employee[0] === empl[0] && employee[1] !== empl[1]
        );

        if (firstEmployeeProjects.length !== 0) {
          const secondEmployeeProjects = data.filter(
            (empl) =>
              secondEmployee[0][0] === empl[0] && secondEmployee[1] !== empl[1]
          );

          firstEmployeeProjects.map((firstEmployeeProject) => {
            for (let i = 0; i < secondEmployeeProjects.length; i++) {
              if (firstEmployeeProject[1] === secondEmployeeProjects[i][1]) {
                const workedDays = compareDays(
                  firstEmployeeProject,
                  secondEmployeeProjects[i]
                );
                longestPeriodPerPair += workedDays.daysWorked;
                resultPerPair.push(workedDays);
              }
            }
          });
        }
      }
      if (longestPeriod < longestPeriodPerPair) {
        longestPeriod = longestPeriodPerPair;
        result.length = 0;
        result = resultPerPair;
      }
    });
    return result;
  }

  return (
    <Grid item container justifyContent="flex-start" marginTop={5}>
      <label htmlFor="file-upload">
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          hidden
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          sx={{
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#ccc",
            },
          }}
          component="span"
        >
          Upload CSV
        </Button>
      </label>
    </Grid>
  );
};

export default Uploader;
