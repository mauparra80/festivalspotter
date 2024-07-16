
export default function LinkButton({icon, name, link, reverse}) {
    

    return(
        <a href={link} target="_blank" className={`flex justify-center items-center w-44 z-10 relative  ${reverse ? 'flex-row-reverse' : ''}`}>
            <div className='icon-container flex-shrink-0 flex items-center justify-center w-10 h-10 object-cover rounded-xl m-2 bg-white'>
                <img src={icon} alt={name} className='h-8' />
            </div>
            <div className="link-line"></div>
            <h3 className='flex items-center justify-end h-10 flex-shrink-0 rounded-none rounded-r-xl text-end  text-customTan text-sm'>{name}</h3>
        </a>
    )
}