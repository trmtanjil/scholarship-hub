import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const StudentSay = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      quote:
        "Scholarships.com was an incredibly useful tool for finding scholarship opportunities. Sometimes, the hardest part about getting scholarships was knowing which ones you could even apply to. Scholarships.com allowed me to quickly find and filter scholarships by major, grade level, and interests.",
      name: "Agneya T.",
      scholarship: "Coca-Cola Scholarship - $20,000",
      image: "https://i.ibb.co/FHzBQp3/student1.jpg",
    },
    {
      id: 2,
      rating: 5,
      quote:
        "There were so many scholarships online that it felt overwhelming, but Scholarships.com made it easier. Their helpful filters narrowed things down and showed me the ones I actually qualified for. It's the best site I've used for finding scholarships that truly fit me.",
      name: "Imanga L.",
      scholarship: "Amazon Future Engineer Scholarship - $40,000",
      image: "https://i.ibb.co/Ch4rdh0/student2.jpg",
    },
    {
      id: 3,
      rating: 5,
      quote:
        "I've had a great experience using Scholarships.com as it is easy to use and has tons of scholarships that match your profile. The qualifications and summaries for each scholarship are expressed clearly. I also like how there are monthly scholarships that are easy to apply to.",
      name: "Mara T.",
      scholarship: "Kiwanis Club Scholarship - $7,000",
      image: "https://i.ibb.co/SNw4HpB/student3.jpg",
    }
  ];

  const renderStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span>
      ));
  };

  return (
    <div className="py-16 px-4  ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12  ">What Students Say</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Student Image */}
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4 flex justify-center">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-600 italic mb-6 flex-grow text-center px-2">
                  "{testimonial.quote}"
                </blockquote>

                {/* Name and Scholarship */}
                <div className="mt-auto text-center">
                  <p className="font-semibold text-gray-800 text-lg">{testimonial.name}</p>
                  <p className="text-blue-600 font-medium">{testimonial.scholarship}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentSay;
