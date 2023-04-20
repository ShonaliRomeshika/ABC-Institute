import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";


export default class students extends Component {
  constructor(props) {
    super(props);

    this.state = {
        students: [],
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  retrieveStudents() {
    axios.get("http://localhost:8000/students").then((res) => {
      if (res.data.success) {
        this.setState({
            students: res.data.existingstudents,
        });
        console.log(this.state.students);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this student!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8000/student/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "Appointment is removed",
            "success"
          );

          this.retrievestudents();
        });
      } else {
        swal("Student is not deleted!");
      }
    });
  };

  filterData = (searchKey) => {
    const {students } = this.state;
    const result = students.filter((student) => {
      const {
        student_id,
        name
      } = student;
      return (
        name.toLowerCase().includes(searchKey) ||
        student_id.toLowerCase().includes(searchKey)
      );
    });
    this.setState({ students: result });
  };
  

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    this.filterData(searchKey);
  };


  render() {
    return (
      <div className="container">
        <center>
        <h1
          className="text-center"
          style={{
            borderStyle: "solid",
            backgroundColor: "MidnightBlue",
            color: "white",
            width: "500px",
          }}
        >
        Students
        </h1>
        </center>

        <br></br>
        <div className="col-md-5 mb-17">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </form>
        </div>
        <br></br><br></br><br></br>

        <button
          className="btn btn-primary btn-lg active"
          style={{ backgroundColor: "#c99212" }}
        >
          <a
            href="appointments/add"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "large",
            }}
          >
            Add Student
          </a>
        </button>

        <br></br><br></br><br></br>

        <table className="table table-striped" Id = "class-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact No.</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((students, index) => (
              <tr key={index}>
               
                <td>{students.student_id}</td>
                <td>{students.name}</td>
                <td>{students.address}</td>
                <td>{students.contact}</td>
                <a
                  className="btn btn-warning"
                  href={`students/update/${students._id}`}
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(students._id)}
                >
                  <i
                    className="far fa-trash-alt"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "medium",
                    }}
                  >
                    {" "}
                  </i>{" "}
                  &nbsp; Delete
                </a>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      
    );
    
  } 
}