"use client";
import React, { useState, Fragment } from "react";
import { POST } from '../app/api/v1/questions/route'
import { NextRequest } from "next/server";
import { Session } from 'next-auth';
import { useAddButtonPress } from '../app/manageQuestions/ManageQuestionsContext'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function AddQuestionForm({
    session
  }: {
    session: Session | null;
  }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    complexity: ""
  });

  const { setAddButtonPressed } = useAddButtonPress()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const difficulty = [
    { id: 1, name: 'Easy' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Hard' },
  ]

  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty[0])

  const addQuestion = async () => {
    try {
      setFormData((prevData) => ({
        ...prevData,
        ["complexity"]: selectedDifficulty.name
        }));

      const requestBody = {
        owner: session?.user?.name || '',
        title: formData.title,
        description: formData.description,
        category: formData.category,
        complexity: selectedDifficulty.name
      };

      const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'

      const response = await POST(new NextRequest(BASE_URL + '/api/v1/questions', { method: 'POST' }), requestBody);
      if (response.status == 200) { // succesfully added 
        setAddButtonPressed(true)
        setFormData((prevData) => ({
            title: "",
            description: "",
            category: "",
            complexity: ""
          })
        )
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addQuestion();
      }}
      className="flex flex-col space-y-4 bg-gray-100 px-2 pb-5 pt-2 w-full sm:px-16"
    >
      <div>
        <label className="block text-xs text-gray-600 uppercase">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 uppercase">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 uppercase">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 uppercase">Complexity</label>
      <Listbox value={selectedDifficulty} onChange={setSelectedDifficulty}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md border bg-white border-gray-300 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm">
          <span className="block truncate flex items-center justify-between px-3"> 

            <span className="block truncate">{selectedDifficulty.name}</span>
                <ChevronUpDownIcon
                className="h-5 w-5 "
                aria-hidden="true"
                />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {difficulty.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-theme text-gray-500' : 'text-gray-500'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <span className="block truncate flex items-center justify-between px-2">
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    ) : null}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
      </Listbox>
      </div>
      <button
        type="submit"
        className="border-black bg-black text-white hover:bg-theme hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
      >
        Add
      </button>
    </form>
  );
}
