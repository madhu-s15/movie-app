import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkSignInValidation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [toggleSignIn, setToggleSignIn] = useState(true);
  const [validationMessage, setValidationMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInLink = () => {
    setToggleSignIn(!toggleSignIn);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setValidationMessage(
      checkSignInValidation(email.current.value, password.current.value)
    );
    console.log("Validation", validationMessage);
    if (validationMessage !== null) return;
    if (!toggleSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
              // Profile updated!
              // ...
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });

          const user = userCredential.user;
          console.log("First User", user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log("SIGNED IN USER", user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div id="login">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/IN-en-20250224-TRIFECTA-perspective_3a9c67b5-1d1d-49be-8499-d179f6389935_large.jpg"
          alt=""
        />
      </div>
      <form className="absolute mx-auto my-36 right-0 left-0 w-3/12 p-12 bg-black text-white opacity-80">
        <h1 className="font-bold text-2xl pb-4">
          {toggleSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!toggleSignIn && (
          <input
            type="text"
            ref={name}
            className="p-2 m-2 w-full bg-gray-700 rounded-sm"
            placeholder="Name"
          ></input>
        )}
        <input
          type="text"
          ref={email}
          className="p-2 m-2 w-full bg-gray-700 rounded-sm"
          placeholder="Email or mobile number"
        ></input>
        <input
          type="password"
          ref={password}
          className="p-2 m-2 w-full bg-gray-700 rounded-sm"
          placeholder="Password"
        ></input>
        <p className="p-2 m-2 text-red-700">{validationMessage}</p>
        <button
          className="bg-red-700 p-2 m-2 w-full rounded-md"
          onClick={(e) => handleSignIn(e)}
        >
          {toggleSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="p-2">
          {toggleSignIn ? "New to Netflicks?" : "Already registered?"}{" "}
          <b
            className="cursor-pointer underline-offset-0"
            onClick={toggleSignInLink}
          >
            {toggleSignIn ? "Sign up now" : "Sign In"}
          </b>
        </p>
      </form>
    </div>
  );
};

export default Login;
