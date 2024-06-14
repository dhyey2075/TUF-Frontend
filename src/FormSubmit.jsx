import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {

    const [formData, setFormData] = useState({
        username: '',
        preferredLanguage: '',
        stdin: '',
        sourceCode: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await fetch('https://tufbackend-jk4j67jeg-dhyey2075s-projects.vercel.app/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        console.log(formData);
        if(res.status === 200){
            toast.success('Your code submitted successfully.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }
        else{
            toast.error('Something went wrong. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }
        setFormData({
            username: '',
            preferredLanguage: '',
            stdin: '',
            sourceCode: ''
        })
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Code Submission Form</h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required="true"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <FaAngleDown className='relative top-9 z-10 left-80 ml-10' />
                        <div>
                            <label htmlFor="preferredLanguage" className="sr-only">Preferred Code Language</label>
                            <select
                                id="preferredLanguage"
                                name="preferredLanguage"
                                autoComplete="preferredLanguage"
                                required="true"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
                                value={formData.preferredLanguage}
                                onChange={handleChange}
                            >
                                <option value=""><p>Select...</p></option>
                                <option value="C++">C++</option>
                                <option value="Java">Java</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                            </select>
                            
                        </div>
                        <div>
                            <label htmlFor="stdin" className="sr-only">Standard Input (stdin)</label>
                            <textarea
                                id="stdin"
                                name="stdin"
                                autoComplete="stdin"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
                                placeholder="Standard Input (stdin if required, otherwise leave it blank.)"
                                value={formData.stdin}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                        <div>
                            <label htmlFor="sourceCode" className="sr-only">Source Code</label>
                            <textarea
                                id="sourceCode"
                                name="sourceCode"
                                required="true"
                                autoComplete="sourceCode"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-3"
                                placeholder="Source Code"
                                value={formData.sourceCode}
                                onChange={handleChange}
                                rows="8"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600  ${isSubmitting ? "bg-slate-600":""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* Heroicon name: solid/lock-closed */}
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 10c0-3.866 3.134-7 7-7s7 3.134 7 7v2h1a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6a1 1 0 011-1h1v-2zM3 10c0 4.97 4.03 9 9 9s9-4.03 9-9v-2H3v2z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <p className='text-2xl' >{isSubmitting ? "submitting":"Submit"}</p>
                        </button>
                    </div>
                </form>
                <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                ><Link to="/view"><p className='text-2xl' >View your submissions</p></Link></button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home 