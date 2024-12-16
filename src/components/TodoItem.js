import React, { useState } from 'react';

const TodoItem = ({ task, onToggleStatus, onDeleteTask, onEditTask }) => {
    const [ isEditing, setIsEditing ] = useState( false );
    const [ editedName, setEditedName ] = useState( task.name ) ;

    //Save the edited name and exit edit mode
    const handleSave = () => {
        if ( editedName.trim() !== '') {
            onEditTask(task.id, editedName);
            setIsEditing(false);
        }
    }

    //Handle key evenets in the input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if ( e.key === 'Escape') {
            setEditedName( task.name );
            setIsEditing(false);
        }
    }
    return (
        <li style={{ display: 'flex', alignItems: 'center' }}>
            {/* Checkbox for toggling the task status */}
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggleStatus(task.id)}
                style={{ marginRight: '10px' }} // Adds spacing between checkbox and task name
            />
            
            {isEditing ? (
                <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)} // Update the edited name
                onBlur={handleSave} // Save when input loses focus
                onKeyDown={handleKeyDown} // Handle Enter/Escape
                style={{ flex: 1 }}
                />
            ) : (
                <span
                className={task.isCompleted ? 'completed' : ''}
                onDoubleClick={() => setIsEditing(true)} // Enable edit mode on double-click
                style={{ flex: 1, cursor: 'pointer' }}
                >
                {task.name}
                </span>
            )}
            
            <button onClick={() => onDeleteTask(task.id)} style={{ marginLeft: '10px' }}>
                Delete
            </button>
        </li>
    )
}

export default TodoItem;