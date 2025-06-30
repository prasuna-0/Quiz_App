import React from "react";
import useForm from "../hooks/useForms";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import UseStateContext from "../hooks/UseStateContext";
import { useNavigate } from "react-router-dom";

const getFreshModelObject = () => ({
  Email: "",
  Password: "",
});

export default function LogIn() {
  const navigate = useNavigate();
  const { context, setContext, resetContext } = UseStateContext();
  const [redirect, setRedirect] = useState(false);

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModelObject);

  // useEffect(() => {
  //   resetContext();
  // }, []);

  const validate = () => {
    let temp = {};
    temp.Email = /\S+@\S+\.\S+/.test(values.Email) ? "" : "Email is not valid.";
    temp.Password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        values.Password
      )
        ? ""
        : "Password must be at least 8 characters, include letters, numbers, and a special character.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participants)
        .post(values)
        .then((res) => {
          console.log("Full login API response:", res.data);
          const newcontext={ ParticipantId: res.data.participantId,
            TimeTaken: 0,
           SelectedOptions: [],
           };
          console.log(newcontext);
          setContext(newcontext);
          
          setRedirect(true);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.errors) {
            console.error("Validation errors:", err.response.data.errors);
          } else {
            console.error("Error:", err.message);
          }
        });
    }
  };
  useEffect(() => {
    if (redirect) {
      navigate("/quiz");
    }
  }, [redirect, navigate]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="card p-4" style={{ width: "24rem" }}>
          <h1 className="text-center mb-4">Quiz App</h1>
          <div className="card-body">
            <form onSubmit={login}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="Email"
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                  id="email"
                  value={values.Email}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
                {errors.Email && (
                  <div className="invalid-feedback">{errors.Email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="Password"
                  className={`form-control ${
                    errors.Password ? "is-invalid" : ""
                  }`}
                  id="password"
                  value={values.Password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                {errors.Password && (
                  <div className="invalid-feedback">{errors.Password}</div>
                )}
              </div>

              <button
                type="submit"
                name="button"
                className="btn btn-primary w-100"
              >
                Start
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
