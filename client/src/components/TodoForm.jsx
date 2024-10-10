import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import Add from '@mui/icons-material/Add';
import Save from '@mui/icons-material/Save';

function TodoForm({ addTodo, editTodo, updateTodo }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [editTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editTodo) {
        await updateTodo({ ...editTodo, title: input });
      } else {
        await addTodo({ title: input });
      }
      setInput(""); // Clear input after adding/updating
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Add a new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" className="bg-success" type="submit">
        {editTodo ? <Save /> : <Add />}
      </Button>
    </Form>
  );
}

export default TodoForm;
