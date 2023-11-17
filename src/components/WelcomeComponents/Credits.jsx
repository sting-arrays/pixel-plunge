import WelcomePage from "../WelcomePage"
import { Link } from "react-router-dom"

export default function Credits() {
    return (
        <div className='flex flex-col my-5'>
            <h2 className='text-[30px]'>Thanks go to</h2>
            <a className='my-5 text-[20px]  hover:text-white' href="https://ninjikin.itch.io/water" target="blank">
            Water+ Water tiles - SciGho
            </a>
            <a className=' mb-5 text-[20px]  hover:text-white' href="https://nszym.itch.io/spearfishing-assets-pack" target="blank">
          SpearFishing assets pack - Szym
            </a>  
            <a className='text-[20px]  hover:text-white' href="https://www.pinterest.co.uk/pin/926897167038152142/" target="blank">
          Pixel Art Underwater Coral Reef with mermaid - flyforshine
            </a> 
            <Link className="button w-16 m-auto mt-5" to="/" element={<WelcomePage />}>{" "}Home{" "}</Link>
        </div>
    )
}