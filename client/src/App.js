import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async (todo) => {
    const response = await axios.post('http://localhost:5000/api/todos', { title: todo.title });
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id)); // Ensure it matches the backend's ID
  };

  const updateTodo = async (todo) => {
    const response = await axios.put(`http://localhost:5000/api/todos/${todo._id}`, todo);
    setTodos(todos.map((t) => (t._id === response.data._id ? response.data : t))); // Update the state with the updated todo
    setEditTodo(null); // Clear editTodo state after updating
  };

  const editExistingTodo = (todo) => {
    setEditTodo(todo);
  };

  return (
    <Container className="mt-5 container">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Todo CRUD App</h1>
          <TodoForm addTodo={addTodo} editTodo={editTodo} updateTodo={updateTodo} />
          <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editExistingTodo} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
