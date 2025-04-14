import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";

export const templatePaginator = {
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