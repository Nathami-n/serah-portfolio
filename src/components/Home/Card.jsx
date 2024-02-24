import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

const Card = ({ img: { imgSrc, description,hash } }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  return (
    <div className="group relative max-md:h-[300px] max-md:w-[300px] md:h-[400px] md:w-[400px] overflow-hidden bg-neutral-200">
      <div className="absolute inset-0 z-0 transition-transform duration-600 group-hover:scale-110 ">

        {
          isLoaded ? (<img src={imgSrc} className="object-cover h-full w-full" />) : (
            <Blurhash 
            width={300}
            height={300}
            hash={`${hash}`}
            punch={1}
            />
          )
        }
      </div>
      <div className="absolute inset-0 z-10 grid place-content-center ">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8  max-md:text-2xl md:text-4xl font-black uppercase text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
