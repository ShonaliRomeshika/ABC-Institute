import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class createProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program_id: "",
      name: "",
      duration: "",
      cost: "",
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
        program_id,
        name,
        duration,
        cost,
    } = this.state;

    const data = {
      program_id: program_id,
      name: name,
      duration: duration,
      cost: cost,
    };

    console.log(data);

    //validations
    const pid = /[Pp]\d{2}/;
    const num = /^\d+$/
    ;

    if (
      program_id === "" ||
      name === "" ||
      duration === "" ||
      cost === "" 
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } 
    else if ((!pid.test(String(program_id)))) {
        swal("Invalid Program ID", "Wrong Program ID Format, There should be P/p and only 2 digits, Ex: P05", "error");
    }
    else if ((!num.test(String(cost)))) {
        swal("Invalid Cost", "There should be only digits, Ex: 10000", "error");
    }
    else {
      swal({
        title: "Are you sure?",
        text: `Program ID: ${this.state.program_id} | Name: ${this.state.name} | 
        Duration: ${this.state.duration} | Cost: ${this.state.cost}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:8000/program/add", data).then((res) => {
            if (res.data.success) {
              this.setState({
                program_id: "",
                name: "",
                duration: "",
                cost: "",
              });
            }
          });
          swal("Program Added Successfully!", {
            icon: "success",
          });
        } else {
          swal("Program is not completed!");
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
          Add a Program
        </h1>
        <br></br>
        <form>
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
            <br></br>
            <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputEmail1"><b>Program Name:</b></label>
            <input
              type="text"
              class="form-control"
              name="name"
              aria-describedby="emailHelp"
              placeholder="Diploma in Psychology"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <div className="form-group">
            <div className="form-group">
              <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputPassword1">
                <b>Duration:</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="duration"
                placeholder="6 months"
                value={this.state.duration}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br></br>
            <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputEmail1"><b>Cost:</b></label>
            <input
              type="text"
              class="form-control"
              name="cost"
              aria-describedby="emailHelp"
              placeholder="Rs. 10000"
              value={this.state.cost}
              onChange={this.handleInputChange}
              required
            />
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
              Add
            </button>
          </div>
          </div>
        </form>
        <br></br>
      </div>
    );
  }
}