import AnimeCardHomeComponent from "./card/AnimeCardHomeComponent";

function AnimeHomeComponent() {
  return (
    <div className="grid grid-cols-1 mx-10 my-5 md:mx-20 md:my-10">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-ayotaku-dark rounded-md px-3 py-2 uppercase text-md md:text-lg mb-10">
        {/* Judul */}
        <span className="text-start w-full sm:w-auto">Kumpulan Semua Anime di Ayotaku!</span>

        {/* Search Form */}
        <form className="flex items-center w-full sm:w-auto">
          <label htmlFor="search-anime" className="sr-only">Search</label>
          <div className="relative w-full sm:w-60 md:w-72">
            {/* Ikon Search */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>

            {/* Input Search */}
            <input 
              type="search" 
              id="simple-search" 
              className="bg-ayotaku-super-dark border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              placeholder="Search anime..." 
              required 
            />
          </div>
        </form>
      </div>


      <div className="grid grid-cols-12 my-3 justify-center gap-2">
        <AnimeCardHomeComponent />
      </div>
    </div>
  );
}

export default AnimeHomeComponent;
