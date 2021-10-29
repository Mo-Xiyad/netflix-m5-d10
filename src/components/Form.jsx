//  npm i formik yup

import React from "react";
import { useFormik } from "formik";

import * as yup from "yup";
import { Button, Container, Form, FormControl } from "react-bootstrap";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Too short").required("Password is required"),
});

function RegistrationForm(props) {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: validationSchema,
  });

  console.log({ touched });

  return (
    <Container>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          isInvalid={errors.email}
          placeholder="Enter email"
          value={values.email}
          name="email"
          onChange={handleChange}
        />
        <FormControl.Feedback type={errors.email ? "invalid" : "valid"}>
          {errors.email}
        </FormControl.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          isInvalid={errors.password}
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          name="password"
        />
        <FormControl.Feedback type={errors.password ? "invalid" : "valid"}>
          {errors.password}
        </FormControl.Feedback>
      </Form.Group>

      <Button variant="primary" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </Container>
  );
}

export default RegistrationForm;
//  npm i formik yup
