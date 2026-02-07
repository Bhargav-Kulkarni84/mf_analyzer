export default function FundImage({index,link}){

    return(
            <div className='flex flex-row relative'>
                <div className='absolute left-5 top-2 text-white bg-black rounded-full h-8 w-8 text-center'>{index}</div>
                <img className="object-contain rounded-full" src={link} alt="" />
            </div>
    )
    
}