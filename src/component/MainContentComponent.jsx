import { useEffect, useState } from 'react';
import { classNames } from 'primereact/utils';
import { toast } from 'sonner';

// IMPORT UTILS FETCHING
import { handlerFetchingRecommendAnime } from '../utils/handler-fetching-animes';
import BackgroundParticle from '../image/particle.jpg';

// IMPORT UTILS SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// IMPORT ICON
import { PlayIcon } from '@heroicons/react/24/solid';

function MainContentComponent() {
  const [isActiveSwiper, setIsActiveSwiper] = useState(0);
  const [isSwiper, setIsSwiper] = useState(null);
  const [isDataRecommend, setIsDataRecommend] = useState(null);
  const [isDataImage] = useState([
    { id: 1, img: 'https://cdn.myanimelist.net/images/anime/1825/142258l.jpg', title: 'Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san' },
    { id: 2, img: 'https://cdn.myanimelist.net/images/anime/1635/145486l.jpg', title: 'Tsue to Tsurugi no Wistoria' },
    { id: 3, img: 'https://cdn.myanimelist.net/images/anime/1904/142675l.jpg', title: 'Make Heroine ga Oosugiru!' },
    { id: 4, img: 'https://cdn.myanimelist.net/images/anime/1164/143459l.jpg', title: 'Shoushimin Series' },
    { id: 5, img: 'https://cdn.myanimelist.net/images/anime/1397/131726l.jpg', title: '2.5-jigen no Ririsa' },
    { id: 6, img: 'https://cdn.myanimelist.net/images/anime/1372/145018l.jpg?', title: 'Ore wa Subete wo "Parry" suru: Gyaku Kanchigai no Sekai Saikyou wa Boukensha ni Naritai' },
    { id: 7, img: 'https://cdn.myanimelist.net/images/anime/1932/142249l.jpg', title: 'Gimai Seikatsu' },
    { id: 8, img: 'https://cdn.myanimelist.net/images/anime/1035/135213l.jpg', title: 'Giji Harem' },
  ]);

  useEffect(() => {
    const fetchRecommendAnime = async () => {
      try {
        const response = await handlerFetchingRecommendAnime(10);
        const newSwipers = response?.data?.recommend?.map((item) => ({
          id: item.slug_anime,
          img: item.edit_img || item.default_img,
          title: item.detail.nama_anime.romanji
        })) || [];

        setIsSwiper(newSwipers); // Update state sekaligus
        setIsDataRecommend(newSwipers.length < 8 ? isDataImage : newSwipers);
      } catch (err) {
        console.error(err);
        toast.error('Terjadi error di recommend Anime!');
      }
    };

    fetchRecommendAnime(); // Panggil fungsi async
  }, [setIsSwiper, setIsDataRecommend]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
      {/* Section with Background (Recommended Anime + Swiper) */}
      <div 
        className="relative w-full"
        style={{ backgroundImage: `url(${BackgroundParticle})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="grid grid-cols-12 gap-4 mb-5">
          <div className="col-span-12">
            <div className="flex items-center justify-center w-full mt-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500">Recommended Anime</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="flex w-full h-52 xs:h-48 md:h-80 lg:h-80">
            <Swiper
                loop={isSwiper?.length >= 5}
                spaceBetween={10}
                centeredSlides={true}
                grabCursor={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  0: {
                    slidesPerView: 1.2,
                  },
                  640: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 3.5,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                  1536: {
                    slidesPerView: 5.2
                  }
                }}
                onSlideChange={(swiper) => 
                  setIsActiveSwiper(swiper.realIndex)
                }
              >
                {
                  isDataRecommend?.map((item, index) => (
                    <SwiperSlide key={item.id} className="relative flex justify-center items-center select-none">
                      <a 
                        href={`anime/detail/${item.id}`} 
                        className='w-full h-full object-cover rounded-2xl'>
                        <img
                          src={item.img}
                          alt=""
                          className={classNames(
                            'w-full h-full object-cover rounded-2xl',
                            // Tambahkan kelas khusus untuk slide di kiri dan kanan dua slide dari slide aktif
                            isActiveSwiper === index
                              ? 'bg-opacity-100' // Slide aktif
                              : (
                                  index === (isActiveSwiper - 2 + isSwiper?.length) % isSwiper?.length ||
                                  index === (isActiveSwiper + 2) % isSwiper?.length
                                )
                                ? 'opacity-40' // Dua slide kiri atau kanan dari yang aktif
                                : 'opacity-65' // Slide lain yang lebih jauh
                          )}
                          referrerPolicy='no-referrer'
                        />
                        <div className={classNames(
                          // Perbaikan logika pengecekan slide aktif
                          isActiveSwiper === index ? 'bg-opacity-10' : 'bg-opacity-50',
                          'absolute bottom-0 left-0 w-full h-full bg-black duration-500 text-white text-center py-2 rounded-2xl',
                          (index === (isActiveSwiper - 2 + isSwiper?.length) % isSwiper?.length || index === (isActiveSwiper + 2) % isSwiper?.length) ? 'bg-opacity-70' : '',
                          (index === (isActiveSwiper - 3 + isSwiper?.length) % isSwiper?.length || index === (isActiveSwiper + 3) % isSwiper?.length) ? 'bg-opacity-80' : '',
                        )}>
                        </div>
                        <div className={classNames(
                          'absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 rounded-b-lg',
                          (index === (isActiveSwiper - 1 + isSwiper?.length) % isSwiper?.length || index === (isActiveSwiper + 1) % isSwiper?.length) ? 'text-opacity-50' : '',
                          (index === (isActiveSwiper - 2 + isSwiper?.length) % isSwiper?.length || index === (isActiveSwiper + 2) % isSwiper?.length) ? 'text-opacity-20' : '',
                          (index === (isActiveSwiper - 3 + isSwiper?.length) % isSwiper?.length || index === (isActiveSwiper + 3) % isSwiper?.length) ? 'text-opacity-10' : '',
                        )}>
                          <span className='block w-full truncate whitespace-nowrap text-sm px-5'>
                            {item.title}
                          </span>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Section Last Updated */}
      <div className="grid grid-cols-12 gap-4 my-10 mx-5">

        <div className="col-span-12">
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">Last Updated</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

        {
          isDataRecommend?.map((item) => (
            <a 
              href="" 
              key={item.id} 
              className='col-span-12 md:col-span-3 gap-1 bg-ayotaku-super-dark text-ayotaku-text-default rounded-lg mb-2'
            >
              <div className='grid grid-cols-12 h-full'>
                <div className='col-span-4'>
                  <img src={item.img} alt={item.title} className='w-36 md:w-40 h-full object-cover rounded-md hover:opacity-50 duration-500' />
                </div>

                <div className='col-span-8 flex flex-col mx-2'>
                  <div className="font-bold mb-2 px-1 pt-2 text-sm md:text-base line-clamp-2 hover:underline">{item.title}</div>
                  <div className="w-full h-px bg-gray-600"></div>
                  <div className='grid grid-cols-1 text-ayotaku-text-xs md:text-ayotaku-text-sm m-2 gap-1'>

                    <div className='col-span-1 flex justify-between items-center'>
                      <div className='flex items-center hover:underline'> 
                        <PlayIcon className='w-4 mr-1'/>
                        <span>Episode 01</span>
                      </div>
                      <span className='text-opacity-40 text-ayotaku-text-default'>21/10/2024</span>
                    </div>

                    <div className='col-span-1 flex justify-between items-center'>
                      <div className='flex items-center hover:underline'> 
                        <PlayIcon className='w-4 mr-1'/>
                        <span>Episode 02</span>
                      </div>
                      <span className='text-opacity-40 text-ayotaku-text-default'>21/10/2024</span>
                    </div>

                    <div className='col-span-1 flex justify-between items-center'>
                      <div className='flex items-center hover:underline'> 
                        <PlayIcon className='w-4 mr-1'/>
                        <span>Episode 03</span>
                      </div>
                      <span className='text-opacity-40 text-ayotaku-text-default'>21/10/2024</span>
                    </div>

                    <div className='col-span-1 flex justify-between items-center'>
                      <div className='flex items-center hover:underline'> 
                        <PlayIcon className='w-4 mr-1'/>
                        <span>Episode 04</span>
                      </div>
                      <span className='text-opacity-40 text-ayotaku-text-default'>21/10/2024</span>
                    </div>

                  </div>
                </div>
              </div>
            </a>
          ))
        }
        
      </div>
    </div>
    </>
  );
}

export default MainContentComponent;
