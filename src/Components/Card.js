import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Card = ({ job, removeJob, handleOpenEditForm }) => {
  const { image, companyName, jobTitle, colour, timeAdded } = job;
  const [isShown, setIsShown] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime(time + 5);
    }, 3000);

    job.timeAdded = time;
  });

  return (
    <div
      className="card-container"
      style={{ background: colour }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      onClick={(event) => handleOpenEditForm(job, event)}
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

        <p className="created-at">{timeAdded} sec</p>
      </div>
    </div>
  );
};

export default Card;
