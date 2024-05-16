import { home } from "../constant";
const Home = () => {
  return (
    <div className={`relative bg-[url("../assets/home.jpg")] min-h-[85vh] bg-center bg-no-repeat bg-cover max-w-[screen]`}>
      <div className="absolute inset-0 bg-black bg-opacity-45 mix-blend-overlay"/>
        < h1 className="text-4xl font-bold text-white text-center pt-16" > Welcome Home! Anywhere you roam < br /> Stay in the moment.Make make your memories</h1 >
    </div>
  )
}

export default Home;