// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function UpcomingFeaturedMovies() {
//   const [movies] = useState([
//     {
//       id: 1,
//       title: "Project K",
//       genre: "Action/Sci-Fi",
//       release_date: "2025-12-21",
//       poster: "https://feeds.abplive.com/onecms/images/uploaded-images/2023/07/20/dce463ea26f0db1d347c66278bb81bba1689874782545597_original.jpg",
//     },
//      {
//       id: 3,
//       title: "Telusu Kada",
//       genre: "Romantic Drama",
//       release_date: "2025-10-17",
//       poster: "https://tse3.mm.bing.net/th/id/OIP.T92zPY-GVAvt-82xzxxUIQHaKs?cb=12&pid=Api",
//     },
//     {
//       id: 4,
//       title: "Diesel",
//       genre: "Action Thriller",
//       release_date: "2025-10-17",
//       poster: "https://tse2.mm.bing.net/th/id/OIP.R__djFqh3euJ3U-H_2o9eAHaFF?cb=12&pid=Api",
//     },
//     {
//       id: 5,
//       title: "Mithra Mandali",
//       genre: "Drama",
//       release_date: "2025-10-16",
//       poster: "https://tse2.mm.bing.net/th/id/OIP.XjxuU6eKs9zJCJhlVBA2SgHaLH?cb=12&pid=Api",
//     },
//     {
//       id: 6,
//       title: "Garividi Lakshmi",
//       genre: "Family Drama",
//       release_date: "2025-10-17",
//       poster: "https://tse4.mm.bing.net/th/id/OIP.BjXHQ4xERqKBNaTa6najbwHaFj?cb=12&pid=Api",
//     },
  
//     {
//       id: 8,
//       title: "Champion",
//       genre: "Youth & Family",
//       release_date: "2025-10-28",
//       poster: "https://tse2.mm.bing.net/th/id/OIP.77HpAjbdJhGslndrIlpaUgAAAA?cb=12&pid=Api",
//     },
//     {
//       id: 4,
//       title: "Mega Star’s Next",
//       genre: "Action/Drama",
//       release_date: "2026-02-05",
//       poster: "https://assets-in.bmscdn.com/discovery-catalog/events/et00457184-sayuqeymvg-landscape.jpg",
//     },
//     {
//       id: 5,
//       title: "Devara 2",
//       genre: "Action/Drama",
//       release_date: "2026-03-20",
//       poster: "https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2025-09/devara_2.jpg?VersionId=kU2U2V5aWYYqpgIaTcOmW39Q9CIRypLs",
//     },
   
//   ]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     responsive: [
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//       { breakpoint: 992, settings: { slidesToShow: 2 } },
//     ],
//   };

//   return (
//     <div className="mb-5">
//       <h2 className="mb-3">🎬 Upcoming Movies</h2>
//       <Slider {...settings}>
//         {movies.map((m) => (
//           <div key={m.id} className="px-2">
//             <div className="card shadow">
//               <img
//                 src={m.poster}
//                 alt={m.title}
//                 className="card-img-top"
//                 style={{ height: "300px", objectFit: "cover" }}
//               />
//               <div className="card-body text-center">
//                 <h5 className="card-title">{m.title}</h5>
//                 <p className="mb-0">{m.genre} • {m.release_date}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Upcoming.css";

export default function UpcomingFeaturedMovies() {
  const [movies] = useState([
    {
      id: "m1",
      title: "Project K",
      genre: "Action/Sci-Fi",
      release_date: "2025-12-21",
      poster:
        "https://feeds.abplive.com/onecms/images/uploaded-images/2023/07/20/dce463ea26f0db1d347c66278bb81bba1689874782545597_original.jpg",
    },
    {
      id: "m2",
      title: "Telusu Kada",
      genre: "Romantic Drama",
      release_date: "2025-10-17",
      poster:
        "https://tse3.mm.bing.net/th/id/OIP.T92zPY-GVAvt-82xzxxUIQHaKs?cb=12&pid=Api",
    },
    {
      id: "m3",
      title: "Diesel",
      genre: "Action Thriller",
      release_date: "2025-10-17",
      poster:
        "https://tse2.mm.bing.net/th/id/OIP.R__djFqh3euJ3U-H_2o9eAHaFF?cb=12&pid=Api",
    },
    {
      id: "m4",
      title: "Mithra Mandali",
      genre: "Drama",
      release_date: "2025-10-16",
      poster:
        "https://tse2.mm.bing.net/th/id/OIP.XjxuU6eKs9zJCJhlVBA2SgHaLH?cb=12&pid=Api",
    },
    {
      id: "m5",
      title: "Garividi Lakshmi",
      genre: "Family Drama",
      release_date: "2025-10-17",
      poster:
        "https://tse4.mm.bing.net/th/id/OIP.BjXHQ4xERqKBNaTa6najbwHaFj?cb=12&pid=Api",
    },
    {
      id: "m6",
      title: "Champion",
      genre: "Youth & Family",
      release_date: "2025-10-28",
      poster:
        "https://tse2.mm.bing.net/th/id/OIP.77HpAjbdJhGslndrIlpaUgAAAA?cb=12&pid=Api",
    },
    {
      id: "m7",
      title: "Mega Star’s Next",
      genre: "Action/Drama",
      release_date: "2026-02-05",
      poster:
        "https://assets-in.bmscdn.com/discovery-catalog/events/et00457184-sayuqeymvg-landscape.jpg",
    },
    {
      id: "m8",
      title: "Devara 2",
      genre: "Action/Drama",
      release_date: "2026-03-20",
      poster:
        "https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2025-09/devara_2.jpg?VersionId=kU2U2V5aWYYqpgIaTcOmW39Q9CIRypLs",
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      console.log("Viewport width:", window.innerWidth);
    };
    console.log("Movies list (line by line):");
    movies.forEach((m) => console.log(`${m.id} | ${m.title} | ${m.genre} | ${m.release_date}`));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [movies]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    adaptiveHeight: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, centerMode: false },
      },
    ],
  };

  return (
    <div className="upcoming-wrapper">
      <h2 className="section-title">🎬 Upcoming Movies</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map((m) => (
            <div key={m.id} className="slide-item">
              <article className="movie-card">
                <div className="image-wrap">
                  <img src={m.poster} alt={m.title} loading="lazy" />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{m.title}</h3>
                  <p className="movie-meta">
                    {m.genre} • <span className="release">{m.release_date}</span>
                  </p>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}




