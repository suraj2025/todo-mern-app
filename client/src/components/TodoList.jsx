import React from "react";
import { Card, Button, ListGroup } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoList({ todos, deleteTodo, editTodo }) {
  return (
    <Card className="border border-info border-1 rounded">
      <Card.Body>
        {todos.length > 0 ? (
          <ListGroup>
            {todos.map((todo) => (
              <ListGroup.Item key={todo._id} className="border border-info-subtle border-1 rounded d-flex justify-content-between align-items-center mb-4">
                <span>{todo.title}</span>
                <div>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editTodo(todo)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No Todos yet!</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default TodoList;
