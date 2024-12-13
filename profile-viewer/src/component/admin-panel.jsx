import { useEffect, useRef, useState } from "react"
import ProfileCard from "./profile-card";

export default function AdminPannel() {
    const initialState = {
        name: '',
        email: '',
        role: '',
        address: '',
        image: '',
        description: '',
    }
    const [profileData, setProfileData] = useState(initialState);
    const [profileList, setProfileList] = useState([]);
    const [isEditMode,setIsEditedMode] = useState(null);
    const [isEdited, setIsEdited] = useState({});
    const editRef = useRef(null);

    function handleProfileEdit(getCurrentProfile){
        editRef.current.scrollIntoView({behavior : 'smooth'});
        setIsEditedMode(getCurrentProfile.email)
        setIsEdited(getCurrentProfile);
        setProfileData(getCurrentProfile)
    }
    function handleOnAddingProfile(e) {
        e.preventDefault();
        var cpyProfile = [...profileList]
        if (isEditMode !== null) {
            const findIndexOfCurrentProfile = cpyProfile.findIndex((profile) => profile.email === isEdited.email);

            if (findIndexOfCurrentProfile !== -1) {
                cpyProfile[findIndexOfCurrentProfile] = {
                    ...cpyProfile[findIndexOfCurrentProfile],
                    name: profileData.name?profileData.name: cpyProfile[findIndexOfCurrentProfile].name,

                    email: profileData.email ? profileData.email : cpyProfile[findIndexOfCurrentProfile].email,

                    role: profileData.role ? profileData.role : cpyProfile[findIndexOfCurrentProfile].role,

                    address: profileData.address ? profileData.address : cpyProfile[findIndexOfCurrentProfile].address,

                    image: profileData.image ? profileData.image : cpyProfile[findIndexOfCurrentProfile].image,

                    description: profileData.description ? profileData.description : cpyProfile[findIndexOfCurrentProfile].description,
                }
                setIsEdited({});
                setIsEditedMode(null);
            }
        }
        else {
            cpyProfile = [...profileList, { ...profileData }]
        }
        setProfileList(cpyProfile);
        setProfileData(initialState);
        localStorage.setItem('profileList', JSON.stringify(cpyProfile));
        
    }

    function handleProfileDelete(getCurrentProfile){
        
        var copyOfProfile = [...profileList];
        const findIndexOfCurrentProfile = copyOfProfile.findIndex(singleProfile=>getCurrentProfile.email === singleProfile.email)

        if(findIndexOfCurrentProfile !== -1){
            copyOfProfile = copyOfProfile.filter((prof)=>{
                return getCurrentProfile !== prof
            })

            setProfileList(copyOfProfile);
            localStorage.setItem('profileList',JSON.stringify(copyOfProfile));
        }else{
            console.log("Items is not available")
        }
    }

    function handleOnChange(e) {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }

    function validFormData() {
        return Object.keys(profileData).map(key => profileData[key] !== '').every(item => item);
    }

    useEffect(() => {
        setProfileList(JSON.parse(localStorage.getItem('profileList')) || []);
    },[]);

    return (
        <div className=" flex flex-col">
            <div className="text-center text-xl font-serif font-semibold border-2 rounded-lg mx-4 my-2 py-5 bg-slate-700 text-white " >ADMIN PANNEL</div>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  m-4">
                {
                    profileList && profileList?.length > 0 ?
                        profileList.map((singleProfile, index) =>
                            <ProfileCard profile={singleProfile}  handleProfileEdit={handleProfileEdit} key={index} handleProfileDelete={handleProfileDelete} admin={true}/>
                        )
                        : <h1 className="ml-7 mt-4 text-xl font-semibold text-red-500">Please add some profiles!...</h1>
                }
            </div>
            {/* adding profiles */}
            <form onSubmit={handleOnAddingProfile}>
                <div ref={editRef} className=" m-5 min-h-[100px] border-2 rounded-lg overflow-hidden p-5 flex flex-col gap-2">
                    <h1 className="border-b-2 pb-2 font-semibold  pl-1">{isEditMode !==null ? 'Edit Profile':'Add Profiles'}</h1>
                    <input value={profileData.name} onChange={handleOnChange} className="border-2 rounded-lg p-2" type="text" placeholder="Enter Your Name" name="name" />
                    <input value={profileData.email} onChange={handleOnChange} className="border-2 rounded-lg p-2" type="email" placeholder="Enter Your Email" name="email" />
                    <input value={profileData.role} onChange={handleOnChange} className="border-2 rounded-lg p-2" type="text" placeholder="Enter Your Role" name="role" />
                    <input value={profileData.address} onChange={handleOnChange} className="border-2 rounded-lg p-2" type="text" placeholder="Enter Your Address" name="address" />
                    <input onChange={handleOnChange} className="border-2 rounded-lg p-2" type="text" value={profileData.image} placeholder="Enter Your Image link" name="image" />
                    <textarea onChange={handleOnChange} className="border-2 rounded-lg p-2" value={profileData.description} name="description" placeholder="Enter Description"  ></textarea>
                    {
                        (!validFormData()) ? <button type="submit" className="bg-black text-white rounded-md py-2 hover:bg-slate-800 cursor-pointer  " disabled>{isEditMode !== null ? 'Edit' : 'Add'}</button>
                            : <button type="submit" className="bg-black text-white rounded-md py-2 hover:bg-slate-800 cursor-pointer">{isEditMode !== null ? 'Edit' : 'Add'}</button>
                    }

                </div>
            </form>
        </div>
    )
}