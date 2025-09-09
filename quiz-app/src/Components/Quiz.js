import React, { useEffect, useState } from "react";
import UseStateContext from "../hooks/UseStateContext";
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormattedTime } from "../helper";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [Qns, setQns] = useState([]);
  const [QnIndex, setQnIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [TimeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = UseStateContext();
  const [selectedoptionindex, setSelectedoptionindex] = useState(null);
  const navigate = useNavigate();
  const totalQuestions = Qns.length;
const progress = (answeredQuestions * 100) / totalQuestions;

  console.log("selectedoptionindex:", selectedoptionindex);

  // useEffect(() => {
  //   setContext({
  //     ParticipantId: 0,
  //     TimeTaken: 0,
  //     SelectedOptions: [],
  //   });
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);

    createAPIEndpoint(ENDPOINTS.questions)
      .fetch()
      .then((res) => {
        setQns(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => clearInterval(timer);
  }, []);

  const updateAnswer = (qnId, optionindex) => {
    console.log("Current question:", Qns[QnIndex]);
    console.log("updateAnswer called with:", qnId, optionindex);
    if (optionindex === null || optionindex === undefined) {
      console.warn(
        "Skipping updateAnswer because optionindex is null or undefined"
      );
      return;
    }
    setContext((prev) => {
      const updatedOptions = Array.isArray(prev.SelectedOptions)
        ? [...prev.SelectedOptions]
        : [];

      updatedOptions.push({
        qnId,
        selected: optionindex,
      });
      
      const updatedContext = {
        ...prev,
        SelectedOptions: updatedOptions,
        TimeTaken: QnIndex === 4 ? TimeTaken : prev.TimeTaken,
      };

      console.log("🚀 Updating context to:", updatedContext);
      return updatedContext;
    });
  };

  return Qns.length > 0 && QnIndex < Qns.length ? (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "50px" }}
    >
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <h5 className="card-title" style={{ textAlign: "left" }}>
            {"Question " + (QnIndex + 1) + " of 5"}
          </h5>
          <h6
            style={{
              textAlign: "right",
              marginTop: "-30px",
              marginBottom: "40px",
            }}
          >
            {getFormattedTime(TimeTaken)}
          </h6>
        
          {Qns[QnIndex].qnImage && (
            <img
              src={"http://localhost:5012/Images/mouse.jpeg"}
              alt="Question"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          )}

          <p className="card-text">{Qns[QnIndex].qnInWords}</p>
        </div>

        <ol style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
          {Qns[QnIndex].options.map((item, index) => (
            <li key={index} style={{ padding: "10px 15px", textAlign: "left" }}>
              <input
                type="radio"
                id={`option-${index}`}
                name="quiz-option"
                value={item}
                checked={selectedoptionindex === index}
                onChange={() => setSelectedoptionindex(index)}
                
              />
              <label htmlFor={`option-${index}`} style={{ margin: 0 }}>
                {item}
              </label>
            </li>
          ))}
        </ol>

        {QnIndex < 5 && (
          <button
            className="btn btn-primary"
            style={{ width: "100px", height: "40px", margin: "20px auto" }}
            disabled={selectedoptionindex === null}
            onClick={() => {
              if (selectedoptionindex === null) return;
              const isLastQuestion = QnIndex === 4;

              updateAnswer(Qns[QnIndex].qnId, selectedoptionindex);
              setSelectedoptionindex(null);

              if (isLastQuestion) {
                setTimeout(() => {
                  navigate("/result");
                }, 0);
              } else {
                setQnIndex((prev) => prev + 1);
              }
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
