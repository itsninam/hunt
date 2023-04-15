import { useState } from "react";

const ColourChooser = ({ setColour, colour }) => {
  const [showColourDisplay, setShowColourDisplay] = useState(false);

  return (
    <div className="colour-chooser">
      <h3>Colour</h3>
      <div
        className="colour-display"
        style={{ background: colour }}
        onClick={() => setShowColourDisplay(!showColourDisplay)}
      ></div>
      {showColourDisplay && (
        <div className="colour-options">
          <input
            type="radio"
            id="red"
            name="color-chooser"
            value="#ee6055"
            className="red"
            onChange={(event) => setColour(event.target.value)}
            onClick={() => setShowColourDisplay(false)}
          />
          <label htmlFor="red" className="sr-only">
            Red
          </label>

          <input
            type="radio"
            id="orange"
            name="color-chooser"
            value="#e76f51"
            className="orange"
            onChange={(event) => setColour(event.target.value)}
            onClick={() => setShowColourDisplay(false)}
          />
          <label htmlFor="orange" className="sr-only">
            Orange
          </label>

          <input
            type="radio"
            id="pink"
            name="color-chooser"
            value="#ff6392"
            className="pink"
            onChange={(event) => setColour(event.target.value)}
            onClick={() => setShowColourDisplay(false)}
          />
          <label htmlFor="pink" className="sr-only">
            Pink
          </label>

          <input
            type="radio"
            id="purple"
            name="color-chooser"
            value="#7161ef"
            className="purple"
            onChange={(event) => setColour(event.target.value)}
            onClick={() => setShowColourDisplay(false)}
          />
          <label htmlFor="purple" className="sr-only">
            Purple
          </label>
          <input
            type="radio"
            id="yellow"
            name="color-chooser"
            value="#fcbf49"
            className="yellow"
            onChange={(event) => setColour(event.target.value)}
            onClick={() => setShowColourDisplay(false)}
          />
          <label htmlFor="yellow" className="sr-only">
            Yellow
          </label>
        </div>
      )}
    </div>
  );
};

export default ColourChooser;
