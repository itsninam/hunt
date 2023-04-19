import Card from "./Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DashBoard = ({
  setShowForm,
  jobs,
  removeJob,
  setCategory,
  setIsEdit,
  handleOpenEditForm,
}) => {
  const handleForm = (event) => {
    setCategory(event.target.id);
    setShowForm(true);
    setIsEdit(false);
  };
  return (
    <div className="dashboard-container">
      <div className="column">
        <h2 className="column-header">Wishlist</h2>
        <button
          onClick={(event) => handleForm(event)}
          id="wishlist"
          className="add-job-btn"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {jobs.wishlist.map((job) => {
          return (
            <Card
              job={job}
              key={job.id}
              removeJob={removeJob}
              handleOpenEditForm={handleOpenEditForm}
            />
          );
        })}
      </div>
      <div className="column">
        <h2 className="column-header">Applied</h2>
        <button
          onClick={(event) => handleForm(event)}
          id="applied"
          className="add-job-btn"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {jobs.applied.map((job) => {
          return (
            <Card
              job={job}
              key={job.id}
              removeJob={removeJob}
              handleOpenEditForm={handleOpenEditForm}
            />
          );
        })}
      </div>
      <div className="column">
        <h2 className="column-header">Interview</h2>
        <button
          onClick={(event) => handleForm(event)}
          id="interview"
          className="add-job-btn"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {jobs.interview.map((job) => {
          return (
            <Card
              job={job}
              key={job.id}
              removeJob={removeJob}
              handleOpenEditForm={handleOpenEditForm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
