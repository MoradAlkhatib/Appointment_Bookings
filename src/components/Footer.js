import React from 'react'
import { AiFillLinkedin, AiFillFacebook,AiFillMail,AiFillTwitterSquare,AiOutlineInstagram } from "react-icons/ai";


function Footer() {
    return (
        <div className="" >
            <footer className="h-16 mt-56 bg-teal-700 ring-4 ring-teal-300 ring-inset">


                <div className="grid grid-cols-7 gap-4 items-center m-7 text-white">
                    <a >©Morad-Alkhatib| Agents on Cloud</a>
                    <a className="ml-12">Contact us</a>
                    <a className="">Contact Support</a>
                    {/* <a className="">Home</a> */}
                    
                    {/* <div className="gap-2 ml-1">test<p><AiFillLinkedin /></p></div> */}

                    <div className="grid grid-cols-7 m-7 text-white text-lg ml-2 ">        
                    <a className="" ><AiFillLinkedin /></a>
                    <a className="ml-0 mr-9"><AiFillFacebook /></a>
                    <a className=""> <AiFillMail/></a>
                    <a className=""> <AiFillTwitterSquare/></a>
                    <a className=""> <AiOutlineInstagram/></a>
                    </div>

                </div>
               



            </footer>



        </div>
    )
}

export default Footer