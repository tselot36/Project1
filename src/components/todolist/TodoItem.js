import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8380/todos/${todo.id}`);
            onDelete(todo.id); // Callback to remove the deleted todo from the UI
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="todo-item">
            {/* Display todo information */}
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
