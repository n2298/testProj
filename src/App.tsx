import { TextField, Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Dropdown from "./Dropdown.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function Form() {
  return <h2>Home</h2>;
}

function Info() {
  const { id } = useParams(); // useParams hook to get the route parameter
  return <h2>This is a page for a product with ID: {id}</h2>;
}

function AppRouter() {
  const items = ["Option 1", "Option 2", "Option 3", "c"]; // Example dropdown items.
  const [dateOfBirth, setDateOfBirth] = useState(null); //state init. DoB
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <TextField
          id="first-name"
          label="First Name"
          variant="outlined"
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <TextField
          id="last-name"
          label="Last Name"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
  <Dropdown dropdownItem={items} style={{ flex: 1 }} />
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label="Date of Birth"
      value={dateOfBirth}
      onChange={(newValue) => setDateOfBirth(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          style={{ flex: 1 }}
        />
      )}
    />
  </LocalizationProvider>
</div>
        <div style={{ marginBottom: "10px" }}>
  <TextField
    id="address-line-1"
    label="Address Line 1"
    variant="outlined"
    fullWidth
    style={{ marginBottom: "10px" }}
  />
  <TextField
    id="address-line-2"
    label="Address Line 2"
    variant="outlined"
    fullWidth
  />
</div>
        <a href="/customer-info">
        <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
          Submit
        </Button>
        </a>
        <nav style={{ marginTop: "20px" }}>
          <Link to="/customer-form" style={{ marginRight: "10px" }}>
            Go to Form
          </Link>
          <Link to="/customer-info/123">Go to Info</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/customer-form" element={<Form />} />
          <Route path="/customer-info/:id" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;