function AnimeCardHomeComponent() {
  return (
    <div 
      className='col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-2 gap-1 mb-2 w-auto max-w-xs overflow-hidden group'
    >
      <div className="relative w-full">
        <img 
          src="https://cdn.myanimelist.net/images/anime/1922/134324l.jpg" 
          // alt={items.dataNimes.animes.nama_anime.romanji} 
          className='w-56 rounded-lg object-cover hover:opacity-50 cursor-pointer duration-300'
          loading="lazy"
        />

        <span className="flex items-center absolute top-2 right-2 w-fit bg-black bg-opacity-50 text-ayotaku-text-default px-2 py-1 rounded-md text-ayotaku-text-sm gap-1 group-hover:opacity-70 duration-500">
          <svg className="w-4 h-4 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
          </svg>
          <span className="text-ayotaku-text-default">asd</span>
        </span>

        <span className="flex items-center absolute bottom-2 left-2 w-fit bg-black bg-opacity-50 text-ayotaku-text-default px-2 py-1 rounded-md text-ayotaku-text-sm gap-1 group-hover:opacity-70 duration-500">
          <span className="text-ayotaku-text-default">asd</span>
        </span>
      </div>
              
      <div className="py-1">
        <h3 
          className="text-md font-semibold text-ayotaku-text-default line-clamp-2 group-hover:underline duration-300 cursor-pointer"
        >
          Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san
        </h3>
      </div>
    </div>
  )
}

export default AnimeCardHomeComponent;