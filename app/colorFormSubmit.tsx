"use client";
import {useFormStatus} from "react-dom";

export const ColorFormSubmit = () => {
  const {pending} = useFormStatus();

  return <button disabled={pending}>
    {pending ? "Submitting..." : "Add color"}
  </button>;
}