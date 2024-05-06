import { useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

//Define styles for different components
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  task: {
    width: "50ch",
  },
}));

function TaskForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Empty tasks
  const defaultTask = {
    title: "",
    time_due: new Date().toISOString(),
  };

  const [task, setTask] = useState(defaultTask);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    // console.log('Setting due date to:', moment.format('MM-DD-YYYY'))
    setSelectedDate(date);
    setTask({ ...task, time_due: date.toISOString() });
  };

  const handleSubmit = (event) => {
    // Avoid page refresh on form submission
    event.preventDefault();

    // console.log('Form submit for new task ', task);
    // Add the new task
    dispatch({ type: "ADD_TASK", payload: task });

    // Clear form input fields
    setTask(defaultTask);
    setSelectedDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
      <TextField
        required
        className={classes.task}
        label="Title"
        value={task.title}
        onChange={(event) => setTask({ ...task, title: event.target.value })}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          required
          variant="inline"
          format="yyyy-MM-DD HH:mm"
          margin="normal"
          id="time_due"
          label="Time Due"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{ "aria-label": "change due date" }}
        />
      </MuiPickersUtilsProvider>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
}

export default TaskForm;
