import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SlideShow() {
  const imageSlide = [
    { src: "https://i.redd.it/o96asqovzgi51.jpg", alt: "slide-01" },
    { src: "https://i.pinimg.com/originals/eb/f0/02/ebf002d6348c3ae432649da4418fce40.jpg", alt: "slide-02" },
    { src: "https://i.pinimg.com/originals/75/3e/06/753e06a334827050387782e1990730cd.jpg", alt: "slide-03" },
    { src: "https://wallpapercave.com/wp/wp2118371.jpg", alt: "slide-04" },
  ];

  return (
    <Swiper
      loop={true}
      modules={[Navigation, Pagination, Autoplay, Scrollbar]}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="select-none swiper-custom rounded-lg bg-transparent shadow-lg object-cover object-center"
    >
      {imageSlide &&
        imageSlide.map((el, index) => (
          <SwiperSlide key={index + 1}>
            <img
              src={el.src}
              alt={el.alt}
              loading="lazy"
              className="w-full max-h-[350px] rounded-lg object-cover object-center"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
