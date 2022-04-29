import React, { Component } from 'react';
import { Table, Button, ButtonToolbar, InputGroup, FormControl, Form } from 'react-bootstrap';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = { 
      sortKey: '',
      searchKey: ''
   }; 
  }


  render() {
    const exp = this.props.expenses;
    if (this.state.sortKey !== '') {
      exp.sort((a, b) => {
        if (this.state.sortKey=='amount'){
          return a[this.state.sortKey] < b[this.state.sortKey] ? -1 : 1;
        }
        else{
          return a[this.state.sortKey] > b[this.state.sortKey] ? 1 : -1;
        } 
      });
    }

    const Search = (text) => {
      this.setState({ searchKey: text });
    };


    return (
      <React.Fragment>
      <Form className="justify-content-md-center mt-1">
        <Form.Control 
            placeholder="Search by expense name" 
            onChange={(e) => this.props.Search(e.target.value)}/>
      </Form>
      <Table striped bordered hover variant="dark" className="mt-5">
        <thead>
          <tr>
            <th>
              <Button
                variant="secondary"
                onClick={() => this.setState({ sortKey: 'type' })}
              >
                Type
              </Button>
            </th>
            <th>
              <Button
                variant="secondary"
                onClick={() => this.setState({ sortKey: 'name' })}
              >
                Name
              </Button>
            </th>
            <th>
              <Button
                variant="secondary"
                onClick={() => this.setState({ sortKey: 'date' })}
              >
                Date
              </Button>
            </th>
            <th>
              <Button
                variant="secondary"
                onClick={() => this.setState({ sortKey: 'amount' })}
              >
                Amount
              </Button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exp
          .filter((expense) => {
            if (!this.props.searchKey) return true;
            let name = expense.name.toLowerCase();
            return name.includes(this.props.searchKey.toLowerCase());
          })
          .map((expense, index) => (
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
                    onClick={(e) => this.props.handleDelete(index)}
                  >
                    X
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={(e) => this.props.handleEdit(index)}
                  >
                    Edit
                  </Button>{' '}
                  |{' '}
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </React.Fragment>
    );
  }
}

export default ExpenseForm;