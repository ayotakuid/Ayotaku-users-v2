import { useEffect, useState } from "react";
import { handlerFetchingSuggestedAnime } from "../../utils/handler-fetching-animes";
import { toast } from "sonner";

function SuggestedForTodayComponent() {
  const [isSuggestedAnime, setSuggestedAnime] = useState([]);

  useEffect(() => {
    const fetchSuggestedAnime = async () => {
      try {
        const response = await handlerFetchingSuggestedAnime();
        if (response.status === 'error') toast(response);

        setSuggestedAnime(response?.data);
        return;
      } catch (err) {
        toast('Error Load data Suggested Anime!');
        return;
      }
    }

    fetchSuggestedAnime();
  }, [setSuggestedAnime]);

  return (
    <div className="grid grid-cols-12 gap-3 my-10 mx-5 p-2 sm:mx-10 md:mx-20 lg:mx-24">
        <div className="col-span-12">
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">Suggested For Today</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

        {
          isSuggestedAnime?.map((items) => (
            <div 
              key={items.dataNimes.id_anime} 
              className='col-span-6 md:col-span-2 sm:col-span-3 gap-1 mb-2 w-auto max-w-xs overflow-hidden group'
            >
              <img 
                src={items.dataNimes.animes.foto_anime} 
                alt={items.dataNimes.animes.nama_anime.romanji} 
                className='w-72 rounded-lg object-cover hover:opacity-50 cursor-pointer duration-300'
              />
              
              <div className="py-1">
                <h3 
                  className="text-md font-semibold text-ayotaku-text-default line-clamp-2 group-hover:underline duration-300 cursor-pointer"
                >
                  {items.dataNimes.animes.nama_anime.romanji}
                </h3>
              </div>
            </div>
          ))
        }
      </div>
  );
}

export default SuggestedForTodayComponent;