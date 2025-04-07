import { useEffect, useState } from "react";
import AnimeCardHomeComponent from "./card/AnimeCardHomeComponent";
import { handlerFetchingAnimesPagination } from "../utils/handler-fetching-animes";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";

function AnimeHomeComponent() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(18);
  const [isAnimesPagination, setAnimesPagination] = useState([]);
  const [isPagination, setPagination] = useState(null);
  const [isSearchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const fetchAnimesPagination = async () => {
    try {
      const page = isSearchParams.get('page') ?? 1;
      const limit = 18;
      const response = await handlerFetchingAnimesPagination({ page: page, limit: limit });

      if (response?.data.length === 0) {
        toast.error('Data Anime Kosong!');
        setTimeout(() => {
          navigate('/anime?page=1');
        }, 500);
        return;
      }

      setAnimesPagination(response?.data);
      setPagination(response?.pagination);
    } catch (err) {
      console.error(err);
      toast.error('Error Load data Anime!');
    }
  }

  useEffect(() => {
    fetchAnimesPagination();
  }, [setAnimesPagination, isSearchParams]);

  useEffect(() => {
    const pageFromQuery = isSearchParams.get('page');
    if (pageFromQuery) {
      setFirst((pageFromQuery - 1) * rows);
    }
  }, [isSearchParams, rows])

  const onPageChange = (event) => {
    isSearchParams.set('page', event.page + 1);
    setSearchParams(isSearchParams);
    setFirst(event.first);
    setRows(event.rows);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300)
  }

  const templatePaginator = {
    layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink', //INI UNTUK MENENTUKAN APA AJA YANG ADA DI DALAM TEMPLATENYA DAN SETIAP TEMPLATE BISA DI GANTI SEPERTI DIBAWAH INI
    PageLinks: (options) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });

            return (
                <span className={className} style={{ userSelect: 'none' }}>
                    ...
                </span>
            );
        }

        const isActive = options.page === options.currentPage;

        return (
            <button type="button" className={classNames(
              options.className,
              'hover:bg-ayotaku-normal-dark rounded-md transition duration-500 mx-0.5 text-ayotaku-text-default',
              {
                'bg-ayotaku-dark': isActive,
              }
            )} onClick={options.onClick}>
                {options.page + 1}
                <Ripple />
            </button>
        );
    },
  };

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


      <div className="grid grid-cols-12 my-3 justify-center gap-4">
        <AnimeCardHomeComponent 
          animes={isAnimesPagination}
        />
      </div>

      <div className="grid grid-cols-1 justify-center">
        <Paginator 
          template={templatePaginator}
          first={first}
          rows={rows}
          totalRecords={isPagination?.totalData}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AnimeHomeComponent;
