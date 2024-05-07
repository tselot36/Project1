import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import TodoItem from './TodoItem';
// import './TodoList.css';
const TodoList = () => {
    const [todos, setTodos] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/todos/${id}`);
            // Remove the deleted todo from the list
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            {/* Render Todo items */}
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default TodoList;
