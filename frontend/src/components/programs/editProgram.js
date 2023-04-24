import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function EditProgram() {
  const { id } = useParams();
  const navigate = useNavigate();

        
          const [name, setName] = useState("");
          const [duration, setDuration] = useState("");
          const [cost, setCost] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/program/${id}`)
      .then((res) => {
        if (res.data.success) {
          setName(res.data.program.name);
          setDuration(res.data.program.duration);
          setCost(res.data.program.cost);
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
      case "duration":
        setDuration(value);
        break;
      case "cost":
        setCost(value);
        break;
      default:
        break;
    }
  };
  

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      duration: duration,
      cost: cost,
    };


  //validations
  const num = /^\d+$/
  ;

  if (
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
  else if ((!num.test(String(cost)))) {
      swal("Invalid Cost", "There should be only digits, Ex: 10000", "error");
  }

     else {
      swal({
        title: "Are you sure?",
        text: `Program Name: ${name} |
            Duration: ${duration} | Cost: ${cost}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.put(`http://localhost:8000/program/update/${id}`, data)
            .then((res) => {
              if (res.data.success) {
                setName("");
                setDuration("");
                setCost("");
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
              Update - Program
            </h1>
      <br />
      <form>
        <div className="form-group">
            <div className="form-group">
            
            <label style={{ marginBottom: '5px',fontSize:'19px' }} for="exampleInputEmail1"><b>Program Name:</b></label>
            <input
              type="text"
              class="form-control"
              name="name"
              aria-describedby="emailHelp"
              placeholder="Diploma in Psychology"
              value={name}
              onChange={handleInputChange}
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
                value={duration}
                onChange={handleInputChange}
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
              value={cost}
              onChange={handleInputChange}
              required
            />
            <br></br>

      </div>
       </div>

        <br />
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
      </form>
      <br />
    </div>
  );
}


