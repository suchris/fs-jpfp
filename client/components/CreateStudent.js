import React, { Component } from "react";
import { connect } from "react-redux";
import { createStudent } from "../redux/actions";

class CreateStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      imageUrl: undefined,
      gpa: undefined,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const newState = { ...this.state };
    newState[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const reg = /^[^\s@]+@[^\s@]+$/;

    // validate email
    if (reg.test(this.state.email)) {
      const { history, createStudent } = this.props;
      createStudent(this.state, history);
    } else {
      window.alert("Please enter a valid email");
    }
  }

  render() {
    const { firstName, lastName, email } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>First Name </label>
          <input type="text" name="firstName" onChange={this.onChange} />
          <label>Last Name </label>
          <input type="text" name="lastName" onChange={this.onChange} />
          <label>Email </label>
          <input type="text" name="email" onChange={this.onChange} />
          <button disabled={!firstName || !lastName || !email}>Create</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createStudent: (student, history) =>
      dispatch(createStudent(student, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateStudent);
