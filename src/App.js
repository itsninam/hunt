import { useEffect, useState } from "react";
import "./App.scss";
import Card from "./Components/Card";
import Form from "./Components/Form";
import Loading from "./Components/Loading";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    //configure local storage
    setJobs(() => {
      let jobs = localStorage.getItem("jobs");
      if (jobs) {
        return (jobs = JSON.parse(localStorage.getItem("jobs")));
      } else {
        return [];
      }
    });
  }, []);

  const removeJob = (id) => {
    const filteredJobs = jobs.filter((job) => job.id !== id);
    setJobs(filteredJobs);
    localStorage.setItem("jobs", JSON.stringify(filteredJobs));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <button onClick={() => setShowForm(true)}>Add job</button>
      {showForm && (
        <Form setShowForm={setShowForm} jobs={jobs} setJobs={setJobs} />
      )}
      {jobs.map((job) => {
        return <Card job={job} key={job.id} removeJob={removeJob} />;
      })}
    </div>
  );
};

export default App;
