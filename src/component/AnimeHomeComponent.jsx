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
import { templatePaginator } from '../utils/handler-template-paginator';
import { Dropdown } from "primereact/dropdown";
import WarningIconComponent from "./utils/WarningIconComponent";

function AnimeHomeComponent() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(18);
  const [isToggleFilter, setToggleFilter] = useState(false);
  const [isAnimesPagination, setAnimesPagination] = useState([]);
  const [isPagination, setPagination] = useState(null);
  const [isSearchParams, setSearchParams] = useSearchParams();
  const [selectedValueGenres, setSelectedValueGenres] = useState(null);
  const [selectedValueSort, setSelectedValueSort] = useState(null);
  const [isValueSearch, setValueSearch] = useState({
    search: ''
  });
  const [isValueGenres] = useState(listGenre());
  const [isValueSort] = useState(listSortBy());

  const navigate = useNavigate();

  const fetchAnimesPagination = async () => {
    try {
      const page = isSearchParams.get('page') ?? 1;
      const sort = isSearchParams.get('sort') || null;
      const genresRaw = isSearchParams.get('genres') || '';
      const genres = genresRaw ? genresRaw.split(',') : [];
      const search = isSearchParams.get('search') || '';
  
      const limit = 18;
      const response = await handlerFetchingAnimesPagination({ page, limit, sort, genres, search });
  
      if (response?.data.length === 0) {
        toast.success('Anime yang dicari tidak ada!', {
          duration: 3000,
          icon: <WarningIconComponent />,
          position: 'bottom-right',
        });

        setTimeout(() => {
          setSelectedValueGenres(null);
          setSelectedValueSort(null);
          setValueSearch((prev) => ({ search: '' }));
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
  };
  

  useEffect(() => {
    fetchAnimesPagination();
  }, [setAnimesPagination, isSearchParams]);

  useEffect(() => {
    const pageFromQuery = isSearchParams.get('page');
    const sortFromQuery = isSearchParams.get('sort');
    const genresFromQuery = isSearchParams.get('genres');

    if (pageFromQuery) {
      setFirst((pageFromQuery - 1) * rows);
    }

    if (sortFromQuery) {
      setSelectedValueSort(sortFromQuery);
    }

    if (genresFromQuery) {
      setSelectedValueGenres(genresFromQuery.split(',').map((text) => text.charAt(0).toUpperCase() + text.slice(1)));
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

  const toggleFilter = (filterType) => {
    if (filterType === 'close') {
      setToggleFilter(false);
    } else {
      setToggleFilter(filterType === 'genre');
    }
  }
  
  const onClickApplyFilter = () => {
    const params = new URLSearchParams(isSearchParams);
    params.set('page', '1'); // reset ke halaman 1 saat filter berubah
  
    if (selectedValueSort) {
      const value = selectedValueSort.toString().toLowerCase();
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
  
    if (selectedValueGenres && selectedValueGenres.length > 0) {
      const value = selectedValueGenres.map((g) => g.toLowerCase()).join(',');
      params.set('genres', value);
    } else {
      params.delete('genres');
    }
  
    setSearchParams(params); // ini akan trigger useEffect
  };

  const oncClickClearFilter = () => {
    setSelectedValueGenres(null)
    setSelectedValueSort(null);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', '1');
      newParams.delete('genres');
      newParams.delete('sort');

      return newParams;
    });
  }

  const onSubmitSearchAnime = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(isSearchParams);
    newParams.set('page', '1');
  
    if (isValueSearch.search.length === 0) {
      toast.error('Harus lebih dari 3 Karakter/Huruf');
      newParams.delete('search');
      setSearchParams(newParams);
      return;
    }
  
    if (isValueSearch.search.length < 3) {
      toast.warning('Harus lebih dari 3 Karakter/Huruf');
      return;
    }
  
    newParams.set('search', isValueSearch.search.toLowerCase());
    setSearchParams(newParams);
  };
  

  const onChangeSearchAnime = (e) => {
    const { name, value } = e.target;

    setValueSearch((prev) => ({
      ...prev,
      [name]: value,
    }));

    return
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
            <form 
              className="flex items-center w-full sm:w-auto"
              onSubmit={onSubmitSearchAnime}
            >
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
                  name="search"
                  value={isValueSearch.search}
                  className="bg-ayotaku-super-dark border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                  placeholder="Search anime..." 
                  onChange={onChangeSearchAnime}
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
                    optionValue="name"
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
                    optionValue="value"
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
                  type="button"
                  className="bg-ayotaku-dark hover:bg-ayotaku-box duration-500 transition-all px-2 py-1 rounded-md text-ayotaku-text-sm active:scale-50 cursor-pointer"
                  onClick={onClickApplyFilter}
                >
                  Apply Filter
                </button>
                <button 
                  type="button"
                  className="hover:underline duration-500 transition-all px-2 py-1 rounded-md text-ayotaku-text-sm active:scale-50 cursor-pointer"
                  onClick={oncClickClearFilter}
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
