

   import React from 'react';
   import { TasksCollection } from '/imports/api/TasksCollection';

   export const Task = ({ task }) => {
     const deleteTask = () => TasksCollection.remove(task._id);

     const toggleChecked = () =>
       TasksCollection.update(task._id, {
         $set: {
           isChecked: !task.isChecked,
         },
       });

     return (
       <li>
         <input
           type="checkbox"
           checked={!!task.isChecked}
           onClick={toggleChecked}
           readOnly
         />
         <span>{task.text}</span>
         <button onClick={deleteTask}>&times;</button>
       </li>
     );
   };
