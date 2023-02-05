import axios from "axios";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

export const Register = () => {
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const firsNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/register", {
        first_name: firsNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        if (data.status === 201) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="shadow w-50 mx-auto p-5 mt-5">
      <h1 className="text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={firsNameRef}
          className="form-control my-3"
          type="text"
          placeholder="First name"
        />
        <input
          ref={lastNameRef}
          className="form-control my-3"
          type="text"
          placeholder="Last name"
        />
        <input
          ref={emailRef}
          className="form-control my-3"
          type="email"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          className="form-control my-3"
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-primary" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};
