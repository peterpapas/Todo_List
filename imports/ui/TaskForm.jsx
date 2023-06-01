import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";

console.log("TaskForm.jsx loaded");

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text, (error) => {
      if (error) {
        console.log(error);
      } else {
        setText("");
      }
    });
  };

  const handleDelete = (taskId) => {
    Meteor.call("tasks.remove", taskId, (error) => {
      if (error) {
        console.log(error);
      }
    });
  };

  const handleCheckboxToggle = (task) => {
    Meteor.call("tasks.update", task._id, !task.isChecked, (error) => {
      if (error) {
        console.log(error);
      }
    });
  };

  const tasks = useTracker(() => {
    Meteor.subscribe("tasks");

    return TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4 sm:mx-0">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="task-input"
          >
            New Task
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="task-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to add new tasks"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </form>
      <div className="mt-4">
        <h2 className="text-gray-700 font-bold">Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  checked={task.isChecked}
                  onChange={() => handleCheckboxToggle(task)}
                />
                <span className="ml-2">{task.text}</span>
              </label>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-4"
                onClick={() => handleDelete(task._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )};