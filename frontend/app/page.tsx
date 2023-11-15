import { DifficultySelectionProvider } from '@/wrappers/DifficultySelectionContext';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import DifficultySelectionWrapper from '../wrappers/DifficultySelectionWrapper';
import MatchButtonWrapper from '../wrappers/MatchButtonWrapper';
import QuestionsTableWrapper from '../wrappers/QuestionsTableWrapper';
import SideBarWrapper from '../wrappers/SideBarWrapper';
import SignInButtonWrapper from '../wrappers/SignInButtonWrapper';
import SignUpButtonWrapper from '../wrappers/SignUpWrapper';
import UserIconWrapper from '../wrappers/UserIconWrapper';
import WhiteboardButtonWrapper from '../wrappers/WhiteboardButtonWrapper';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { Children } from 'react';
import ExistingSessionWrapper from '@/wrappers/ExistingSessionWrapper';

export default async function Home() {
  const session: any = await getServerSession(authOptions);

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="bg-theme flex justify-between items-center h-20 px-5">
          <div className='flex items-center'>
            {/*<Link href="#" className="ml-7 mr-2 text-black text-2xl">
              <FaIcons.FaBars />
            </Link> */}
            <SideBarWrapper role={session?.user?.role ?? "user"} />
            <Image src="/logo.svg" alt="Logo" width="100" height="100" />

          </div>
          {
            session
              ?
              // show user icon if logged in
              <div>
                <UserIconWrapper session={session}></UserIconWrapper>
                <p>My role is: {session.user?.role}</p>
                {
                  session.user?.role === 'admin'
                    ?
                    <div>
                      <p>Secret Admin Sentence</p>
                    </div>
                    :
                    <div />
                }
              </div>
              :
              // else show sign in and sign up buttons
              <div className='flex flex-row '>
                <SignInButtonWrapper>Sign in</SignInButtonWrapper>
                <SignUpButtonWrapper>Sign up</SignUpButtonWrapper>
              </div>
          }
        </div>
        <main className='my-10 mx-40'>
        <DifficultySelectionProvider>
          <h1 className='font-dmserif font-semibold text-7xl mb-5'>PeerPrep</h1>
          <h2 className='font-dmserif italic text-xl mb-8'>prep with peers for technical assessments</h2>
          <ExistingSessionWrapper/>


            <div id='matchRequestBox' className='flex flex-wrap items-center justify-between bg-gray-200 bg-opacity-30 shadow-md py-4 px-8 rounded-md mb-10'>
              <div className='flex items-center'>
                <h1 className='font-dmserif font-semibold text-xl'>prepare for a </h1>
                <DifficultySelectionWrapper />
                <h1 className='font-dmserif font-semibold text-xl'>question today</h1>
              </div>
              <MatchButtonWrapper session={session}>MATCH</MatchButtonWrapper>
            </div>
          </DifficultySelectionProvider>
          {
            session
              ?
              // show question interface if logged in
              <div>
                <div>
                  {/* <WhiteboardButtonWrapper> */}
                    {/* <button>Go to Code Editor</button> */}
                  {/* </WhiteboardButtonWrapper> */}
                  <QuestionsTableWrapper children={undefined} session={session} />
                </div>
              </div>
              :
              // else show empty div
              <div />
          }
        </main>
      </div>
    </>
  )
}
