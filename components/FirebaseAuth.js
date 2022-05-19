// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button, Container, NavDropdown } from 'react-bootstrap';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID
};

firebase.initializeApp(firebaseConfig);

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      }
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}
function logout(){
  firebase.auth().signOut()
  localStorage.clear()
}

const FirebaseAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
        <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={firebase.auth()} />
    );
  }

  if (typeof window !== "undefined") {
    localStorage.setItem('token', firebase.auth().currentUser.email)
  }

  return (
    <NavDropdown title={firebase.auth().currentUser.displayName}>
      <NavDropdown.Item><a onClick={()=> logout()}>Logout</a></NavDropdown.Item>
    </NavDropdown>
  )

}

export default FirebaseAuth