'use client'

import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image';
import React from 'react';
import io, { Socket } from 'socket.io-client'
import { Room } from "./Room";
import { Modal, Button } from "react-bootstrap";
// import { joinRoom } from '../api/match/routes'
import AIChatButton from "@/components/AIChatButton"
import AIHintButton from "@/components/AIHintButton"
import QuestionSelectionWrapper from "@/wrappers/QuestionSelectionWrapper";

export default function Whiteboard() {

  // dummy question. input api here or wtv to call for correct question
  const question = {
    "_id": "654289d66292a524af80e0ab",
    "owner": "Deon",
    "title": "Palindrome Checker",
    "description": "Write a Python function to check if a given string is a palindrome. Palindromes are strings that read the same backward as forward.",
    "category": "String Manipulation",
    "complexity": "Easy",
    "__v": 0
  }

  let [isOpen, setIsOpen] = useState(false)
  let [end, setEnd] = useState(false)
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [isSender, setIsSender] = useState(false)

  // const [socket, setSocket] = useState<Socket | null>(null);
  const socket = io('http://localhost:8081');

  const handleEndSession = () => {
    console.log(room)
    setEnd(true)
    //const socket = connect()
    socket.emit('message', { room: room, message: "partner wishes to end session, do you wish to proceed?" })
    setIsSender(true)
  }


  useEffect(() => {
    /* setRoom("room306ea1f3-0913-47a5-aba4-ec9980e23387")
    socket.emit('join-room', { room: room }) */
    // setSocket(socket)
  }); 

  /* const connect = () => {
    console.log("connect message")
    socket.on('end-session', ({ message }) => {
      console.log("end session received")
      setMessages(message);
      setIsOpen(true)
      console.log(`${isSender}`)
    });
    return socket
  }
 */
  const handleCloseClick = () => {
    // socket.disconnect()
    closeModal()
  }

  const handleConfirmEndSession = () => {
    console.log("User confirmed end session");

    // Send a confirmation message to the backend
    socket.emit('confirmEndSession', { room });
    handleCloseClick();
  };

  return (
    <div className='flex flex-col bg-theme bg-opacity-10 min-h-screen'>

      <div className="bg-theme flex justify-between items-center h-16">
        <div className='flex items-center'>

          <Image src="/logo.svg" alt="Logo" width="80" height="80" />

          <h2 className='font-dmserif italic text-xl'>  prep with peers for technical assessments</h2>

        </div>
      </div>

      <div className='flex flex-row h-full mx-2 mt-2 '>
        <div className='w-5/12 '>
          <div className='bg-white rounded-lg overflow-auto mr-2 py-4 px-5 h-[calc(100vh-20rem)]'>
            <QuestionSelectionWrapper complexity={"Easy"} />
          </div>

          <div className='bg-gray-500 rounded-lg overflow-auto mr-2 py-4 px-5 h-56 mt-4'>
            <div className="text-white">
              <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
              <p className="text-gray-300 mb-4">
                Welcome! How can I assist you today?
              </p>
              <p className="text-gray-300 mb-4">
                Get a hint by entering the problem description or chat with AI
              </p>
              <div className="flex justify-center gap-4">
                <AIHintButton />
                <AIChatButton />
              </div>
            </div>
          </div>


        </div>

        <div className="w-7/12 bg-white rounded-lg overflow-auto h-[calc(100vh-5rem)] relative">
          <Room className="h-full">
            <CollaborativeEditor />
          </Room>

          <div className="absolute bottom-3 right-3">
            <button
              onClick={handleEndSession}
              type="button"
              className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-12"
            >
              endSession
            </button>
          </div>
        </div>

        <Modal show={isOpen} onHide={handleCloseClick}>
          <Modal.Header closeButton>
            <Modal.Title>End Session Confirmation</Modal.Title>
          </Modal.Header>
          {isSender?(
          <Modal.Body> End session? </Modal.Body>
          ): (<Modal.Body > {messages} </Modal.Body>)
          }
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseClick}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmEndSession}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );

}

