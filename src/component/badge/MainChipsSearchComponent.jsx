import { memo } from "react";
import ChipsFilterComponent from "../utils/ChipsFilterComponent";
import { useSearch } from "../utils/SearchProvider";

function MainChipsSearchComponent({ search, setSearchParams }) {

  const { isValueSearch, setValueSearch } = useSearch();

  if (!search) return null;

  const onClickButtonRemove = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('search');

      return newParams;
    });
    setValueSearch({
      ...isValueSearch,
      search: '',
    });
  }

  return (
    <ChipsFilterComponent text={`Search: ${search.charAt(0).toUpperCase() + search.slice(1)}`}>
      <button 
        type="button" 
        className="inline-flex items-center p-1 ms-2 text-sm text-ayotaku-text-default bg-transparent rounded-xs hover:bg-ayotaku-super-dark rounded-sm" 
        data-dismiss-target="#badge-dismiss-default" 
        aria-label="Remove"
        onClick={onClickButtonRemove}
      >
        <svg className="w-2 h-2 text-ayotaku-text-default" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Remove badge</span>
      </button>
    </ChipsFilterComponent>
  )
}

export default memo(MainChipsSearchComponent);