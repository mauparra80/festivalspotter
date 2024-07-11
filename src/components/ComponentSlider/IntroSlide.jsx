

export default function IntroSlide({step, description, img}) {


  return (
    <>
    <h1 className="font-poetsen pb-5">{step}</h1>
    <img src={img} alt="" className='intro-slide-img'/>
    <p className="pt-5">{description}</p>
    </>
  )
}