import React , { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TaskFilter from './components/TaskFilter';
import NewTaskForm from './components/NewTaskForm';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {

  // const [ tasks, setTasks ] = useState ([]);
  const [ tasks, setTasks ] = useState (() =>{
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [ filter, setFilter ] = useState('all');

  const apiBaseUrl = 'http://localhost:5092/api/task';

  //Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  }
  

  const toggleTaskStatus = async ( taskId) => {
    // const updatedTasks = tasks.map((task) =>
    //   task.id === taskId
    //     ? {...task, status : task.status === "pending" ? "completed" : "pending" }
    //     : task
    // );
    // setTasks(updatedTasks);

    const task = tasks.find((t) => t.id === taskId);
    try {
      await axios.put(`${apiBaseUrl}/${taskId}`, {
        ...task,
        IsCompleted: !task.IsCompleted,
      });

      setTasks(
        tasks.map((t) =>
          t.id === taskId ? {...t, isCompleted: !t.isCompleted} : t
        )
      );
    } catch (error) {
      console.error('Error updating task', error);
    }

  }

  const addTask = async (taskName) => {
    // const newTask = {
    //   id : uuidv4(),
    //   name : taskName,
    //   status : "pending",
    // };
    // setTasks([...tasks, newTask]);

    try {
      const response = await axios.post(apiBaseUrl, {
        name: taskName,
        isCompleted: false,
      });
      setTasks([...tasks, response.data]);
    } catch(error) {
      console.error('Error adding task: ', error)
    }
  }

  const deleteTask = async (taskId) => {
    // const updatedTasks = tasks.filter((task) => task.id !== taskId);
    // setTasks(updatedTasks);

    try {
      await axios.delete(`${apiBaseUrl}/${taskId}`);
      setTasks(tasks.filter((task)=> task.id !== taskId));
    } catch(error) {
      console.error('Error deleting task: ', error);
    }
  }

  const editTask = async ( taskId, newName ) => {
    // const updatedTasks = tasks.map((task) => 
    //   task.id === taskId ? {...task, name: newName } : task
    // );
    // setTasks(updatedTasks);
    const task = tasks.find((t) => t.id === taskId );
    if(!task) return;

    try {
      await axios.put(`${apiBaseUrl}/${taskId}`, {
        ...task,
        name: newName,
      });

      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, name:newName } : t
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  }

    // //Load tasks from Local storage when the app starts
  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  //   console.log("Retrieved tasks from localStorage:", storedTasks);
  //   if(storedTasks) {
  //     setTasks(storedTasks);
  //     // setTasks(JSON.parse(storedTasks));
  //   }
  // }, []);

  // //Save tasks to Local Storage whenever they change
  // useEffect(() => {
  //   console.log("Saving tasks to localStorage", tasks);
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks])

  useEffect(() => {
    fetchTasks();
  }, [])

  //Filter tasks
  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.isCompleted === (filter === 'completed')
  
  )
  // const filteredTasks = tasks.filter((task) => filter === 'all' ? true : task.status === filter );

  return (
    <div>
      <h1>To-Do List</h1>
      <NewTaskForm onAddTask = {addTask} />
      <TodoList tasks = { filteredTasks } 
        onToggleStatus = {toggleTaskStatus} 
        onDeleteTask = {deleteTask} 
        onEditTask={editTask} 
      />
      <TaskFilter filter = { filter } setFilter = { setFilter } />
    </div>
  );
}

export default App;
