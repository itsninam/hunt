import { useEffect, useState } from "react";
import logoPlaceholder from "../assets/images/logo.png";
import axios from "axios";
import ColourChooser from "./ColourChooser";

const Form = ({ setShowForm, jobs, setJobs, category }) => {
  const [inputCompany, setInputCompany] = useState("");
  const [inputJob, setInputJob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [colour, setColour] = useState("");

  const createJob = (img) => {
    // Create new job obj with user input
    const newJob = {
      id: new Date().getTime().toString(36),
      //if logo is undefined, display default logo placeholder img
      image: img ? img : logoPlaceholder,
      companyName: inputCompany,
      jobTitle: inputJob,
      type: category,
      colour: colour,
    };

    // Update jobs based on category
    if (category === "wishlist") {
      setJobs({ ...jobs, wishlist: [...jobs.wishlist, newJob] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({
          ...jobs,
          wishlist: [...jobs.wishlist, newJob],
        })
      );
    } else if (category === "applied") {
      setJobs({ ...jobs, applied: [...jobs.applied, newJob] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({
          ...jobs,
          applied: [...jobs.applied, newJob],
        })
      );
    } else if (category === "interview") {
      setJobs({ ...jobs, interview: [...jobs.interview, newJob] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({
          ...jobs,
          interview: [...jobs.interview, newJob],
        })
      );
    }
  };

  //logo api call
  const fetchLogo = () => {
    axios({
      url: `https://api.brandfetch.io/v2/search/${inputCompany}`,
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        //optional chaining if user's search does not exist
        const logo = response.data[0]?.icon;

        createJob(logo);

        // Hide form
        setShowForm(false);
      })
      .catch((err) => {
        console.log(err.message);
        //set error message
        setErrorMessage("Something went wrong, please try again later");

        setShowForm(true);
      });
  };

  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputCompany && inputJob) {
      // Make api call
      fetchLogo();
    } else {
      alert("Please enter all fields");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-header">Add Job</h2>

        <div className="form-content">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            className="form-field"
            type="text"
            id="company"
            value={inputCompany}
            onChange={(event) => setInputCompany(event.target.value)}
          />

          <label htmlFor="job-title" className="form-label">
            Job Title
          </label>
          <input
            className="form-field"
            type="text"
            id="job-title"
            value={inputJob}
            onChange={(event) => setInputJob(event.target.value)}
          />

          <ColourChooser setColour={setColour} colour={colour} />

          <div className="button-container">
            <button type="button" onClick={() => setShowForm(false)}>
              Discard
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Form;
