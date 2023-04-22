import { useState } from "react";
import logoPlaceholder from "../assets/images/logo.png";
import axios from "axios";
import ColourChooser from "./ColourChooser";

const Form = ({
  setShowForm,
  jobs,
  setJobs,
  category,
  isEdit,
  setIsEdit,
  cardValue,
  cardToEdit,
  setCardToEdit,
}) => {
  //if edit card is opened, display current card values, otherwise display nothing
  const [inputCompany, setInputCompany] = useState(
    isEdit ? cardValue.companyName : ""
  );
  const [inputJob, setInputJob] = useState(isEdit ? cardValue.jobTitle : "");
  const [colour, setColour] = useState(isEdit ? cardValue.colour : "");
  const [errorMessage, setErrorMessage] = useState("");

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

  //edit card functionality
  const editedCard = (img) => {
    // Update jobs based on category
    if (cardToEdit.type === "wishlist") {
      const editedCard = jobs.wishlist.find((job) => {
        return job.id === cardToEdit.id;
      });
      editedCard.companyName = inputCompany;
      editedCard.jobTitle = inputJob;
      editedCard.colour = colour;
      editedCard.image = img;
      //update card
      setJobs({ ...jobs, wishlist: [...jobs.wishlist] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({
          ...jobs,
          wishlist: [...jobs.wishlist],
        })
      );
    }
    if (cardToEdit.type === "applied") {
      const editedCard = jobs.applied.find((job) => {
        return job.id === cardToEdit.id;
      });
      editedCard.companyName = inputCompany;
      editedCard.jobTitle = inputJob;
      editedCard.colour = colour;
      editedCard.image = img;
      //update card
      setJobs({ ...jobs, applied: [...jobs.applied] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({
          ...jobs,
          applied: [...jobs.applied],
        })
      );
    }
    if (cardToEdit.type === "interview") {
      const editedCard = jobs.interview.find((job) => {
        return job.id === cardToEdit.id;
      });
      editedCard.companyName = inputCompany;
      editedCard.jobTitle = inputJob;
      editedCard.colour = colour;
      editedCard.image = img;
      //update card
      setJobs({ ...jobs, interview: [...jobs.interview] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({
          ...jobs,
          interview: [...jobs.interview],
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

        //call functions with logo from api
        if (isEdit) {
          editedCard(logo);
        } else {
          createJob(logo);
        }

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

  //edit card
  const handleEdit = (event) => {
    event.preventDefault();
    setIsEdit(false);

    if (inputCompany && inputJob) {
      // Make api call
      fetchLogo();
    } else {
      alert("Please enter all fields");
    }

    //clear card to edit
    setCardToEdit({});
  };

  //form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEdit(false);

    if (inputCompany && inputJob) {
      // Make api call
      fetchLogo();
    } else {
      alert("Please enter all fields");
    }
  };

  //close form if user clicks anywhere outside the form
  window.addEventListener("click", (event) => {
    if (event.target.matches(".form-container")) {
      setShowForm(false);
    }
  });

  return (
    <div className="form-container">
      <form onSubmit={isEdit ? handleEdit : handleSubmit} className="form">
        <h2 className="form-header">Add Job</h2>

        <div className="form-content">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            autoFocus
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

          <ColourChooser
            setColour={setColour}
            colour={colour}
            handleSubmit={handleSubmit}
          />

          <div className="button-container">
            <button type="button" onClick={() => setShowForm(false)}>
              Discard
            </button>
            {isEdit ? (
              <button type="submit">Save</button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </div>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Form;
