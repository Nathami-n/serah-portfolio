import {Hero} from './'
const Home = ({children}) => {
  return (
   <main className="flex bg-primary  min-h-screen">
    {children}
    <Hero/>
   </main>
  )
}

export default Home