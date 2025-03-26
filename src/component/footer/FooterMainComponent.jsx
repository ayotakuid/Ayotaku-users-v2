import AyotakuLogoText from '../../image/ayotaku-logo-text.png';

function FooterMainComponent () {
  const dateFullYear = new Date().getFullYear();

  const timeNow = new Date().getFullYear();
    return (
      <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src={AyotakuLogoText} className="h-16" alt="Ayotaku Logo" />
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Contact</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Website Developer</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2020 - {dateFullYear} <a href="https://flowbite.com/" className="hover:underline">Ayotaku.id™</a>. All Rights Reserved.</span>
        </div>
      </footer>
    );
}

export default FooterMainComponent;