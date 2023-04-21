import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";


export default class programs extends Component {
  constructor(props) {
    super(props);

    this.state = {
        programs: [],
        currentPage: 0,
        pageCount: 0,
      };
      
  }

  componentDidMount() {
    this.retrievePrograms();
  }

  retrievePrograms() {
    axios.get("http://localhost:8000/programs").then((res) => {
      if (res.data.success) {
        const programs = res.data.existingprograms;
        const pageCount = Math.ceil(programs.length / 5);
        this.setState({
          programs,
          pageCount,
        });
        console.log(programs);
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
  
          this.retrievePrograms(this.state.currentPage);
        });
      } else {
        swal("Program is not deleted!");
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

    const { programs, currentPage, pageCount } = this.state;
  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  const displayedPrograms = programs.slice(startIndex, endIndex);

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
        <br></br>

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

        <br></br><br></br>

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
          {displayedPrograms.map((program, index) => (
            <tr key={index}>
              <td>{program.program_id}</td>
              <td>{program.name}</td>
              <td>{program.duration}</td>
              <td>{program.cost}</td>
              <td>
                <a
                  className="btn btn-warning"
                  href={`program/update/${program._id}`}
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(program._id)}
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