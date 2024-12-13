import { useNavigate } from "react-router-dom"

export default function ProfileCard ({profile,handleProfileEdit,admin}){
    const navigate = useNavigate();
    return (
        <div className="p-3 rounded-lg border-2 grid grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="min-h-[100px] w-[100%]">
                    <img 
                        src={profile.image} 
                        alt={profile.name}
                        className="h-full w-full object-cover rounded-md"
                    />
                </div>   
                <h1 className="text-xl font-semibold" >{profile.name}</h1>
            </div>
            <div className="flex flex-col px-5 justify-between font-semibold">
                <p className="">Role - {profile.role}</p>
                <p>Address - {profile.address}</p>
                <p>About - {profile.description}</p>
                <div className="flex gap-3 justify-between">
                <button onClick={()=>navigate('/home/profile-details',{state : profile})} className="bg-black text-white rounded-lg p-3">Detail</button>
                {admin ? <button onClick={()=>handleProfileEdit(profile)} className="bg-black text-white rounded-lg p-3">Edit</button> : null}
                {admin ? <button className="bg-black text-white rounded-lg p-3">Delete</button> : null}
            </div>
            </div>
            
        </div>
    )
}