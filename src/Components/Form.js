import { useState } from "react";

const Form = ({ setShowForm, jobs, setJobs }) => {
  const [inputCompany, setInputCompany] = useState("");
  const [inputJob, setInputJob] = useState("");
  const [logo, setLogo] = useState("");

  const fetchLogo = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Referer: "https://example.com/searchIntegrationPage",
      },
    };

    fetch(`https://api.brandfetch.io/v2/search/${inputCompany}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response[0].icon))
      .catch((err) => console.error(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputCompany && inputJob) {
      //create new job obj with user input
      const newJob = {
        id: new Date().getTime().toString(36),
        image: logo,
        companyName: inputCompany,
        jobTitle: inputJob,
      };

      //update jobs
      setJobs([...jobs, newJob]);
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));

      //hide form on submit
      setShowForm(false);

      //make api call
      fetchLogo();
      console.log(logo);
    } else {
      alert("please enter all fields");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => setShowForm(false)}>
        Close
      </button>
      <label htmlFor="company">Company</label>
      <input
        type="text"
        id="company"
        value={inputCompany}
        onChange={(event) => setInputCompany(event.target.value)}
      />

      <label htmlFor="job-title">Job Title</label>
      <input
        type="text"
        id="job-title"
        value={inputJob}
        onChange={(event) => setInputJob(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
