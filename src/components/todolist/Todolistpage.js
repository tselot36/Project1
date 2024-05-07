import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';
import './TodoForm.js';
import './TodoItem.js';

const TodoListPage = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8380/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Check if token is retrieved

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.post('http://localhost:8380/todos/create', {
                title,
                description,
                category
            }, config); // Include config in the request

            fetchTodos(); // Fetch todos again after adding a new todo
            setTitle('');
            setDescription('');
            setCategory('');
            setError('');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server error:', error.response.data); // Log detailed server error response
                setError('Error adding todo. Please try again.'); // Display user-friendly error message
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Network error:', error.request); // Log network error
                setError('Network error. Please check your internet connection.'); // Display user-friendly error message
            } else {
                // Something else happened while setting up the request
                console.error('Error:', error.message); // Log other errors
                setError('An unexpected error occurred. Please try again later.'); // Display user-friendly error message
            }
        }
    };



    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8380/todos/${id}`);
            fetchTodos(); // Fetch todos again after deleting a todo
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <button type="submit">Add Todo</button>
                {error && <p className="error">{error}</p>}
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.description} - {todo.category}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoListPage;
