import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";


export default class registrationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        registrations: [],
        currentPage: 0,
        pageCount: 0,
      };
      
  }

  componentDidMount() {
    this.retrieveRegistrations();
  }

  retrieveRegistrations() {
    axios.get("http://localhost:8000/registrations").then((res) => {
      if (res.data.success) {
        const registrations = res.data.existingregistrations;
        const pageCount = Math.ceil(registrations.length / 5);
        this.setState({
          registrations,
          pageCount,
        });
        console.log(registrations);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this registration!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8000/registration/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "registration is removed",
            "success"
          );
  
          this.retrieveRegistrations(this.state.currentPage);
        });
      } else {
        swal("registration is not deleted!");
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
    const {registrations } = this.state;
    const result = registrations.filter((registration) => {
      const {
        program_id,
        student_id
      } = registration;
      return (
        student_id.toLowerCase().includes(searchKey) ||
        program_id.toLowerCase().includes(searchKey)
      );
    });
    this.setState({ registrations: result });
  };
  

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    this.filterData(searchKey);
  };


  render() {

  const { registrations, currentPage, pageCount } = this.state;
  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  const displayedRegistrations = registrations.slice(startIndex, endIndex);

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
        Registrations List
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
            href="students/register"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "large",
            }}
          >
            Register students to Programs
          </a>
        </button>

        <br></br><br></br>

        <table className="table table-striped" Id = "class-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Program ID</th>
              <th scope="col">Register Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {displayedRegistrations.map((registration, index) => (
            <tr key={index}>
              <td>{registration.student_id}</td>
              <td>{registration.program_id}</td>
              <td>{registration.registerDate}</td>
              <td>
                <a
                  className="btn btn-warning"
                  href={`registration/update/${registration._id}`}
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(registration._id)}
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