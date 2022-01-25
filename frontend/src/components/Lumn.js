import { useState, useEffect } from "react"

const Lumn = () => {

    const [offsetY, setOffsetY] = useState(0)
    const handleScroll = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    return (
        <>
        <div className='iluminador' style={ { transform : `translateY(${ offsetY * 0.4 }px) translateX(${ offsetY * 0.7 }px) scale(${offsetY > 50 ? 1.2 : 1 })`, transition: "transform 1.5s"} }></div>
        <div className='iluminador2'style={ { transform : `translateY(${ -offsetY * 0.6 }px) translateX(${ -offsetY * 0.4 }px)` } } ></div>
        <div className='iluminador3'style={ { transform : `translateY(${ -offsetY * 0.05 }px) translateX(${ -offsetY * 0.05 }px) scale(${offsetY > 10 ? 1.2 : 0.7 }`, transition: "transform 1.5s" } }></div>
        </>
    )
}

export default Lumn
