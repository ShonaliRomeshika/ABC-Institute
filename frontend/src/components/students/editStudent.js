import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

        
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/students/${id}`)
      .then((res) => {
        if (res.data.success) {
          setName(res.data.student.name);
          setAddress(res.data.student.address);
          setContact(res.data.student.contact);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    switch (name) {
      case "name":
        setName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "contact":
        setContact(value);
        break;
      default:
        break;
    }
  };
  

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      address: address,
      contact: contact,
    };


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
        text: `Student Name: ${name} |
            Address: ${address} | Contact: ${contact}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.put(`http://localhost:8000/students/update/${id}`, data)
            .then((res) => {
              if (res.data.success) {
                setName("");
                setAddress("");
                setContact("");
              }
            })
            .catch((err) => console.log(err));
          swal("Successfully Updated!", { icon: "success" });
        } else {
          swal("Updation is not completed!");
        }
      });
    }
  };

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
              Update - Student
            </h1>
      <br />
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
              value={name}
              onChange={handleInputChange}
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
                value={address}
                onChange={handleInputChange}
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
              value={contact}
              onChange={handleInputChange}
              required
            />
            <br></br>

      </div>

          
          <br></br>
          <div className="container" style={{ width: "170px" }}>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-primary"
              style={{
                width: "150px",
                fontSize: "large",
                backgroundColor: "MidnightBlue",
              }}
            >
              Update
            </button>
          </div>
          </div>
        </form>
      <br />
    </div>
  );
}


