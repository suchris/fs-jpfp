import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../redux/actions";

class StudentList extends Component {
  render() {
    const { students, history, deleteStudent } = this.props;

    if (!students) {
      return <h3>Loading...</h3>;
    }

    return (
      <div>
        <h3>List of Students</h3>
        <Link to="/students/create">Add New Student</Link>
        <hr></hr>
        <div className="students">
          {students.map((student) => {
            return (
              <div key={student.id}>
                <img src={student.imageUrl} />
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
                <button onClick={() => deleteStudent(student, history)}>
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (student, history) =>
      dispatch(deleteStudent(student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);