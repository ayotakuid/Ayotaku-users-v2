import { useEffect, useState } from "react";
import AnimeCardHomeComponent from "./card/AnimeCardHomeComponent";
import { handlerFetchingAnimesPagination } from "../utils/handler-fetching-animes";
import { listGenre, listSortBy } from '../utils/handler-tools';
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { Tooltip } from "primereact/tooltip";
import { MultiSelect } from "primereact/multiselect";
import { Tailwind, TRANSITIONS } from '../utils/handler-theming-multiselect';
import { TailwindDropdown} from '../utils/handler-theming-dropdown';
import { Dropdown } from "primereact/dropdown";

function AnimeHomeComponent() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(18);
  const [isToggleFilter, setToggleFilter] = useState(false);
  const [isAnimesPagination, setAnimesPagination] = useState([]);
  const [isPagination, setPagination] = useState(null);
  const [isSearchParams, setSearchParams] = useSearchParams();
  const [selectedValueGenres, setSelectedValueGenres] = useState(null);
  const [selectedValueSort, setSelectedValueSort] = useState(null);
  const [isValueGenres] = useState(listGenre());
  const [isValueSort] = useState(listSortBy());

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
    FirstPageLink: (options) => {
      return (
        <button type="button" className={classNames(
          options.className,
          'hover:bg-ayotaku-normal-dark rounded-md py-5 transition duration-500 mx-0.5 text-ayotaku-text-default min-w-8 h-8 sm:min-w-8 sm:h-8',
        )} onClick={options.onClick}>
            <svg className="w-8 h-8 text-ayotaku-text-default" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
            </svg>

            <Ripple />
        </button>
      )
    },
    LastPageLink: (options) => {
      return (
        <button type="button" className={classNames(
          options.className,
          'hover:bg-ayotaku-normal-dark rounded-md py-5 transition duration-500 mx-0.5 text-ayotaku-text-default min-w-8 h-8 sm:min-w-8 sm:h-8',
        )} onClick={options.onClick}>
            <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
            </svg>

            <Ripple />
        </button>
      )
    },
    PrevPageLink: (options) => {
      return (
        <button type="button" className={classNames(
          options.className,
          'hover:bg-ayotaku-normal-dark rounded-md transition duration-500 mx-0.5 text-ayotaku-text-default min-w-8 h-8 sm:min-w-8 sm:h-8',
        )} onClick={options.onClick}>
            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>

            <Ripple />
        </button>
      )
    },
    NextPageLink: (options) => {
      return (
        <button type="button" className={classNames(
          options.className,
          'hover:bg-ayotaku-normal-dark rounded-md transition duration-500 mx-0.5 text-ayotaku-text-default min-w-8 h-8 sm:min-w-8 sm:h-8',
        )} onClick={options.onClick}>
            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
            </svg>

            <Ripple />
        </button>
      )
    },
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
              'hover:bg-ayotaku-normal-dark rounded-md transition duration-500 mx-0.5 text-ayotaku-text-default min-w-8 h-8 sm:min-w-8 sm:h-8',
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

  const toggleFilter = (filterType) => {
    if (filterType === 'close') {
      setToggleFilter(false);
    } else {
      setToggleFilter(filterType === 'genre');
    }
  }

  return (
    <div className="grid grid-cols-1 mx-10 my-5 md:mx-20 md:my-10">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-ayotaku-dark rounded-md px-3 py-2 uppercase text-md md:text-lg mb-10">
        {/* Judul */}
        <div>
          <span className="text-start w-full sm:w-auto mx-2">Kumpulan Semua Anime di Ayotaku!</span>
        </div>

        {/* Search Form */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 relative">

          <div className="flex flex-nowrap">
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

            <div>
              <Tooltip target=".filter-button" content="Filter & Sort" className="text-ayotaku-text-sm px-0 py-1" />
              <button 
                type="button" 
                className="text-white bg-ayotaku-super-dark font-medium rounded-lg text-sm text-center px-3 py-2 inline-flex items-center me-2 hover:bg-ayotaku-normal-dark duration-500 mx-2 my-2 transition-all active:scale-50 cursor-pointer filter-button"
                data-pr-position="top"
                onClick={() => toggleFilter('genre')}
              >
              <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
              </svg>

                <span className="sr-only">Filter & Sort</span>
              </button>
            </div>
          </div>

          <div 
            className={
              classNames(
                isToggleFilter ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-5 opacity-0 pointer-events-none",
                "absolute text-ayotaku-text-sm top-full right-2 mt-2 bg-ayotaku-super-dark border border-gray-700 text-white py-2 px-3 rounded-lg shadow-lg min-w-full z-50 normal-case overflow-y-auto transition-all duration-300"
              )
            }
          >
            <div className="flex flex-wrap justify-between my-2">
              <span className="text-start text-lg">Filter & Sort</span>
              <span 
                className="text-end"
                onClick={() => toggleFilter('close')}
              >
                <i className="pi pi-times rounded-full duration-300 p-1.5 hover:bg-adultdesu-navbartext cursor-pointer active:scale-75"></i>
              </span>
            </div>

            <div className="grid grid-cols-12 mt-5 mb-2">
              <div className="col-span-12">
                <span className="text-base text-ayotaku-text-default px-1">Genres</span>
                <div className="card flex justify-center">
                  <MultiSelect 
                    value={selectedValueGenres} 
                    onChange={(e) => setSelectedValueGenres(e.value)} 
                    options={isValueGenres} 
                    optionLabel="name" 
                    filter 
                    placeholder="Select Genres" 
                    maxSelectedLabels={5} 
                    className="w-full md:w-20rem text-ayotaku-text-sm p-0"
                    display="chip"
                    pt={Tailwind.multiselect}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-5 mb-2">
              <div className="col-span-12">
                <span className="text-base text-ayotaku-text-default px-1">Sort by</span>
                <div className="card flex justify-start w-full">
                  <Dropdown 
                    value={selectedValueSort}
                    onChange={(e) => setSelectedValueSort(e.value)}
                    options={isValueSort}
                    optionLabel="name"
                    placeholder="Select Sorting"
                    checkmark={true}
                    highlightOnSelect={false}
                    showClear
                    pt={TailwindDropdown.dropdown}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-5 mb-2">
              <div className="col-span-12 flex gap-2">
                <button 
                  className="bg-ayotaku-dark hover:bg-ayotaku-box duration-500 transition-all px-2 py-1 rounded-md text-ayotaku-text-sm"
                >
                  Apply Filter
                </button>
                <button 
                  className="hover:underline duration-500 transition-all px-2 py-1 rounded-md text-ayotaku-text-sm"
                >
                  Clear Filter
                </button>
              </div>
            </div>

          </div>
        </div>
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
