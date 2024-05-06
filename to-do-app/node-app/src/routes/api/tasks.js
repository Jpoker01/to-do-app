const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const mongo_connection = require("../../../config/database");

const taskModel = require("../../models/task_schema");
const router = express.Router();

router.use(cors());

router.get("/", (req, res) => {
  taskModel
    .find({})
    .then((tasksFound) => {
      res.json(tasksFound);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  const taskId = req.params.id;

  taskModel
    .findById(taskId)
    .then((taskFound) => {
      if (!taskFound) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(taskFound);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  const { title, time_due } = req.body;

  if (!title || !time_due) {
    res.status(400).json({ msg: "Title / Due time due should be provided!" });
  }

  const newTask = new taskModel({
    title: title,
    time_due: time_due,
    status: "in_progress",
  });

  newTask
    .save()
    .then((savedTask) => {
      res
        .location(
          `${req.protocol}://${req.get("host")}${req.originalUrl}/${
            savedTask._id
          }`
        )
        .json(savedTask);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.put("/:id", (req, res) => {
  const taskId = req.params.id;

  if (taskId !== req.body.id) {
    return res.status(400).json({ msg: "Ids are not the same" });
  }

  taskModel
    .findById(taskId)
    .then((task) => {
      if (!task) {
        return res
          .status(404)
          .json({ msg: `A task with id=${taskId} was not found` });
      }

      // Update task data
      task.title = req.body.title || task.title;
      task.time_due = req.body.time_due || task.time_due;
      task.status = req.body.status || task.status;

      // Save updated task
      task
        .save()
        .then((updatedTask) => {
          res.json({ msg: "The task was updated", updatedTask });
        })
        .catch((error) => {
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  taskModel
    .findByIdAndDelete(taskId)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res
          .status(404)
          .json({ msg: `A task with id=${taskId} was not found` });
      }
      res.status(200).json({ msg: "The task was deleted", deletedTask });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
