import React from 'react';

const TaskKiller = ({ filter, setFilter }) => {
    return (
        <div>
            <button onClick = {() => setFilter('all')}>All</button>
            <button onClick = {() => setFilter('pending')}>Pending</button>
            <button onClick = {() => setFilter('completed')}>Completed</button>
        </div>
    )
}

export default TaskKiller;