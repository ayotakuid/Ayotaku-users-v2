import { useState } from 'react';
import { listGenre } from '../utils/handler-tools';

function GenreHomeComponent() {

  const [isGenres] = useState(listGenre());

  return (
    <div className="grid grid-cols-1 mx-10 my-5 md:mx-20 md:my-10">
      <div className="flex flex-wrap bg-ayotaku-dark rounded-md px-3 py-2 uppercase text-md md:text-lg mb-10">
        <div className="w-full sm:w-auto mx-2">
          <span>Kumpulan Semua Genres Anime di Ayotaku!</span>
        </div>
      </div>

      <div className="grid grid-cols-12 my-3 gap-3">
        {
          isGenres?.map((item, index) => (
            <a 
              key={index}
              className="col-span-6 md:col-span-3 lg:col-span-2 relative rounded-md text-center w-full overflow-hidden group"
              href={`/anime?genres=${item.name.toLowerCase()}`}
            >
              <div className="absolute inset-0 bg-ayotaku-genres bg-cover bg-center bg-no-repeat opacity-30 group-hover:opacity-60 transition duration-300"></div>
              
              <div className="relative z-10 flex items-center justify-center h-full text-white px-4 py-2 font-bold text-lg line-clamp-1">
                {item.name}
              </div>
            </a>
          ))
        }
      </div>

    </div>
  )
}

export default GenreHomeComponent;
