import React from "react";
import "./loader.css";

export default function Loader({ title }) {
  return (
    <button className="btn btn-primary" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">{title}...</span>
    </button>
  );
}
