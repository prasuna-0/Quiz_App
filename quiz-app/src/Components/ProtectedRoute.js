// Components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import UseStateContext from "../hooks/UseStateContext";

export default function ProtectedRoute({ children }) {
  const { context } = UseStateContext();

  if (!context?.ParticipantId) {
    return <Navigate to="/" replace />;
  }

  return children;
}
