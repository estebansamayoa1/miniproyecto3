import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ExpenseTracker from "./ExpenseTracker";

import { Row, Col, Form, Table, Button, Container, ButtonToolbar } from 'react-bootstrap';



function TitleText(){
  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <h1 className="display-3">Expense Tracker</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-1">
        <Col md="auto">
          <h2 className="text-danger">Add A New Item:</h2>
        </Col>
      </Row>
    </Container>
  );  
}


function ExpensesTable({expenses, handleDelete}) {
  return (
    <Table striped bordered hover variant="dark" className="mt-5">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.type}</td>
            <td>{expense.name}</td>
            <td>{expense.transactionDate}</td>
            <td>
              <span>$</span>
              {expense.amount}
            </td>
            <td>
              <ButtonToolbar>
                <Button
                  variant="outline-light"
                  onClick={e => handleDelete(index)}
                >
                  X
                </Button>
              </ButtonToolbar>
            </td>
            <td>
            <ButtonToolbar>
                <Button
                  variant="outline-light"
                >
                  Edit
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
          ))}

      </tbody>
    </Table>
  );
}



function App() {
  return (
    <Container>
      <TitleText />
      <ExpenseTracker />
    </Container>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
