"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBar } from '../../components/sideBar';
import { IconContext } from 'react-icons/lib';
import Modal from 'react-modal';

export default function Homepage() {
    const [sidebar, setsidebar] = useState(false);
    const showSideBar = () => setsidebar(!sidebar);

    const [storedName, setStoredName] = useState('');
    const axios = require('axios');
    
    const Question = {
        "owner": "Dummy", 
        "title": "", 
        "description": "Dummmy", 
        "category": "", 
        "complexity": ""
      };

    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState(Question);
    let [isOpen, setIsOpen] = useState(false)
    const [editedQuestion, setEditedQuestion] = useState(Question);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your API with the formData
            const BASE_URL = 'http://localhost:8080';

            console.log(formData)
            const response = await axios.post(`${BASE_URL}/api/v1/questions`, formData);

            if (response.status === 200) {
                // Question added successfully, update questions state
                const newQuestion = response.data; // Assuming your API returns the newly created question
                setQuestions([...questions, newQuestion]);

                // Clear the form
                setFormData(Question);
            }
        } catch (error) {
            console.error('Error adding question:', error.message);
        }
    };

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
      }, [isOpen]);

    const handleDelete = async (index) => {
        const BASE_URL = 'http://localhost:8080';

        console.log(index)
        const response = await axios.delete(`${BASE_URL}/api/v1/questions/${index}`);
    };

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        console.log("open modal called")
        setIsOpen(true)
    }

    const handleEdit = async (index) => {
        // setModalOpen(true);
        // setEditIndex(index)
        setEditedQuestion(questions.find((question) => question._id === index))
        openModal()
        console.log("in edit", editedQuestion) 
    }

    const handleSave = async () => {
        // Save the changes to the questions array
        const BASE_URL = 'http://localhost:8080';
        console.log("edited question", editedQuestion)

        const putQuestion = {
            "title": editedQuestion.title, 
            "description": "Dummmy", 
            "category": editedQuestion.category, 
            "complexity": editedQuestion.complexity
        }

        const response = await axios.put(`${BASE_URL}/api/v1/questions/${editedQuestion._id}`, putQuestion);
        closeModal();
    };

    const handleEditClick = (index) => {
        const questionToEdit = questions.find((question) => question.id === index); // Find the matching question
        if (questionToEdit) {
            setEditIndex(index);
            setEditedQuestion(questionToEdit); // Set the currently edited question
        }
    };

    const handleEditChange = (e, field) => {
        const updatedQuestion = { ...editedQuestion };
        updatedQuestion[field] = e.target.value;
        setEditedQuestion(updatedQuestion);
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
            <form onSubmit={handleSubmit} className="p-4">
                <div>
                    <label className="block text-xs text-gray-600 uppercase">Title</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 uppercase">Complexity</label>
                    <input
                        name="complexity"
                        type="text"
                        value={formData.complexity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 uppercase">Category</label>
                    <input
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="border-black bg-black text-white hover:bg-theme hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                >
                    Add Question
                </button>
            </form>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Edit Question Modal" className="flex items-center">
    <div className="bg-gray-200 w-full mx-auto p-4 rounded shadow-lg mx-4 my-20">
        <h2 className="text-2xl font-semibold mb-4">Edit Question</h2>

        <div className="mb-4">
            <label className="block text-xs text-gray-600 uppercase mb-1">Title</label>
            <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editedQuestion.title}
                onChange={(e) => handleEditChange(e, 'title')}
            />
        </div>

        <div className="mb-4">
            <label className="block text-xs text-gray-600 uppercase mb-1">Complexity</label>
            <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editedQuestion.complexity}
                onChange={(e) => handleEditChange(e, 'complexity')}
            />
        </div>

        <div className="mb-4">
            <label className="block text-xs text-gray-600 uppercase mb-1">Category</label>
            <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editedQuestion.category}
                onChange={(e) => handleEditChange(e, 'category')}
            />
        </div>

        <div className="flex justify-end">
            <button
                className="bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600"
                onClick={handleSave}
            >
                Save
            </button>
            <button
                className="bg-gray-300 text-gray-600 rounded px-4 py-2 hover:bg-gray-400"
                onClick={closeModal}
            >
                Cancel
            </button>
        </div>
    </div>
</Modal>

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
                            <th className="py-2 text-left font-medium">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions && questions.map((question, index) => (
                            <tr
                                key={index}
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
                                        onClick={() => handleDelete(question._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="py-1">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded font-medium"
                                        data-index={index}
                                        onClick={() => handleEdit(question._id)}
                                    >
                                        Edit
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