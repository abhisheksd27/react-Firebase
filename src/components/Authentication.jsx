import React, { useState } from 'react';
import auth, { googleProvider } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Authentication = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch (createError) {
                    console.error('Error creating user:', createError);
                }
            } else {
                console.error('Error signing in:', error);
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleAuth}>Sign In / Sign Up</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Authentication;
