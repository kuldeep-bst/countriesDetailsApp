import React from "react";
import { useParams } from "react-router-dom";

export default function Contact() {
  const temp = useParams();
  console.log(temp);
  return <h1>Contact us!</h1>;
}
