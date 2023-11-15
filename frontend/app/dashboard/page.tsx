'use client'

import './styles.css'

import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'

import { useEffect, useState } from "react"

import { SideBar } from '@/components/sideBar'
import Link from 'next/link'
import { IconContext } from 'react-icons/lib'

export default function Dashboard() {
  interface Question {
    id: number,
    title: string,
    description: string,
    category: string,
    complexity: string
  }
  const [sidebar, setsidebar] = useState(false as boolean);
  const showSideBar = () => setsidebar(!sidebar as boolean);
  const [storedName, setStoredName] = useState('' as string);
  const [questions, setQuestions] = useState([] as Question[]);
  const [selectedQuestion, setSelectedQuestion] = useState(null as any);
  const [formData, setFormData] = useState({
    id:0,
    title: '',
    description: '',
    category: '',
    complexity: 'Easy',
  } as Question);

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setStoredName(name);
    }
  }, [setStoredName]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { id, title, description, category, complexity } = formData;

    if (title.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }

    if (isDuplicateQuestion(title, questions)) {
      alert("A question with the same title already exists. \nPlease enter a unique title.");
      return;
    }

    const newQuestion = {
      id: questions.length + 1,
      title,
      description,
      category,
      complexity,
    };

    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

    // Save the updated questions to local storage
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    // Clear form fields
    setFormData({
      id:0,
      title: '',
      description: '',
      category: '',
      complexity: 'Easy',
    });

    console.log("New question added:", newQuestion); // Log the new question for debugging
  };

  const isDuplicateQuestion = (title: string, questions: any) => {
    return questions.some((question: any) => question.title === title);
  };


  const handleDelete = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const displayQuestionDetails = (question: any) => {
    const detailsContainer = document.querySelector(".question-details");

    if (!detailsContainer) return;

    // Replace newline characters with <br> tags and preserve indentation
    const descriptionHTML = question.description.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');

    // Create a template for displaying question details
    const detailsHTML = `
        <h2>${question.id}. ${question.title}</h2>
        <p><strong>Description:</strong><br>${descriptionHTML}</p>
        <p><strong>Complexity:</strong> ${question.complexity}</p>
        <p><strong>Category:</strong> ${question.category}</p>
    `;

    detailsContainer.innerHTML = detailsHTML;
  };

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
  };

  const handleClearAll = () => {
    setQuestions([]);

    localStorage.removeItem("questions");
  };
  return (
    <div className="bg-black min-h-screen">
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

      <div className="text-center mt-10 mb-10">
        <p className="text-3xl font-semibold mb-4">Welcome to PeerPrep, {storedName}</p>
        <p className="text-lg font-normal">Here are some questions to get you started</p>
      </div>

      <main>
        <h2>Add a new question here: </h2>
        <div className="form-center">
          <form id="questionForm" onSubmit={handleSubmit}>
            <label htmlFor="questionTitle">Title:</label>
            <input
              type="text"
              placeholder="Title"
              id="questionTitle"
              name="title"
              autoComplete="off"
              maxLength={100}
              onChange={handleInputChange} // Add an onChange event handler
              value={formData.title} // Bind the value to your component state
            />
            <br /><br />
            <label htmlFor="questionDescription">Description:</label>
            <textarea
              placeholder="Description"
              id="questionDescription"
              name="description" // Make sure the name matches the property in formData
              wrap="soft"
              maxLength={700}
              onChange={handleInputChange} // Add an onChange event handler
              value={formData.description} // Bind the value to your component state
            ></textarea>
            <br /><br />
            <label htmlFor="questionComplexity">Complexity:</label>
            <select
              name="complexity"
              id="questionComplexity"
              onChange={handleInputChange}
              value={formData.complexity}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <br /><br />
            <label htmlFor="questionCategory">Category:</label>
            <input
              type="text"
              placeholder="Category"
              id="questionCategory"
              name="category"  // Change the name attribute to "category"
              autoComplete="off"
              maxLength={100}
              onChange={handleInputChange}
              value={formData.category}
            />
            <br /><br />
            <div className="button-container">
              <button id="addQuestionButton" type="submit">Add Question</button>
              <button id="clearAllButton" type="button" onClick={handleClearAll}>Clear All</button>
            </div>
          </form>
        </div>

        {/* Add a modal for confirmation
                <div id="confirmationModal" className="modal">
                    <div className="modal-content">
                    <p>Are you sure you want to delete this question?</p>
                    <button id="confirmDeleteButton">Yes</button>
                    <button id="cancelDeleteButton">No</button>
                    </div>
                </div> */}

        <div className="table-conatiner">
          <table>
            <caption>
              Questions
            </caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Complexity</th>
                <th>Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* This is where questions will be dynamically added */}
              {questions.map((question, index) => (
                <tr key={index} onClick={() => handleQuestionClick(question)}>
                  <td className="question-id">{index + 1}</td>
                  <td className="question-title">{question.title}</td>
                  <td>{question.complexity}</td>
                  <td>{question.category}</td>
                  <td>
                    <button
                      className="delete-button"
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

        <div className="question-details mt-10 mb-10" id="questionDetailsContainer">
          {selectedQuestion && (
            <>
              <h2>{selectedQuestion.title}</h2>
              <p><strong>Description:</strong><br />{selectedQuestion.description}</p>
              <p><strong>Complexity:</strong> {selectedQuestion.complexity}</p>
              <p><strong>Category:</strong> {selectedQuestion.category}</p>
            </>
          )}
        </div>

        {/* Button to check local storage content
                <div className="button-container">
                    <button id="checkLocalStorageButton">Check Local Storage in Console</button>
                </div> */}
      </main>
    </div>
  );
}