import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";


export default class students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      currentPage: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  retrieveStudents() {
    axios.get("http://localhost:8000/students").then((res) => {
      if (res.data.success) {
        const students = res.data.existingstudents;
        const pageCount = Math.ceil(students.length / 5);
        this.setState({
          students,
          pageCount,
        });
        console.log(students);
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
        axios.delete(`http://localhost:8000/students/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "Student is removed",
            "success"
          );

          this.retrieveStudents(this.state.currentPage);
        });
      } else {
        swal("Student is not deleted!");
      }
    });
  };

  handlePageClick = (data) => {
    const { selected } = data;
    this.setState({
      currentPage: selected,
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

    const { students, currentPage, pageCount } = this.state;
  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  const displayedStudents = students.slice(startIndex, endIndex);

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
            href="students/add"
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
          {displayedStudents.map((students, index) => (
              <tr key={index}>
               
                <td>{students.student_id}</td>
                <td>{students.name}</td>
                <td>{students.address}</td>
                <td>{students.contact}</td>
                <td>
                <a
                  className="btn btn-warning"
                  href={`student/update/${students._id}`}
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
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={this.handlePageClick}
containerClassName={"pagination"}
activeClassName={"active"}
previousClassName={"page-link"}
nextClassName={"page-link"}
disabledClassName={"disabled"}
pageClassName={"page-item"}
pageLinkClassName={"page-link"}
breakClassName={"page-item"}
breakLinkClassName={"page-link"}
marginPagesDisplayed={2}
pageRangeDisplayed={5}
/>
        
      </div>
      
    );
    
  } 
}
