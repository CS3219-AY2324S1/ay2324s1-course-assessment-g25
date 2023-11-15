'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { cancelMatch, fetchPair, findMatch } from '../app/api/match/routes'

import { Session } from 'next-auth'
import { signIn } from "next-auth/react"
import { NextRequest } from 'next/server'
import { GET } from '../app/api/v1/questions/route'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { useSetDifficulty } from './DifficultySelectionContext'
import { useRouter } from 'next/navigation';

interface Question {
  title: string;
  complexity: string;
  category: string;
}

interface PAIR {
  username: string,
  complexity: string
}

export default function MatchButtonWrapper({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session | null;
}) {

  let [isOpen, setIsOpen] = useState(false)
  const [seconds, setSeconds] = useState(30);
  const { difficultySelected, setSessionExists } = useSetDifficulty();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [otherMatch, setOtherMatch] = useState('');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isPairCreated, setIsPairCreated] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [name, setName] = useState(session?.user?.name ?? 'null')
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [hasRoom, setHasRoom] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const router = useRouter()

  useEffect(() => {
    fetchPair(session?.user?.name ?? "").then((result) => {
      if (result) {
        console.log("session found in match button wrapper")
        setHasRoom(true)
        setSessionExists(result.roomId)
      }
    }).catch((err) => {
      setHasRoom(false)
    } )
  })

  useEffect(() => {
    if (roomId && !hasRedirected) {
      router.push(`/whiteboard/${roomId}`);
      setHasRedirected(true);
    }
  }, [roomId, hasRedirected]);

  const connect = () => {
    const newSocket = io('http://localhost:8081');
    newSocket.on('connect', () => {
      // The socket has successfully connected to the server.
      console.log("socket connected");
      setSocket(newSocket);
    });
    var roomId: string;
    newSocket.on('match-found', (msg) => {
      setName((msg.username2 === session?.user?.name) ? msg.username2 : msg.username1)
      const match = (msg.username2 === session?.user?.name) ? msg.username1 : msg.username2;
      roomId = msg.room;
      setRoomId(roomId)
      setIsPairCreated(true);
      setOtherMatch(match);
      console.log(`Match found with: ${match}`);
      console.log(roomId)
      // new

      console.log(hasRedirected, roomId)
      if (!hasRedirected && roomId) {
        newSocket.emit('join-room', { room: roomId })
        console.log('in redirect')
        router.push(`/whiteboard/${roomId}`);
        setHasRedirected(true);
      }

      newSocket.disconnect();
    });
    newSocket.on("disconnect", () => {
      console.log(newSocket.connected); // false
    });
    /* socket.on('join-room', function(io){
      io.join(roomId);
    }) */

    return newSocket;
  };

  async function handleMatch() {
    console.log("handle match called", isConnected)
    try {
      const response = await GET(new NextRequest('http://localhost:8080' + '/api/v1/questions?page=1&limit=10', { method: 'GET' }));
      const data = await response.json();
      const filteredQuestions = data.filter((qn: Question) => qn.complexity === localStorage.getItem('selectedDifficulty'));
      setQuestions(filteredQuestions);

      const username = session?.user?.name ?? localStorage.getItem("name") ?? 'null';
      if (username == null) {
        return;
      } else if (!isConnected) {
        console.log("in bracket")
        connect();
        setIsConnected(true);
        findMatch(username, difficultySelected);
      }
    } catch (error) {
      //handle error
    }
  }


  async function handleCancelMatch() {
    try {
      cancelMatch(name);
      console.log("heyy " + name)
      // await deletePair(session?.user?.name ?? localStorage.getItem("name") ?? 'null')
      setIsPairCreated(false);
      setIsConnected(false);
      if (socket != null) {
        socket.disconnect();
      }
    } catch (error) {

    }
  }

  const handleButtonClick = () => {
    console.log("button pressed")
    if (session) {
      // User is logged in
      handleMatch()
      openModal()
    } else {
      // User is not logged in
      signIn()
    }
  }

  const handleCloseClick = () => {
    handleCancelMatch()
    setOtherMatch('')
    if (socket != null) {
      socket.disconnect();
    }
    closeModal()
    setSeconds(30)
  }

  const handleClickOutside = () => {
    handleCancelMatch()
    setOtherMatch('')
    // socket.disconnect()
    closeModal()
    setSeconds(30)
    setIsTimerFinished(false);
  }

  const handleRetry = () => {
    setSeconds(30);
    setIsTimerFinished(false);
    handleMatch();
  };

  const handleTryLater = () => {
    setSeconds(30)
    setIsOpen(false);
    setIsTimerFinished(false);
  };

  const handleTimeRunOut = () => {
    setIsTimerFinished(true);
    handleCloseClick();
  }

  useEffect(() => {
    let interval: number;
    /* getPair(); */

    if (isOpen) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          window.clearInterval(interval);
          handleTimeRunOut();
          openModal();
        }
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [isOpen, seconds]);

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`flex items-center bg-theme text-gray-800 font-dmserif font-medium text-lg border rounded py-2 px-5 shadow-md font-dmserif ${hasRoom ? "cursor-not-allowed hover:bg-gray-300" : "cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"}`}
        disabled={hasRoom}
      >
        {hasRoom ? children : children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => handleClickOutside()}>
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
          {isTimerFinished ? (

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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Match failed. Would you like to:
                    </Dialog.Title>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleRetry}
                      >
                        Retry
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 ml-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleTryLater}
                      >
                        Try Later
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>


          ) : (
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {isPairCreated ? (
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          You have been matched with {otherMatch}
                        </Dialog.Title>
                      </div>
                    ) :
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Matching you with a peer...
                        </Dialog.Title>

                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {seconds} seconds left
                          </p>

                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={handleCloseClick}
                          >
                            I'm impatient
                          </button>
                        </div>
                      </div>}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          )}
        </Dialog>
      </Transition>
    </>

  )
}