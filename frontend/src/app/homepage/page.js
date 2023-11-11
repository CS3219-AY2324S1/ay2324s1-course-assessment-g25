"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBar } from '../../components/sideBar';
import { IconContext } from 'react-icons/lib';

export default function Homepage() {
    const [sidebar, setsidebar] = useState(false);
    const showSideBar = () => setsidebar(!sidebar);

    const [storedName, setStoredName] = useState('');
    const axios = require('axios');
    
    const Question = {
        title: '',
        complexity: '',
        category: '',
      };

    const [questions, setQuestions] = useState([]);

    const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'

    useEffect(() => {
        const fetchData = async () => {
          try {
            const baseURL = 'http://localhost:8080';
            const apiEndpoint = '/api/v1/questions?page=1&limit=10';
            const response = await axios.get(baseURL + apiEndpoint);
            const data = await response.data;
            setQuestions(data); 
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, []);

    const handleDelete = (index) => {
        /* const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
        localStorage.setItem("questions", JSON.stringify(updatedQuestions)); */
    };

    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setStoredName(name)
        }
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <IconContext.Provider value={{ color: '#000000' }}>
                <div className="bg-green-50 flex justify-start items-center h-20">
                    <div className='flex items-center spcae-x-3' >
                        <Link href="#" className="ml-7 mr-2 text-black text-2xl">
                            <FaIcons.FaBars onClick={showSideBar} />
                        </Link>
                        <p className="flex items-center px-4 py-3 text-xl text-black font-semibold">Home</p>
                    </div>
                    <nav className={sidebar ? "bg-green-50 w-64 h-screen fixed top-0 left-0 transform transition-transform duration-300 translate-x-0 text-black" : "bg-gray-300 w-64 h-screen fixed top-0 left-0 -translate-x-full transition-transform duration-800 flex justify-center text-white"}>
                        <ul className="w-full" onClick={showSideBar}>
                            <li className="w-screen h-20 flex items-center">
                                <Link href='#' className="ml-8 text-black text-2xl">
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {SideBar.map((item, index) => {
                                return (
                                    <li key={index} className="text-black px-7 py-2 list-none h-16 no-underline text-sm w-5/6 h-full flex items-center px-4 rounded-md hover:underline">
                                        <Link href={item.path} className="flex items-center space-x-2">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </IconContext.Provider>
            <p className="p-7 text-lg font-semibold mb-2">Welcome back, {storedName}</p>
            <div className="table-container">
                <table className="min-w-full mx-5">
                    <caption className="text-lg font-semibold mb-2">Questions</caption>
                    <thead>
                        <tr className="border-b bg-white">
                            <th className="py-2 text-left font-medium pl-1">ID</th>
                            <th className="py-2 text-left font-medium">Title</th>
                            <th className="py-2 text-left font-medium">Complexity</th>
                            <th className="py-2 text-left font-medium">Category</th>
                            <th className="py-2 text-left font-medium">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions && questions.map((question, index) => (
                            <tr
                                key={index}
                                onClick={() => handleQuestionClick(question)}
                                className={index % 2 === 1 ? 'bg-theme bg-opacity-20' : 'bg-white'}
                            >
                                <td className="py-1 pl-1">{index + 1}</td>
                                <td className="py-1 ">{question.title || ''}</td>
                                <td className="py-1 ">{question.complexity || ''}</td>
                                <td className="py-1 ">{question.category || ''}</td>
                                <td className="py-1">
                                    <button
                                        className="delete-button bg-red-500 text-white px-3 py-1 rounded font-medium"
                                        data-index={index}
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}