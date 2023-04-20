import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";


export default class programs extends Component {
  constructor(props) {
    super(props);

    this.state = {
        programs: [],
    };
  }

  componentDidMount() {
    this.retrievePrograms();
  }

  retrievePrograms() {
    axios.get("http://localhost:8000/programs").then((res) => {
      if (res.data.success) {
        this.setState({
            programs: res.data.existingprograms,
        });
        console.log(this.state.programs);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this program!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8000/program/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "Program is removed",
            "success"
          );

          this.retrieveprograms();
        });
      } else {
        swal("Program is not deleted!");
      }
    });
  };

  filterData = (searchKey) => {
    const {programs } = this.state;
    const result = programs.filter((program) => {
      const {
        program_id,
        name
      } = program;
      return (
        name.toLowerCase().includes(searchKey) ||
        program_id.toLowerCase().includes(searchKey)
      );
    });
    this.setState({ programs: result });
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
        Programs
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
            href="program/add"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "large",
            }}
          >
            Add Program
          </a>
        </button>

        <br></br><br></br><br></br>

        <table className="table table-striped" Id = "class-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Program ID</th>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.programs.map((programs, index) => (
              <tr key={index}>
               
                <td>{programs.program_id}</td>
                <td>{programs.name}</td>
                <td>{programs.duration}</td>
                <td>{programs.cost}</td>
                <a
                  className="btn btn-warning"
                  href={`program/update/${programs._id}`} //program._id-------------------
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(programs._id)}
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