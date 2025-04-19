import { useParams } from "react-router-dom"
import DialogDetailAnimeComponent from "./card/DialogDetailAnimeComponent";
import { useDialog } from "./utils/DialogContext";

function DetailAnimeComponent() {

  const { slug } = useParams();
  const { showDialog } = useDialog();

  return (
    <>
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="relative w-full h-ayotaku-height">
          {/* Background Image */}
          <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('https://cdn.myanimelist.net/images/anime/1898/143924l.jpg')]"></div>

          {/* Overlay gradient dari transparan ke #bg-ayotaku */}
          <div className="absolute -inset-1 bg-[linear-gradient(to_bottom,rgba(47,48,62,0)_0%,rgba(47,48,62,1)_90%)]"></div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 lg:left-20 lg:translate-x-0 z-10 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-4xl w-full text-white font-extrabold backdrop-blur-sm bg-black/10 rounded-sm p-4 duration-300 transition-all">
            {/* JUDUL ANIME */}
            <h1 className="flex items-center flex-wrap gap-2 text-2xl lg:text-3xl font-bold text-ayotaku-text-default">
              <span className="leading-tight">
                Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san
              </span>
            </h1>

            {/* UNTUK RATING DAN GENRES */}
            <div className="grid grid-cols-1 mt-2">
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-ayotaku-text-xs font-medium px-1.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400 text-center">
                  TV
                </span>
                <div className="flex gap-1 backdrop-blur-lg bg-yellow-300/20 text-ayotaku-text-default px-2 py-1 rounded text-ayotaku-text-xs">
                  <span>7.11</span>
                  <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                  </svg>
                </div>

                <span className="hover:underline text-ayotaku-text-sm cursor-pointer">Comedy</span>
                <span className="hover:underline text-ayotaku-text-sm cursor-pointer">Romance</span>
                <span className="hover:underline text-ayotaku-text-sm cursor-pointer">School</span>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-1">
              <div className="flex-grow border-t border-gray-300 opacity-50"></div>
              <span className="px-1 text-gray-500 text-ayotaku-text-sm opacity-50">Description</span>
              <div className="flex-grow border-t border-gray-300 opacity-50"></div>
            </div>

            {/* INI UNTUK DESKRIPSI */}
            <span className="text-ayotaku-text-sm text-ayotaku-text-default text-opacity-30 line-clamp-3 mt-2">
              Smart, refined, and strikingly gorgeous, half-Russian half-Japanese Alisa Mikhailovna Kujou is considered the idol of her school. With her long silver hair, mesmerizing blue eyes, and exceptionally fair skin, she has captured the hearts of countless male students while being highly admired by all others. Even so, due to her seemingly unapproachable persona, everyone remains wary around the near-flawless girl.

              One of the few exceptions is Alisa benchmate Masachika Kuze, a relatively average boy who spends his days watching anime and playing gacha games. Despite his nonchalant demeanor, Masachika is the sole student to receive Alisa attention. Unable to be fully honest, Alisa is frequently harsh on Masachika and only expresses her affection in Russian. Unbeknownst to her, however, Masachika actually understands the language yet simply pretends otherwise for his own amusement.

              As the odd pair continues to exchange witty and playful remarks, their relationship gradually grows more romantic and delightful—and Alisa might finally learn to freely convey her true feelings.

              [Written by MAL Rewrite]
            </span>
            <button 
              type="button"
              className="text-ayotaku-text-sm text-ayotaku-text-default opacity-90 mt-1 underline cursor-pointer"
              onClick={showDialog}
            >
              View more...
            </button>
          </div>

        </div>
      </div>

      {/* <div className="grid grid-cols-12 my-3">
        <div className="col-span-12 w-full max-w-5xl">
          <iframe 
            src="https://www.youtube.com/embed/AC8V_z5x9mI?enablejsapi=1&wmode=opaque&autoplay=1" 
            className="w-full aspect-video rounded-lg shadow-lg" 
          />
        </div>
      </div> */}

      <div className="flex items-center justify-center w-full mt-1 mb-10">
        <div className="flex-grow border-t border-gray-300 opacity-50"></div>
        <span className="px-1 text-gray-500 text-sm opacity-50">All Episode Anime</span>
        <div className="flex-grow border-t border-gray-300 opacity-50"></div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3 bg-gray-300 text-yellow-300">Episode 1</div>
        <div className="col-span-3 bg-gray-300 text-yellow-300">Episode 2</div>
        <div className="col-span-3 bg-gray-300 text-yellow-300">Episode 3</div>
        <div className="col-span-3 bg-gray-300 text-yellow-300">Episode 4</div>
      </div>

      <DialogDetailAnimeComponent />

    </>

  )
}

export default DetailAnimeComponent;