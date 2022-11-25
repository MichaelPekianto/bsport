import React, { useEffect, useState, useRef } from 'react';

const ProfileHeader = ({user, auth, follower, following}) => {

    console.log('Profile Header: ', user, auth);
    console.log('follower ',follower);

    return (
        <>
            <div className="flex flex-col bg-white border rounded-xl">

                <div className="flex justify-center w-full shadow-sm">
                    <div className="flex flex-col items-center sm:flex-row p-2 basis-full">
                        <div className="-mt-28 basis-1/4 flex justify-center">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="h-44 w-44 rounded-full border-4 border-white"/>
                        </div>
                        <div className="flex-col basis-1/2">
                            <div className="flex flex-col mt-4 sm:mt-0 text-center sm:text-left">
                                <span className="text-2xl font-bold">{user.name + ' ' + user.last_name}</span>
                                <span className="text-md">{user.username}</span>
                            </div>
                        </div>
                        <div className="flex items-center basis-1/4 justify-center">
                            {user.id === auth.id ?
                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4">Edit Profile</button>
                            :
                                follower.find(e => e.follower_id === auth.id) ?
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent border-slate-400 py-2 px-4 text-sm font-medium shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:w-3/4">Following</button>
                                :
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 lg:w-3/4">Follow</button>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <div className="flex basis-full p-3 mb-3">
                        <div className="flex flex-col items-center basis-1/3">
                            <span className="font-bold text-lg">0</span>
                            <span>Activity</span>
                        </div>
                        <div className="flex flex-col items-center basis-1/3">
                            <span className="font-bold text-lg">{follower.length}</span>
                            <span>Followers</span>
                        </div>
                        <div className="flex flex-col items-center basis-1/3">
                            <span className="font-bold text-lg">{following.length}</span>
                            <span>Following</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileHeader;
