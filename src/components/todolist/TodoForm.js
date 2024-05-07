import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8380/todos', {
                title,
                description,
                category
            });
            console.log(response.data); // Handle successful todo creation
            onAdd(response.data); // Callback to add the new todo to the UI
            setTitle('');
            setDescription('');
            setCategory('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for title, description, category */}
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
