import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signInWithFacebook, signInWithGoogle } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("/dashboard");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  async function handleSignInWithFacebook(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithFacebook();
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

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
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
            <Button
              className="w-100 mt-1 mb-1"
              onClick={handleSignInWithGoogle}
            >
              <img
                src="https://img.icons8.com/ios-filled/30/000000/google-logo.png"
                alt="google icon"
              />
              <span> Continue with Google</span>
            </Button>
            <Button className="w-100" onClick={handleSignInWithFacebook}>
              <img
                src="https://img.icons8.com/ios-filled/30/icon/FeFKy6pAkhxv/facebook"
                alt="facebook icon"
              />
              <span> Continue with Facebook</span>
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password"> Forgot Password </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>{" "}
      </div>
    </div>
  );
}
