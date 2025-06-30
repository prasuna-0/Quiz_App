import React, { useState } from "react";

export default function Answer({ qnAnswers }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getOptionClass = (qna, index) => {
    const answer = Number(qna.answer);
    const selected = Number(qna.selected);

    if (index === answer) return "text-success"; // green correct
    if (index === selected && selected !== answer) return "text-danger"; // red wrong
    return "text-light";
  };

  return (
    <div className="container my-5" style={{ maxWidth: "640px" }}>
      <div className="accordion" id="quizAccordion">
        {Array.isArray(qnAnswers) && qnAnswers.length > 0 ? (
          qnAnswers.map((item, index) => (
            <div className="accordion-item bg-dark text-white mb-2" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${
                    expandedIndex === index ? "" : "collapsed"
                  } bg-dark text-white`}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={expandedIndex === index}
                  aria-controls={`collapse${index}`}
                  style={{ borderColor: "#444" }}
                >
                  {item.qnInWords}
                  <span
                    className={`ms-auto ${
                      Number(item.selected) === Number(item.answer)
                        ? "text-success"
                        : "text-danger"
                    }`}
                    style={{ fontWeight: "bold" }}
                  >
                    {Number(item.selected) === Number(item.answer) ? "✓" : "✗"}
                  </span>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  expandedIndex === index ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#quizAccordion"
                style={{ backgroundColor: "#212529" }}
              >
                <div className="accordion-body">
                  {item.imageName && (
                    <img
                      src={
                        (process.env.REACT_APP_BASE_URL || "") +
                        "images/" +
                        item.imageName
                      }
                      alt="question"
                      className="d-block mx-auto mb-3"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                  <ul className="list-group">
                    {item.options.map((opt, i) => (
                      <li
                        key={i}
                        className={`list-group-item bg-dark  border border-info mb-1  ${getOptionClass(
                          item,
                          i
                        )}`}
                      >
                        <strong>{String.fromCharCode(65 + i)}. </strong>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted text-center">No answers available.</div>
        )}
      </div>
    </div>
  );
}



