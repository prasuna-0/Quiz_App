import React, { useEffect, useState } from "react";
import UseStateContext from "../hooks/UseStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormattedTime } from "../helper";
import { useNavigate } from "react-router-dom";
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = UseStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    console.log("context.SelectedOptions:", context.SelectedOptions);
    const ids = context.SelectedOptions?.map((x) => x.qnId) || [];
    console.log("Sending ids:", ids);
    createAPIEndpoint(ENDPOINTS.getanswers)
      .post(ids)
      .then((res) => {
        const qna = context.SelectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId == x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      TimeTaken: 0,
      SelectedOptions: [],
    });
    navigate("/quiz");
  };

  const submitScore = () => {
    const cleanedId = context.ParticipantId.trim();

    const payload = {
      ParticipantId: cleanedId,
      TimeTaken: context.TimeTaken,
      Score: score,
    };

    console.log("Route ID:", cleanedId);
    console.log("Body ID:", payload.ParticipantId);

    createAPIEndpoint(ENDPOINTS.participants)
      .put(cleanedId, payload)
      .then((res) => { setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000);})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
  <div className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
    <div className="card text-bg-dark mb-3" style={{ maxWidth: "480px" }}>
      <div className="row g-0">
        <div className="col-md-8">
          <div
            className="card-body d-flex flex-column"
            style={{ minHeight: "300px" }}
          >
            <h5 className="card-title">Congratulations!</h5>
            <h4 className="card-text">Your Score</h4>
            <p className="card-text">{score}/5</p>
            <p>Took {getFormattedTime(context.TimeTaken) + " mins"}</p>

            <button
              type="button"
              className="btn btn-success my-3 mx-3"
              onClick={submitScore}
            >
              Submit
            </button>
            <button type="button" className="btn btn-light" onClick={restart}>
              Retry
            </button>

            <div style={{ flexGrow: 1 }}></div>

            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
              style={{
                width: "180px",
                fontSize: "0.9rem",
                padding: "0.3rem 0.5rem",
                visibility: showAlert ? "visible" : "hidden",
                marginBottom: 0,
              }}
            >
              <i
                className="bi bi-check-circle-fill me-2"
                style={{ fontSize: "1.2rem" }}
              ></i>
              <div>Score submitted!</div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <img
            src="trophy.png"
            className="img-fluid rounded-end h-100"
            alt="Trophy"
          />
        </div>
      </div>
    </div>
  </div>
  <Answer qnAnswers={qnAnswers}/>
  </>
);
}