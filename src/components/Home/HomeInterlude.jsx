import {Awards} from "./"


const HomeInterlude = () => {
  return (
   <div className="bg-neutral-950 ">
    <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span> </div>
    <Awards/>
    <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
   </div>
  )
}

export default HomeInterlude
