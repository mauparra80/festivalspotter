import mauDrawing from '../assets/img/maupic03.JPG'

export default function MaupbLink() {

    return (
        <a 
        className="maupblink-container flex justify-center content-center w-52"
        href=''
        >
            <img className='w-[60px] h-[60px] object-cover rounded-l-xl' src={mauDrawing} alt="Image of Mauricio Parra" />
            <p className='flex items-center justify-center h-[60px] flex-1 rounded-none rounded-r-xl text-center bg-customTan text-customGunmetal' >Contact me</p>
        </a>
    )
}