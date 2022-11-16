import React from "react";
import "./card.css";
import { useSelector } from "react-redux";

export default function Card({ title, children }) {
  const themeDefault = useSelector((state) => state.theme.themeDefault);
  return (
    <div
      className={`card ${themeDefault === true ? "" : "text-white bg-dark"}`}
    >
      <h5 className="card-header">{title}</h5>
      <div className="card-body">{children}</div>
    </div>
  );
}
