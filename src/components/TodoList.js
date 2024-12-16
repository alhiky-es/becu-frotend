import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onToggleStatus, onDeleteTask, onEditTask }) => {
    return (
        <ul>
            {
                tasks.map((task) => (
                    <TodoItem 
                        key={task.id}
                        task={task} 
                        onToggleStatus = {onToggleStatus} 
                        onDeleteTask = {onDeleteTask} 
                        onEditTask = { onEditTask } 
                    />
                ))
            }
        </ul>
    )
}

export default TodoList;