import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class RegisterProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      contact: "",
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
        name,
        address,
        contact,
    } = this.state;

    const data = {
      name: name,
      address: address,
      contact: contact,
    };

    console.log(data);

    //validations
    const num = /^\d+$/
    ;

    if (
      name === "" ||
      address === "" ||
      contact === "" 
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    }
    else if ((!num.test(String(contact)))) {
        swal("Invalid Contact Number", "There should be only digits, Ex: 0761237877", "error");
    }
    else {
      swal({
        title: "Are you sure?",
        text: `Student Name: ${this.state.name} | 
        Address: ${this.state.address} | 
        Contact Number: ${this.state.contact}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:8000/students/add", data).then((res) => {
            if (res.data.success) {
              this.setState({
                student_id: "",
                name: "",
                address: "",
                contact: "",
              });
            }
          });
          swal("Student Added Successfully!", {
            icon: "success",
          });
        } else {
          swal("Student is not completed!");
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
          Add a Student
        </h1>
        <br></br>
        <form>
        <div className="form-group">
            <div className="form-group">
              
            <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputEmail1"><b>Student Name:</b></label>
            <input
              type="text"
              class="form-control"
              name="name"
              aria-describedby="emailHelp"
              placeholder="Anne Perera"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <div className="form-group">
            <div className="form-group">
              <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputPassword1">
                <b>Address:</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="23, Lotus Road, Colombo"
                value={this.state.address}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br></br>
            <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputEmail1"><b>Contact Number:</b></label>
            <input
              type="text"
              class="form-control"
              name="contact"
              aria-describedby="emailHelp"
              placeholder="0761728922"
              value={this.state.contact}
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


/*import React, { useState } from "react";
import axios from "axios";

function RegisterStudent() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [program_id, setProgramId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      name,
      address,
      contact,
      program_id: program_id,
    };

    try {
      const res = await axios.post("/students/add", newStudent);
      console.log(res.data);
      alert("Student registered successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to register student!");
    }
  };

  return (
    <div>
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="program_id">Program ID:</label>
          <input
            type="text"
            id="program_id"
            value={program_id}
            onChange={(e) => setProgramId(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterStudent;
*/