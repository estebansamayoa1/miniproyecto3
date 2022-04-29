import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpenseTable';

class ExpenseTracker extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      name: '',
      transactionDate: new Date(Date.UTC),
      amount: '',
      editingIndex: -1,
      expenses: [],
    };
  }

  render() {
    const handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ ...this.state, [name]: value });
    };

    const handleSubmit = () => {
      if (
        this.state.type &&
        this.state.name &&
        this.state.transactionDate &&
        this.state.amount
      ) {
        const addRow = {
          type: this.state.type,
          name: this.state.name,
          transactionDate: this.state.transactionDate,
          amount: this.state.amount,
        };

        const expenses = [...this.state.expenses];
        if (this.state.editingIndex === -1) {
          expenses.push(addRow);
        } else {
          expenses[this.state.editingIndex] = addRow;
        }

        this.setState({
          type: '',
          name: '',
          transactionDate: new Date(Date.UTC),
          amount: '',
          editingIndex: -1,
          expenses: expenses,
        });
      }
    };

    const handleDelete = (index) => {
      const expenses = [...this.state.expenses];
      expenses.splice(index, 1);
      this.setState({ ...this.state, expenses: expenses });
    };

    const handleEdit = (index) => {
      const expense = this.state.expenses[index];

      this.setState({
        type: expense.type,
        name: expense.name,
        transactionDate: expense.transactionDate,
        amount: expense.amount,
        editingIndex: index,
        expenses: this.state.expenses,
      });
    };


    //console.log(`state->${JSON.stringify(this.state)}`)
    //console.log(`expenses->${this.state.expenses}`)
    return (
      <Container>
        <ExpenseForm
          type={this.state.type}
          name={this.state.name}
          transactionDate={this.state.transactionDate}
          amount={this.state.amount}
          editingIndex={this.state.editingIndex}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <ExpensesTable
          expenses={this.state.expenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Container>
    );
  }
}

export default ExpenseTracker;