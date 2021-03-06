import { Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_PROJECT_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

function ModalGoogleLogin() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentUser) {
      history.push("/dashboard");
    }
  }, [currentUser]);

  async function handleSignInWithGoogle(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          It's seems like you have already signed in with Google, try to sign in
          that way!
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={loading}
            className="w-100 mt-1 mb-1"
            onClick={handleSignInWithGoogle}
          >
            <img
              src="https://img.icons8.com/ios-filled/30/000000/google-logo.png"
              alt="google icon"
            />
            <span> Continue with Google</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const signInWithFacebook = () => {
  auth
    .signInWithPopup(facebookProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
     

      if (error.code === "auth/account-exists-with-different-credential") {
        console.log("modal");
        //{handleShow}
      } else {
        console.log(error.message);
      }
    });
};



export default app;
