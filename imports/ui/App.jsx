import React, { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TaskForm } from './TaskForm';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch(),
  );

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count(),
  );

  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">📝️ To Do List</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <TaskForm />

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={toggleHideCompleted}
          >
            {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
        </div>

        <ul className="mt-8">
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </ul>

        <div className="mt-8">
          <p className="text-gray-700">
            {pendingTasksCount
              ? `You have ${pendingTasksCount} tasks pending`
              : 'You have no pending tasks'}
          </p>
        </div>
      </div>
    </div>
  );
};
