import { EditIcon, PlusIcon } from '../../icons';

import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import AddQuestionForm from '../../wrappers/AddQuestionFormWrapper';
import EditableQuestionsTableWrapper from '../../wrappers/EditableQuestionsTableWrapper';
import SideBarWrapper from '../../wrappers/SideBarWrapper';
import UserIconWrapper from '../../wrappers/UserIconWrapper';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { ManageQuestionsProvider } from './ManageQuestionsContext';

export default async function manageQuestions() {
    const session: any = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        redirect("/unauthorized");
    }
    return (
        <ManageQuestionsProvider>
            <div className="bg-white min-h-screen">
                <div className="bg-theme flex justify-between items-center h-20 px-5">
                    <div className='flex items-center'>
                        <SideBarWrapper role={session?.user?.role ?? "user"} />
                        <Image src="/logo.svg" alt="Logo" width="100" height="100" />
                    </div>
                    {session
                        ? <UserIconWrapper session={session}></UserIconWrapper>
                        : <></>
                    }
                </div>
                <main className='my-10 mx-40'>
                    <div className='flex flex-row items-center'>
                        <PlusIcon className='mr-2'></PlusIcon>
                        <h1 className='font-dmserif text-xl text-black font-bold'>Add Question</h1>
                    </div>
                    <h2 className='font-dmserif text-base text-gray-600'>Contribute a question to the crowd-sourced questions database!</h2>
                    <div id='matchRequestBox' className='flex flex-col items-left bg-gray-100 shadow-md py-4 rounded-md mt-5 mb-10'>
                        <AddQuestionForm session={session} />
                    </div>
                    <div className='flex flex-row items-center'>
                        <EditIcon className='mr-2'></EditIcon>
                        <h1 className='font-dmserif text-xl text-black font-bold'>Edit Question</h1>
                    </div>

                    <h2 className='font-dmserif text-base text-gray-600 pb-5'>Wish to change something? You may edit the questions created by you.</h2>
                    <EditableQuestionsTableWrapper session={session} />
                </main>
            </div>
        </ManageQuestionsProvider>
    )
}
