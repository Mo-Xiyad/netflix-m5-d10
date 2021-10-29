import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Col, Container, Row } from "react-bootstrap";

// Install formMilk
// npm i formik yup

const Registration = ({ setRegistrationForm, registrationForm }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    surname: yup.string().required("name is required"),
    email: yup.string().email("email invalid").required("name is required"),
    password: yup.string().min(8, "Too short").required("Password is required"),
    confirmPassword: yup
      .string()
      .required("password is required")
      .oneOf([yup.ref("password")], "Both password need to be the same"),
    // .when("password", {
    //   is: (val) => (val && val.length > 0 ? true : false),
    //   then: yup
    //     .string()
    //     .oneOf([yup.ref("password")], "Both password need to be the same"),
    // }),
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      setRegistrationForm(values);
    },
    validationSchema: validationSchema,
  });

  const formCkeck = () => {
    if (
      values.name.length > 2 &&
      values.surname.length > 2 &&
      values.email.length > 2 &&
      values.password.length > 7 &&
      values.confirmPassword.length > 7
    ) {
      return true;
    }
  };
  useEffect(() => {
    formCkeck();
  }, [
    values.name,
    values.surname,
    values.email,
    values.password,
    values.confirmPassword,
  ]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-6">
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Surname </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname "
                value={values.surname}
                onChange={handleChange}
                name="surname"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                isInvalid={errors.password}
              />
              <FormControl.Feedback
                type={errors.password ? "invalid" : "valid"}
              >
                {errors.password}
              </FormControl.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="Confirm password"
                value={values.confirmPassword}
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                isInvalid={errors.confirmPassword}
              />

              <FormControl.Feedback
                type={errors.confirmPassword ? "invalid" : "valid"}
              >
                {errors.confirmPassword}
              </FormControl.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={!formCkeck()}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
