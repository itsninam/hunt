const Card = ({ job }) => {
  const { logo, companyName, jobTitle } = job;
  return (
    <div className="card-container">
      <img
        className="company-logo"
        src="https://asset.brandfetch.io/search/icon/idCvQYuc_q/idWtd343FE/1668988800000"
        alt="job logo"
      />
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
