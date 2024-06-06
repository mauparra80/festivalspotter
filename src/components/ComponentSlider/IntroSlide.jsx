

export default function IntroSlide({step, description, img}) {


  return (
    <>
    <h1 className="font-poetsen pb-5">{step}</h1>
    <img src={img} alt="" className='intro-slide-img'/>
    <p className="text-4xl pt-5 font-poetsen">{description}</p>
    </>
  )
}