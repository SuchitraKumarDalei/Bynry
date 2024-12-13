import { useNavigate } from "react-router-dom"

export default function HeaderMain(){
    const navigate = useNavigate();
    return (
        <div className="flex  bg-slate-400 justify-between px-10 py-5 border-b-2 ">
            <div onClick={()=>navigate('/user-home')} >
                <h1 className="text-xl font-extrabold  cursor-pointer hover:text-gray-600 ">Profile Viewer</h1>
            </div>
            <div className="flex justify-center items-center gap-6">
                <span onClick={()=>navigate('/user-home')} className="text-xl font-extrabold cursor-pointer hover:text-gray-600 " >Home</span>
                <span onClick={()=>navigate('/admin-pannel')} className="text-xl font-extrabold cursor-pointer hover:text-gray-600" >AdminPannel</span>
            </div>
        </div>
    )
}