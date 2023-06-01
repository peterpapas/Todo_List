import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";
import "./methods";

function insertTask({ text, createdAt = new Date() }) {
  TasksCollection.insert({ text, createdAt });
}

const insertTasks = () => {
  const tasks = [
    { text: "Buy groceries", createdAt: new Date() },
    { text: "Clean bedroom", createdAt: new Date() },
    { text: "Do laundry", createdAt: new Date() },
  ];

  tasks.forEach(insertTask);
};

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    insertTasks();
  }
});
