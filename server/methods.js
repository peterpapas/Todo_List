import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "/imports/api/TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("access-denied", "You cannot remove this task");
    }

    TasksCollection.remove(taskId);
  },

  "tasks.update"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("access-denied", "You cannot update this task");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});

Meteor.publish("tasks", function () {
  if (!this.userId) {
    return null;
  }

  return TasksCollection.find({
    userId: this.userId,
  });
});
