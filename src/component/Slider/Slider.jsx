"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Image from "next/image";

const Slider = () => {
  const images = [
    {
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733112136/Porcelain_Dinnerware_GoDaddy_Store_Image_gxyleg.png",
    },
    {
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733112995/2_fukjgs.webp",
    },
    {
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733113069/3_lu2vzp.webp",
    },
  ];
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      loop={true}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={image.image}
            alt={`image` + (idx + 1)}
            width={1600}
            height={900}
            className="w-full cursor-pointer h-[25vh] md:max-h-[300px] md:h-auto lg:max-h-[400px] xl:max-h-[500px] 2xl:max-h-[600px] rounded-lg object-contain md:object-cover lg:object-fill md:object-right"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
