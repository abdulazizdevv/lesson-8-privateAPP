import axios from "axios";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    axios
      .post("http://localhost:8080/register", values)
      .then((data) => {
        if (data.status === 201) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required!!!"),
    last_name: Yup.string().required("Required!!!"),
    email: Yup.string().email("Invalid email format").required("Required!!!"),
    password: Yup.string()
      .min(3, "must be longer 3 characters")
      .max(8, "must be last 8 characters")
      .required("Required!!!"),
  });

  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const firsNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="shadow w-50 mx-auto p-5 mt-5">
      <h1 className="text-center">Register</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="first_name">First name</label>
            <Field
              id="first_name"
              name="first_name"
              className="form-control"
              type="text"
              placeholder="First name"
            />
            <ErrorMessage
              name="first_name"
              component={"span"}
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name">Last name</label>
            <Field
              id="last_name"
              name="last_name"
              className="form-control "
              type="text"
              placeholder="Last name"
            />
            <ErrorMessage
              name="last_name"
              component={"span"}
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              className="form-control"
              type="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component={"span"}
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password </label>
            <Field
              id="password"
              name="password"
              className="form-control "
              type="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component={"span"}
              className="text-danger"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            SEND
          </button>
        </Form>
      </Formik>
    </div>
  );
};
