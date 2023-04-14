import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Card = ({ job, removeJob }) => {
  const { image, companyName, jobTitle } = job;
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <img className="company-logo" src={image} alt="job logo" />
      <div className="card-info">
        <p className="company-name">{companyName}</p>
        <p className="job-title">{jobTitle}</p>
      </div>
      <div className="right-card-items">
        {isShown && (
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => removeJob(job)}
            className="icon"
          />
        )}

        <p className="created-at">1sec</p>
      </div>
    </div>
  );
};

export default Card;
