import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // useEffect(()=>{
    axios
      .post("http://localhost:8080/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken),
            setUser(data.data.user),
            navigate("/");
        }
      })
      .catch((err) => console.log(err.message));
    // },[])
  };
  return (
    <div className="shadow w-50 mx-auto p-5 mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          defaultValue={"eve.holt@reqres.in"}
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
