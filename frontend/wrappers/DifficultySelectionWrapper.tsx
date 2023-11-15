'use client'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSetDifficulty } from './DifficultySelectionContext'

const difficulty = [
  { id: 1, name: 'easy' },
  { id: 2, name: 'medium' },
  { id: 3, name: 'hard' },
]


export default function DifficultySelectionWrapper() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty[0])
  const { setDifficultySelected } = useSetDifficulty()

  useEffect(() => {
    const name = selectedDifficulty.name;
    console.log(name)
    // localStorage.setItem('selectedDifficulty', name);
    setDifficultySelected(selectedDifficulty.name);
  }, [selectedDifficulty]);

  return (
    <div className="relative w-56 px-5">
    <Listbox value={selectedDifficulty} onChange={setSelectedDifficulty}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-500 border py-2 text-theme font-dmserif font-semibold text-xl focus:outline-none focus-visible:border-theme focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate flex items-center justify-between px-2"> 

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
    
)
}
