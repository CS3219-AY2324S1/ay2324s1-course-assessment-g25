"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBar } from '../../components/sideBar';
import { IconContext } from 'react-icons/lib';
import axios from 'axios';
import {useRouter} from 'next/navigation'


export default function Profile() {
    const [sidebar, setsidebar] = useState(false);
    const showSideBar = () => setsidebar(!sidebar);

    const [editProfile, setEditProfile] = useState(false);
    const showEditProfile = () => setEditProfile(!editProfile);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('')

    const [storedEmail, setStoredEmail] = useState('');
    const [storedId, setStoredId] = useState('');
    const [storedName, setStoredName] = useState('');

    useEffect(() => {
        const userName = localStorage.getItem('name');
        const userEmail = localStorage.getItem('email')
        const id = localStorage.getItem('id');
        if(userName && userEmail && id) {
            setStoredName(userName)
            setStoredEmail(userEmail)
            setStoredId(id)
        }
    })

    

    const router = useRouter();

    const handleSave = async (e) => {
        e.preventDefault();

        if (name !== '' && email !== '') {
            await axios.put('http://localhost:8080/api/v1/users/' + storedId, { name, email }).then(
                (res) => {
                    console.log(res.data),
                        localStorage.setItem('name', res.data.name),
                        localStorage.setItem('email', res.data.email)
                }).catch((error) => {
                    console.log(error)
                });
            setEditProfile(false)
        } else {
            setError('Please fill in all fields')
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        await axios.delete('http://localhost:8080/api/v1/users/' + id).then(
            (res) => {
                console.log(res.data),
                    router.push('../sign_in')
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="bg-white min-h-screen">
            <IconContext.Provider value={{ color: '#000000' }}>
                <div className="bg-green-50 flex justify-start items-center h-20">
                    <div className='flex items-center spcae-x-3' >
                        <Link href="#" className="ml-7 mr-2 text-black text-2xl">
                            <FaIcons.FaBars onClick={showSideBar} />
                        </Link>
                        <p className="flex items-center px-4 py-3 text-xl text-black font-semibold">View Profile</p>
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
            <>
                <div className="bg-white  overflow-hidden">
                    <div className="p-7">
                        {/* User Information */}
                        <h1 className="text-lg font-semibold mb-2">Hi, {storedName}</h1>

                        {/* Contact Information */}
                        <div className="mt-4">
                            <p className="text-black">
                                <span className="font-semibold">Email:</span>{" "}
                                {storedEmail}
                            </p>
                        </div>
                        <>
                            {editProfile && (
                                <div className="w-fit mt-4 bg-green-50 shadow-lg rounded-lg p-4">
                                    <div className="mb-4;">
                                        <label className="block text-sm font-medium text-gray-700;">Name:</label>
                                        <input
                                            type="name"
                                            className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4;">
                                        <label className="block text-sm font-medium text-gray-700;">Email:</label>
                                        <input
                                            type="email"
                                            className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400;"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && <div className='text-sm text-red-500'>* {error}</div>}

                                </div>
                            )}

                            <div className='flex'>
                                <button className="text-blue-900 pt-4 ml-14 font-semibold list-none no-underline text-sm  flex;" onClick={showEditProfile}>
                                    <p className="flex hover:underline">{editProfile ? 'Cancel' : 'Update Profile'} </p>
                                </button>
                                <button className="text-blue-900  pt-4 ml-7 font-semibold list-none no-underline text-sm  flex;" onClick={handleSave}>
                                    <p className="flex hover:underline"> {editProfile ? 'Save' : ''} </p>
                                </button>
                            </div>
                            <button className="p-1 text-red-700 pt-4 ml-14 list-none no-underline text-xs  flex;" onClick={handleDelete}>
                                <p className="flex hover:underline">{editProfile ? '' : 'Delete Account'}</p>
                            </button>
                        </>
                    </div>
                </div>

            </>

        </div>
    )
}