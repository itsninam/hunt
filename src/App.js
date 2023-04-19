import { useEffect, useState } from "react";
import "./App.scss";
import DashBoard from "./Components/Dashboard";
import Form from "./Components/Form";
import Loading from "./Components/Loading";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  //state for currently submitted card values
  const [cardValue, setCardValue] = useState({
    companyName: "",
    jobTitle: "",
    colour: "",
  });

  const [cardToEdit, setCardToEdit] = useState({});

  //local storage config
  useEffect(() => {
    setLoading(false);

    //configure local storage
    setJobs(() => {
      let jobs = localStorage.getItem("jobs");
      if (jobs) {
        return (jobs = JSON.parse(localStorage.getItem("jobs")));
      } else {
        return {
          wishlist: [],
          applied: [],
          interview: [],
        };
      }
    });
  }, []);

  //remove job
  const removeJob = (selectedJob) => {
    if (selectedJob.type === "wishlist") {
      const filteredJobs = jobs.wishlist.filter(
        (job) => job.id !== selectedJob.id
      );

      setJobs({ ...jobs, wishlist: [...filteredJobs] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({ ...jobs, wishlist: [...filteredJobs] })
      );
    } else if (selectedJob.type === "applied") {
      const filteredJobs = jobs.applied.filter(
        (job) => job.id !== selectedJob.id
      );

      setJobs({ ...jobs, applied: [...filteredJobs] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({ ...jobs, applied: [...filteredJobs] })
      );
    } else if (selectedJob.type === "interview") {
      const filteredJobs = jobs.interview.filter(
        (job) => job.id !== selectedJob.id
      );

      setJobs({ ...jobs, interview: [...filteredJobs] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({ ...jobs, interview: [...filteredJobs] })
      );
    }
  };

  //open edit form on card selection, and set current card values in input fields
  const handleOpenEditForm = (clickedCard) => {
    setCardToEdit(clickedCard);
    //obtain current values in card
    setCardValue({
      companyName: clickedCard.companyName,
      jobTitle: clickedCard.jobTitle,
      colour: clickedCard.colour,
    });

    //show form
    setShowForm(true);
    //create edit state
    setIsEdit(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wrapper">
      <DashBoard
        setShowForm={setShowForm}
        jobs={jobs}
        removeJob={removeJob}
        setCategory={setCategory}
        setIsEdit={setIsEdit}
        handleOpenEditForm={handleOpenEditForm}
      />

      {showForm && (
        <Form
          setShowForm={setShowForm}
          jobs={jobs}
          setJobs={setJobs}
          category={category}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          cardValue={cardValue}
          cardToEdit={cardToEdit}
        />
      )}
    </div>
  );
};

export default App;
