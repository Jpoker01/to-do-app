import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

function TaskList() {
  // Get tasks from Redux
  const dispatch = useDispatch();
  const taskList = useSelector((store) => store.taskList);

  useEffect(() => {
    // Get the tasks from the server to display in table
    dispatch({ type: "GET_TASKS" });
  }, [dispatch]);

  const formatDate = (date) => {
    return date ? moment().format("yyyy-MM-DD HH:mm") : "";
  };

  const displayStatusForTask = (task) => {
    if (task.status === "complete") {
      return "Completed";
    } else {
      const action = {
        type: "UPDATE_TASK",
        payload: {
          id: task._id,
          status: "complete",
        },
      };
      return (
        <Button variant="contained" onClick={() => dispatch(action)}>
          Mark As Complete
        </Button>
      );
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <b>Task</b>
          </TableCell>
          <TableCell>
            <b>Time Due</b>
          </TableCell>
          <TableCell>
            <b>Status</b>
          </TableCell>
          <TableCell>
            <b>Delete</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {taskList != null &&
          taskList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{formatDate(item.time_due)}</TableCell>
              <TableCell>{displayStatusForTask(item)}</TableCell>
              <TableCell>
                <IconButton
                  variant="contained"
                  alignItems="center"
                  size="large"
                  onClick={() => {
                    console.log(item.id);
                    dispatch({
                      type: "DELETE_TASK",
                      payload: { id: item._id },
                    });
                  }}
                >
                  <HighlightOffTwoToneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default TaskList;
