import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: "",
      program_id: "",
      registerDate: new Date().toISOString().slice(0, 10),
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
        student_id,
        program_id,
        registerDate,
    } = this.state;

    const data = {
      student_id: student_id,
      program_id: program_id,
      registerDate: registerDate,
    };

    console.log(data);

    if (
      student_id === "" ||
      program_id === "" ||
      registerDate === "" 
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    }
    else {
      swal({
        title: "Are you sure?",
        text: `Student ID: ${this.state.student_id} | 
        Program ID: ${this.state.program_id} `,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:8000/registration/add", data).then((res) => {
            if (res.data.success) {
              this.setState({
                student_id: "",
                program_id: "",
                registerDate: "",
              });
            }
          });
          swal("Registration has Successfully Done!", {
            icon: "success",
          });
        } else {
          swal("Registration is not completed!");
        }
      });
    }
  };

  render() {
    return (
      <div className="container" style={{ width: "540px" }}>
        <h1
          className="text-center"
          style={{
            borderStyle: "solid",
            backgroundColor: "MidnightBlue",
            color: "white",
          }}
        >
          Register a Student to a Program
        </h1>
        <br></br>
        <form>
        <div className="form-group">
            <div className="form-group">
              
            <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputEmail1"><b>Student ID:</b></label>
            <input
              type="text"
              class="form-control"
              name="student_id"
              aria-describedby="emailHelp"
              placeholder="S0001"
              value={this.state.student_id}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <div className="form-group">
            <div className="form-group">
              <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputPassword1">
                <b>Program ID:</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="program_id"
                placeholder="P01"
                value={this.state.program_id}
                onChange={this.handleInputChange}
                required
              />
            </div>
            
            <br></br>

      </div>
    
          <br></br>
          <div className="container" style={{ width: "170px" }}>
            <button
              type="submit"
              onClick={this.onSubmit}
              className="btn btn-primary"
              style={{
                width: "150px",
                fontSize: "large",
                backgroundColor: "MidnightBlue",
              }}
            >
              Register
            </button>
          </div>
          </div>
        </form>
        <br></br>
      </div>
    );
  }
}