'use client'

import { useRouter } from 'next/navigation';
import { useSetDifficulty } from './DifficultySelectionContext'

export default function ExistingSessionWrapper() {
    const { sessionExists } = useSetDifficulty()
    const router = useRouter()

    const handleClick = () => {
        router.push(`/whiteboard/${sessionExists}`)
    }
    return (
        <div>
      {sessionExists.length > 1 && (
        <div className="bg-red-400 bg-opacity-20 text-red-500 px-4 py-3 flex items-center justify-between mb-4">
          <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
</svg>

            <p className='pl-2 text-gray-600 text-sm'>You already have an active session, please complete it before starting a new one.</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            onClick={handleClick}
          >
            Resume
          </button>
        </div>
      )}
    </div>
      );
}