import { Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signInWithGoogle } from "../firebase";

export default function ModalGoogleLogin() {
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
