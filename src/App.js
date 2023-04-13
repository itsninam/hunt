import { useEffect, useState } from "react";
import "./App.scss";
import DashBoard from "./Components/Dashboard";
import Form from "./Components/Form";
import Loading from "./Components/Loading";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

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

  const removeJob = (id) => {
    console.log(id);
    if (category === "wishlist") {
      const filteredJobs = jobs.wishlist.filter((job) => job.id !== id);

      setJobs({ ...jobs, wishlist: [...filteredJobs] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({ ...jobs, wishlist: [...filteredJobs] })
      );
    } else if (category === "applied") {
      const filteredJobs = jobs.applied.filter((job) => job.id !== id);

      setJobs({ ...jobs, applied: [...filteredJobs] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({ ...jobs, applied: [...filteredJobs] })
      );
    } else if (category === "interview") {
      const filteredJobs = jobs.interview.filter((job) => job.id !== id);

      setJobs({ ...jobs, interview: [...filteredJobs] });
      localStorage.setItem(
        "jobs",
        JSON.stringify({ ...jobs, interview: [...filteredJobs] })
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <DashBoard
        setShowForm={setShowForm}
        jobs={jobs}
        removeJob={removeJob}
        setCategory={setCategory}
      />

      {showForm && (
        <Form
          setShowForm={setShowForm}
          jobs={jobs}
          setJobs={setJobs}
          category={category}
        />
      )}
    </div>
  );
};

export default App;
