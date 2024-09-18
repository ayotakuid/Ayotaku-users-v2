import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// IMPORT UTILS SWIPER
import 'swiper/css';
import { useState } from 'react';
import { classNames } from 'primereact/utils';

function MainContentComponent() {
  const [isActiveSwiper, setIsActiveSwiper] = useState(0);
  const [isDataImage] = useState([
    { id: 1, img: 'https://cdn.myanimelist.net/images/anime/1825/142258l.jpg', title: 'Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san' },
    { id: 2, img: 'https://cdn.myanimelist.net/images/anime/1635/145486l.jpg', title: 'Tsue to Tsurugi no Wistoria' },
    { id: 3, img: 'https://cdn.myanimelist.net/images/anime/1904/142675l.jpg', title: 'Make Heroine ga Oosugiru!' },
    { id: 4, img: 'https://cdn.myanimelist.net/images/anime/1164/143459l.jpg', title: 'Shoushimin Series' },
    { id: 5, img: 'https://cdn.myanimelist.net/images/anime/1397/131726l.jpg', title: '2.5-jigen no Ririsa' },
    { id: 6, img: 'https://cdn.myanimelist.net/images/anime/1915/139450l.jpg', title: 'Ore wa Subete wo "Parry" suru: Gyaku Kanchigai no Sekai Saikyou wa Boukensha ni Naritai' },
    { id: 7, img: 'https://cdn.myanimelist.net/images/anime/1932/142249l.jpg', title: 'Gimai Seikatsu' },
    { id: 8, img: 'https://cdn.myanimelist.net/images/anime/1035/135213l.jpg', title: 'Giji Harem' },
  ]);

  return (
    <>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-12'>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">Recommended Anime</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

        <div className='col-span-12'>
          <div className="flex w-full h-52 xs:h-48 md:h-80 lg:h-80">
            <Swiper
              loop={true}
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
                  slidesPerView: 4.5,
                }
              }}
              onSlideChange={(swiper) => 
                setIsActiveSwiper(swiper.realIndex)
              }
            >
              {
                isDataImage?.map((item, index) => (
                  <SwiperSlide key={item.id} className="relative flex justify-center items-center select-none">
                    <img
                      src={item.img}
                      alt=""
                      className={classNames(
                        'w-full h-full object-cover rounded-2xl',
                        // Tambahkan kelas khusus untuk slide di kiri dan kanan dua slide dari slide aktif
                        isActiveSwiper === index
                          ? 'bg-opacity-100' // Slide aktif
                          : (index === (isActiveSwiper - 2 + isDataImage.length) % isDataImage.length ||
                             index === (isActiveSwiper + 2) % isDataImage.length)
                            ? 'opacity-40' // Dua slide kiri atau kanan dari yang aktif
                            : 'opacity-65' // Slide lain yang lebih jauh
                      )}
                      referrerPolicy='no-referrer'
                    />
                    <div className={classNames(
                      // Perbaikan logika pengecekan slide aktif
                      isActiveSwiper === index ? 'bg-opacity-10' : 'bg-opacity-50',
                      'absolute bottom-0 left-0 w-full h-full bg-black duration-500 text-white text-center py-2 rounded-2xl',
                      (index === (isActiveSwiper - 2 + isDataImage.length) % isDataImage.length || index === (isActiveSwiper + 2) % isDataImage.length) ? 'bg-opacity-70' : ''
                    )}>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 rounded-b-lg">
                      <span className='block w-full truncate whitespace-nowrap text-sm px-5'>
                        {item.title} {index}
                      </span>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContentComponent;
