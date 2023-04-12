const Card = ({ job }) => {
  const { image, companyName, jobTitle } = job;

  return (
    <div className="card-container">
      <img className="company-logo" src={image} alt="job logo" />
      <div className="card-info">
        <p className="company-name">{companyName}</p>
        <p className="job-title">{jobTitle}</p>
        <div className="created-at">
          <p>1sec</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
