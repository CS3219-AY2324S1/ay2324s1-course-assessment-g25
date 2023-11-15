"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('')

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email !== '' && name !== '' && password !== '' && password2 !== '') {
            if (password !== password2) {
                setError('Passwords must match.')
            } else {
                try {
                    await axios.post('http://localhost:8080/api/v1/users', { name, email, password, password2 })

                    // push to sign_in page if no errors 
                    router.push('../sign_in')
                } catch (err) {
                    setError(err.response.data.Error)
                } 
            }

        } else {
            console.log("fill in all fields")
            setError('Please fill in all fields!')
        }
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Password2:', password2);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-300;">
            <div className="max-w-md px-6 py-8 bg-green-50 shadow-md rounded-lg;">
                <h1 className="text-2xl mb-6 text-center font-semibold">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4;">
                        <label className="block text-sm font-medium text-gray-700;">Name:</label>
                        <input
                            type="name"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4;">
                        <label className="block text-sm font-medium text-gray-700;">Email:</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4;">
                        <label className="block text-sm font-medium text-gray-700;">Password:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4;">
                        <label className="block text-sm font-medium text-gray-700;">Confirm Password:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className='text-sm text-red-500'>* {error}</div>}
                    <div className="m-10;">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 font-semibold hover:bg-blue-600;"
                            onClick={handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                    <div className="m-10;">
                        <Link href="/sign_in"
                            className="w-full font-semibold focus:translate-x-1;" >
                            Existing user? Sign in here.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
