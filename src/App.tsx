import { TextField, Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Dropdown from "./Dropdown.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function Form() {
  return <h2>Home</h2>;
}

function Info() {
  // const { id } = useParams(); // useParams hook to get the route parameter
  return <h2>This page is for displaying customer information. Stay tuned</h2>;
}

function AppRouter() {

  // replace Link to with useNavigate() for validation
  const navigate = useNavigate();

  // init form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    dateOfBirth: null,
  });

  // error state
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    address1: false,
    dateOfBirth: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value.trim() === "", // If empty, keep error; else, clear it
    }));
  };

    

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dateOfBirth: newValue });
    setErrors({ ...errors, dateOfBirth: newValue === null});
  };

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      address1: formData.address1.trim() === "",
      dateOfBirth: formData.dateOfBirth === null,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/customer-info");
    }
  };

  const [dateOfBirth, setDateOfBirth] = useState(null); //state init. DoB

  return (
    // <Router>
      <div style={{ padding: "20px" }}>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          helperText={errors.firstName ? "First Name is required" : ""}
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          helperText={errors.lastName ? "Last Name is required" : ""}
          style={{ marginBottom: "10px" }}
        />
        <br />
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <Dropdown/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
              // onChange={(newValue) => setDateOfBirth(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={errors.dateOfBirth}
                  helperTExt={errors.dateOfBirth ? "Date of Birth is required" : ""}
                  style={{ flex: 1 }}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <TextField
            id="address1"
            label="Address Line 1"
            variant="outlined"
            fullWidth
            value={formData.address1}
            onChange={handleInputChange}
            error={errors.address1}
            helperText={errors.address1 ? "Address Line 1 is required" : ""}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="address2"
            label="Address Line 2"
            variant="outlined"
            fullWidth
            value={formData.address2}
            onChange={handleInputChange}
          />
        </div>

        {/* <Link to="/customer-info">
          <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
            Submit
          </Button>
        </Link> */}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{marginTop: "10px"}}
        >
          Submit
        </Button>

        
        <nav style={{ marginTop: "20px" }}>
          <Link to="/customer-form" style={{ marginRight: "10px" }}>
            Go to Form
          </Link>
          <Link to="/customer-info">Go to Info</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/customer-form" element={<Form />} />
          <Route path="/customer-info" element={<Info />} />
        </Routes>
      </div>
    // </Router>
  );
}

// export default AppRouter;

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppRouter />} />
      </Routes>
    </Router>
  )
}

// todo
//  refactor form submission
// replace href with useNavigate() or <Link to>
// Add form Validation (blanks, etc)