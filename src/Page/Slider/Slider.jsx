import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { 
  AttentionSeeker, 
  Fade, 
  Slide, 
  Zoom 
} from 'react-awesome-reveal';

function Slider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const slideData = [
  {
    id: 1,
    image: "https://i.ibb.co/dwfc1SbC/sco3.jpg",
    subtitle: "Start Your Scholarship Journey",
    title: "Find Your Ideal Scholarship Today",
    description: "Discover national and international scholarships that match your goals. Apply with ease and secure your academic future.",
    button1: "Browse Scholarships",
    button2: "Apply Now"
  },
  {
    id: 2,
    image: "https://i.ibb.co/1J4LsH3C/scho1.jpg",
    subtitle: "Opportunities That Fit Your Goals",
    title: "Scholarships for Every Student",
    description: "From undergraduate to postgraduate programs – explore verified scholarships across various universities and countries.",
    button1: "Explore Opportunities",
    button2: "Get Started"
  },
  {
    id: 3,
    image: "https://i.ibb.co/wFccNV4p/scho2.jpg",
    subtitle: "Apply Instantly, Study Confidently",
    title: "Secure Your Funding Today",
    description: "Apply to scholarships with simplified steps. Our platform ensures transparency, real-time updates, and expert guidance.",
    button1: "Learn More",
    button2: "Sign Up Free"
  }
];

  // Setup navigation once swiperInstance is set and refs are ready
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy(); // destroy old navigation
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="w-full h-screen relative group">
      {/* Custom arrows */}
      <button
        ref={prevRef}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/80 hover:bg-black p-3 rounded-full shadow-lg hover:scale-110"
      >
        <FaArrowLeft size={24} />
      </button>
      <button
        ref={nextRef}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/80 hover:bg-black p-3 rounded-full shadow-lg hover:scale-110"
      >
        <FaArrowRight size={24} />
      </button>

      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination]}
        onSwiper={setSwiperInstance}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1000}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 z-0"></div>
              <img
                src={slide.image}
                alt={`Slide ${slide.id} - ${slide.title}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-0 text-center max-w-4xl mx-auto z-10">
                <Fade delay={200} duration={800}>
                  <p className="text-lg md:text-xl text-white/90 mb-2 font-medium">
                    {slide.subtitle}
                  </p>
                </Fade>
                <AttentionSeeker effect="bounce" delay={300}>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                </AttentionSeeker>
                <Slide delay={400} duration={1000}>
                  <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
                    {slide.description}
                  </p>
                </Slide>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Zoom delay={500} duration={800}>
                    <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-shadow duration-300 shadow-lg hover:shadow-xl">
                      {slide.button1}
                    </button>
                  </Zoom>
                  <Zoom delay={600} duration={800}>
                    <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-shadow duration-300 shadow-lg hover:shadow-xl">
                      {slide.button2}
                    </button>
                  </Zoom>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
