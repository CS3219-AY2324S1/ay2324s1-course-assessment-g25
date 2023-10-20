import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SideBar = [
    {
        title:'Home',
        path:'../homepage',
        icon: <AiIcons.AiFillHome/>,
    },
    {
        title:'View profile',
        path:'../profile',
        icon: <IoIcons.IoIosPaper/>,
    },
    {
        title:'Support',
        path:'../homepage',
        icon: <IoIcons.IoMdHelpCircle/>,
    },
    {
        title:'Logout',
        path:'../sign_in',
    },
    {
        title:'Delete Account',
        path:'../sign_in',
    }
]