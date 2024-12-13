import { Outlet } from "react-router-dom";
import HeaderMain from "./Home/header";
import { useEffect, useState } from "react";

export default function Home(){
    return (
        <div className="flex flex-col">
            <HeaderMain/>      
            <div className="min-h-[85vh]">
                <Outlet/>  
            </div>
            <div className="bg-black text-white text-center  h-10 font-semibold text-xl pt-2">Created By Suchitra Kumar Dalei , daleisuchitra22@gmail.com</div>
        </div>
    )
}