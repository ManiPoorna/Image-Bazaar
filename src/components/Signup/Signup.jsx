/* eslint-disable no-unused-vars */
import "./style.css";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signUp, setSignUp] = useState(true);
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //funciton for signup
  function addUser(e) {
    e.preventDefault();
    setLoading(true);
    console.log(name, email, password, cPassword);
    if (name === "" || email === "" || password === "" || cPassword === "") {
      toast.error("All fields are required");

      return;
    }
    if (password !== cPassword) {
      toast.error("Password Not Matched");
      return;
    }
    //Firebase promise to create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        toast.success("SignUp Successful");
        navigate("/image-bazaar");
        setLoading(false);
        setEmail("");
        setPassword("");
        setCPassword("");
        setName("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  }


  //function for login
  function loginUser(e) {
    e.preventDefault();
    console.log("Login: ", email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login Successful");
        navigate("/image-bazaar");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  return (
    <div className={loading ? "loading" : ""}>
      {signUp ? (
        <div className="signup ">
          <form className="signup-form" onSubmit={(e) => addUser(e)}>
            <h2>
              <u>Image-Bazaar</u>
            </h2>
            <label htmlFor="name">Name: </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
            />
            <label htmlFor="email">Email: </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              id="email"
            />
            <label htmlFor="password">Password: </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
            />
            <label htmlFor="c-password">Confirm Password: </label>
            <input
              onChange={(e) => setCPassword(e.target.value)}
              value={cPassword}
              type="password"
              id="c-password"
            />
            <button type="submit">SignUp</button>
            <p
              onClick={() => setSignUp(false)}
              style={{
                margin: "auto",
                cursor: "pointer",
              }}>
              Have an account?{" "}
              <span>
                <u>Login</u>
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup">
          <form className="signup-form" onSubmit={(e) => loginUser(e)}>
            <h2>
              <u>Image-Bazaar</u>
            </h2>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p
              onClick={() => setSignUp(true)}
              style={{
                margin: "auto",
                cursor: "pointer",
              }}>
              Create a account?
              <span>
                <u>Signup</u>
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
