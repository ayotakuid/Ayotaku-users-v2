function SuggestedForTodayComponent() {
  const items = [
    { id: 1, imgSrc: 'https://cdn.myanimelist.net/images/anime/1766/130895l.jpg', text: 'Anime terbaik sepanjang sejarah' },
    { id: 2, imgSrc: 'https://cdn.myanimelist.net/images/anime/1766/130895l.jpg', text: 'Anime terbaik sepanjang sejarah' },
    { id: 3, imgSrc: 'https://cdn.myanimelist.net/images/anime/1766/130895l.jpg', text: 'Anime terbaik sepanjang sejarah' },
    { id: 4, imgSrc: 'https://cdn.myanimelist.net/images/anime/1766/130895l.jpg', text: 'Anime terbaik sepanjang sejarah' },
    { id: 5, imgSrc: 'https://cdn.myanimelist.net/images/anime/1766/130895l.jpg', text: 'Anime terbaik sepanjang sejarah' },
    { id: 6, imgSrc: 'https://cdn.myanimelist.net/images/anime/1766/130895l.jpg', text: 'Anime terbaik sepanjang sejarah' },
  ];
  return (
    <div className="grid grid-cols-12 gap-4 my-10 mx-5 sm:mx-10 md:mx-20 lg:mx-24">
        <div className="col-span-12">
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">Suggested For Today</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

        {
          items.map((items) => (
            <div 
              key={items.id} 
              className='col-span-6 md:col-span-2 sm:col-span-3 gap-1 mb-2 w-full max-w-xs overflow-hidden group'
            >
              <img 
                src={items.imgSrc} 
                alt={items.text} 
                className='w-72 rounded-lg object-cover hover:opacity-50 cursor-pointer duration-300'
              />
              
              <div className="py-1">
                <h3 
                  className="text-md font-semibold text-ayotaku-text-default line-clamp-2 group-hover:underline duration-300 cursor-pointer"
                >
                  {items.text}
                </h3>
              </div>
            </div>
          ))
        }
      </div>
  );
}

export default SuggestedForTodayComponent;