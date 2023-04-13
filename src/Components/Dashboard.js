import Card from "./Card";

const DashBoard = ({ setShowForm, jobs, removeJob, setCategory }) => {
  const handleForm = (event) => {
    setCategory(event.target.id);
    setShowForm(true);
  };
  return (
    <div className="dashboard-container">
      <div className="column">
        <p>Wishlist</p>
        <button onClick={(event) => handleForm(event)} id="wishlist">
          Add job
        </button>

        {jobs.wishlist.map((job) => {
          return <Card job={job} key={job.id} removeJob={removeJob} />;
        })}
      </div>
      <div className="column">
        <p>Applied</p>
        <button onClick={(event) => handleForm(event)} id="applied">
          Add job
        </button>
        {jobs.applied.map((job) => {
          return <Card job={job} key={job.id} removeJob={removeJob} />;
        })}
      </div>
      <div className="column">
        <p>Interview</p>
        <button onClick={(event) => handleForm(event)} id="interview">
          Add job
        </button>
        {jobs.interview.map((job) => {
          return <Card job={job} key={job.id} removeJob={removeJob} />;
        })}
      </div>
    </div>
  );
};

export default DashBoard;
