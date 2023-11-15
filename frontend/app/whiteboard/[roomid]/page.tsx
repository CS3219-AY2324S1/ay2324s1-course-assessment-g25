'use client'

import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image';
import React from 'react';
import io, { Socket } from 'socket.io-client'
import { Room } from "./Room";
import { useParams, useSearchParams } from "next/navigation";
import { fetchPairByRoom, fetchQuestionByRoomId } from "@/app/api/match/routes";
import AIChatButton from "@/components/AIChatButton"
import QuestionSelectionWrapper from "@/wrappers/QuestionSelectionWrapper";
import { useRouter } from 'next/navigation';
import { deletePair } from "@/app/api/match/routes";
import { Dialog, Transition } from '@headlessui/react'
import { addHistory } from "@/app/api/history/routes";
import { useSession } from 'next-auth/react';
import AIHintButton from "@/components/AIHintButton";

export default function Whiteboard() {
  
  const { data: session, status } = useSession();
  console.log("session name " + session?.user?.name)
  const params = useParams();

  let [isOpen, setIsOpen] = useState(false)
  let [isEnd, setIsEnd] = useState(false)
  let [end, setEnd] = useState(false)
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  let [isStart, setIsStart] = useState(false)
  let [isSender, setIsSender] = useState(false)
  let [confirmed, setConfirmed] = useState(false)
  let [stay, setStay] = useState(false)
  const [questions, setQuestions] = useState('')
  const [name, setName] = useState('')
  const [roomMessage, setRoomMessage] = useState('Click on "startSession" to start coding!')
  const [openQuestion, setOpenQuestion] = useState(false)

  const room = params.roomid

  var question: string
  const router = useRouter()

  const handleEndSession = () => {
    setIsOpen(true)
    setIsSender(true)
    setEnd(true)
    socket?.emit('message', { room: room, message: "Partner wishes to end session, do you wish to proceed?" })
    console.log(room, isSender)
  }

  useEffect(() => {
    setName(session?.user?.name ?? '')
    //console.log(question)
    connect()
    const handleBeforeUnload = () => {
      socket?.emit('partner-disconnect', { room, message: "Partner is disconnected" });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isStart]);

  const connect = () => {
    setName(session?.user?.name ?? '')
    fetchPairByRoom(room).then(result => { question = result.questionId, setQuestions(result.questionId)})
    console.log("question is " + question)
    //socket.emit('join-room', { room: room })
    console.log("Socket connected" + socket?.connected)
    console.log("connect message")
    socket?.on('end-session', ({ message }) => {
      console.log("end session received")
      setMessages(message);
      setIsOpen(true)
      setIsEnd(true)
    });
    socket?.on('confirmed', ({ message }) => {
      addHistory(room, session?.user?.name ?? '', question)
      console.log(question)
      setIsOpen(true)
      setMessages(message)
      setConfirmed(true)
      router.push('/')
    })
    socket?.on('partner-stay', ({ message }) => {
      setIsOpen(true)
      setIsEnd(false)
      setMessages(message)
      setStay(true)
      setIsSender(false)
      //closeModal()
    })
    socket?.on('partner-left', ({ room, message }) => {
      setIsOpen(true)
      setIsEnd(true)
      setMessages(message)
    })
    socket?.on('get-question', ({message}) => {
      question = message._id
      setQuestions(message._id)
      console.log("socket question: " + message._id)
      console.log(question)
    })
    socket?.on('room-ready', ({room, message}) => {
      setRoomMessage(message)
      setOpenQuestion(true)
    })
    socket?.on('wait-for-partner', ({message}) => {
      setOpenQuestion(false)
      setRoomMessage(message)
    })
    //handleEndSession();
    return socket
  } 

  function closeModal() {
    setIsOpen(false)
    setIsEnd(false)
  }

  const handleStay = () => {
    closeModal()
    setStay(false)
  }

  const handleStayClick = () => {
    // socket.disconnect()
    socket?.emit('stay-session', { room, message: "Partner wants to stay" })
    closeModal()
  }

  const handleConfirmEndSession = () => {
    deletePair(room)
    console.log("User confirmed end session");
    // Send a confirmation message to the backend
    socket?.emit('confirmEndSession', { room, message: "partner ended session" });
    socket?.disconnect()
    addHistory(room, session?.user?.name ?? '', questions)
    router.push(`/`)
  };
 
  const handleStart = () => {
    const socket = io('http://localhost:8081');
    setSocket(socket)
    socket?.emit('join-room', { room: room })
    setIsStart(true)
  }

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
            {isStart && openQuestion
              ? <QuestionSelectionWrapper roomId={room} socket={socket} />
              : <h1>{roomMessage}</h1>
            }
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


        {!isStart ? (
          <div className="w-7/12 bg-white rounded-lg overflow-auto h-[calc(100vh-5rem)] relative">
            <div className="p-5 content-center bottom-3 right-3">
              <button
                onClick={handleStart}
                type="button"
                className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-12"
              >
                startSession
              </button>
            </div>
          </div>) :
          (<div className="w-7/12 bg-white rounded-lg overflow-auto h-[calc(100vh-5rem)] relative">
            <Room>
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
          )}
          {/* {isEnd? 
          (<EndSessionButton roomId={room} session={session} socket={socket} isEnd={isEnd}></EndSessionButton>):<></> } */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => { }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div>
                    {isEnd ? (
                      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 pb-4">
                          {messages}
                        </Dialog.Title>
                        <div className="flex flex-row gap-2 w-full justify-between">
                          <button
                            onClick={handleStayClick}
                            type="button"
                            className="rounded-md border w-full border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-10"
                          >
                            Stay
                          </button>
                          <button
                            onClick={handleConfirmEndSession}
                            type="button"
                            className="rounded-md border w-full border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 h-10"
                          >
                            End
                          </button>
                        </div>
                      </Dialog.Panel>
                    ): <></>}
                    {isSender? (
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 pb-4"
                        >
                          Waiting for your partner's response
                        </Dialog.Title>
                        <div>
                          {confirmed ? (
                            <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            {messages}
                          </Dialog.Title>) : (<div></div>)}
                        </div>
                      </Dialog.Panel>
                    ): <></>}
                    {stay ? (
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                          {messages}
                        </Dialog.Title>
                        <div className="mt-4">
                          <button
                            onClick={handleStay}
                            type="button"
                            className="rounded-md border w-full border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-10"
                          >
                            OK
                          </button>
                        </div>
                      </Dialog.Panel>


                    ) : (<div><Dialog.Panel></Dialog.Panel></div>)}
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div >
  );

}


