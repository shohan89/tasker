import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "Study the React library and build a sample project.",
    tags: ["React", "Web", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddTaskModal, setAddTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  function handleAddTask(newTask, isAdd) {
    // console.log('Task Adding...', newTask);
    // setTasks([...tasks, newTask]);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setAddTaskModal(false);
  }
  function handleEditTask(task) {
    console.log("Task Editing...", task);
    setTaskToEdit(task);
    setAddTaskModal(true);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddTaskModal && (
        <AddTaskModal onSave={handleAddTask} taskToEdit={taskToEdit} />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* task action */}
          <TaskActions onAddClick={() => setAddTaskModal(true)} />
          <TaskList tasks={tasks} onEdit={handleEditTask} />
        </div>
      </div>
    </section>
  );
}
