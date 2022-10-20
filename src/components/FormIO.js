import React from 'react'
import { FormBuilder } from "react-formio";

export default function FormIO() {
//   const formBuilder = document.getElementById("form-builder");
  return (
    <div>
        <FormBuilder form={{ display: "form" }}
        onChange={schema => console.log(JSON.stringify(schema))} />

    </div>
  )
}
