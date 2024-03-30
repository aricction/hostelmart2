import React, { useEffect,useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, db, storage } from '../firebase';


export default function Register() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }
        else {

            const uref = auth.createUserWithEmailAndPassword(email, password)
            uref.then((credential) => {
                db.collection('users').doc(credential.user.uid).set({
                    FirstName: FirstName,
                    LastName: LastName,
                    Email: email
                }).then(() => {
                    setSuccessMsg('Registration Successful');
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setErrorMsg('');
                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);

                }).catch(err => setErrorMsg(err.message));
            })

        }


    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
               <a href="/home" aria-label="home" className="absolute top-1 left-2 p-4" >
      <svg
                        data-slot="icon"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-6 h-6" >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                    </svg>
      </a>
            <div className=" px-8 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6 card-body" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label>
                            <span className="block text-sm font-medium font-bold leading-6 text-gray-900">First name</span>
                        </label>
                        <div className="mt-2">
                            <input type="text" placeholder="Firstname" onChange={(e) => setFirstName(e.target.value)} value={FirstName}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">

                            </input>
                        </div>
                    </div>

                    <div className="form-control">
                        <label>
                            <span className="block text-sm font-medium font-bold leading-6 text-gray-900">Last name</span>
                        </label>
                        <div className="mt-2">
                            <input type="text" placeholder="lastname" onChange={(e) => setLastName(e.target.value)} value={LastName}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label>
                            <span className="block text-sm font-medium font-bold leading-6 text-gray-900">
                                Email</span>
                        </label>
                        <div className="mt-2">
                            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label>
                            <span className="block text-sm font-medium font-bold leading-6 text-gray-900">

                                Password
                            </span>
                        </label>
                        <div className="mt-2">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>

                    <div className="">
                        <label>
                            <span>
                                Confirm password
                            </span>
                        </label>
                        <div className="mt-2">
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="form-control">
                        <button type='submit'
                            className="flex w-full justify-center rounded-md bg-royal-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Register
                        </button>

                    </div>

                    <div className="py-6 flex justify-center">
                        <p className="mr-2"> Already have an account? </p>
                        <Link to='/login' className="text-royal-blue-500"> login here</Link>

                    </div>
                    {errorMsg && <div className="text-red-600">{errorMsg}</div>}
                    
                    {successMsg && <div className="text-green-600">{successMsg}</div>}
                </form>

            </div>
        </div>

    );
}