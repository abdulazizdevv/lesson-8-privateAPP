import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    axios
      .post("http://localhost:8080/login", values)
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken),
            setUser(data.data.user),
            navigate("/");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required!!!"),
    password: Yup.string()
      .min(3, "must be longer 3 characters")
      .max(8, "must be last 8 characters")
      .required("Required!!!"),
  });

  return (
    <div className="shadow w-50 mx-auto p-5 mt-5">
      <h1 className="text-center">Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
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
