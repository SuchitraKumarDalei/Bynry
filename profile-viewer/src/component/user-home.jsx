import { useState } from "react"
import ProfileCard from "./profile-card";

export default function UserHome() {
    const [profiles, setProfiles] = useState([]);
    useState(() => {
        setProfiles(JSON.parse(localStorage.getItem('profileList')));
    }, [])
    return (
        <div className="grid gap-6 ">
            <div className="border-b-2 ">
                <h1 className="font-extrabold text-3xl my-4  text-blue-400 text-center">Wecome To The Profile Viewer</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  m-3">
                
                {
                    profiles && profiles?.length > 0 ?
                    profiles.map((singleProfile, index) =>
                            <ProfileCard profile={singleProfile} key={index} admin={false} />
                        )
                        : <h1 className="ml-7 mt-4 text-xl font-semibold text-red-500">Oops.. ,NO profiles available right now</h1>
                }
            </div>

        </div>
    )
}