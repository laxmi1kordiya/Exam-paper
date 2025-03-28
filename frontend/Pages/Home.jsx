import React from "react";

const Home = () => {
  return (
    <section className="hero hero-lead pb-50" id="hero">
      <div className="hero-cotainer">
        <div className="hero-bg">
          <img 
            src="https://360exams.in/web/images/background/bg-hero.svg" 
            alt="Background Image"
          />
        </div>
        <div className="Homecontainer">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="hero-content">
                {/* Commented out code preserved */}
                {/* <h4 style={{lineHeight: 1.1}}>Best Innovative Startup of the Year in Asia by IOA</h4> */}
                <h4 style={{lineHeight: 1.1}}>Generate Exams Papers for GSEB,CBSE Board</h4>
                {/* <img 
                  className="logo logo-dark img-fluid" 
                  src="https://360exams.in/images/iconofaisa-removebg-preview.png" 
                  alt="360Exam Logo" 
                /> */}
                <div className="card-alert">
                  <a 
                    className="btn" 
                    href="https://play.google.com/store/apps/details?id=com.exams360"
                  >
                    update
                  </a>
                  <span className="body">Apps update is available now</span>
                </div>
                {/* <h1 className="hero-headline" style={{fontSize: '30px'}}>Generate Exams Papers for GSEB,CBSE Board.</h1> */}
                <p className="hero-bio">
                  The 360Exams Provide users to generate exam paper with many plans. 
                  content should provide by 360Exams. you can register as Teacher , 
                  School , Student and Classes.
                </p>
                <div className="hero-action">
                  <a 
                    className="btn btn--primary" 
                    target="_blank" 
                    href="https://play.google.com/store/apps/details?id=com.exams360"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="28.114" 
                      height="31.16" 
                      viewBox="0 0 28.114 31.16"
                    >
                      <path 
                        id="app" 
                        d="M37.384,12.606,16.12.451A3.425,3.425,0,0,0,11,3.425V27.734a3.425,3.425,0,0,0,5.125,2.974L37.383,18.554a3.425,3.425,0,0,0,0-5.948ZM28.17,9.732,25.25,13.8,18.267,4.071ZM14.286,29.071a1.336,1.336,0,0,1-.542-.17,1.352,1.352,0,0,1-.671-1.166V3.425a1.342,1.342,0,0,1,1.212-1.339L23.971,15.58Zm3.98-1.982,6.983-9.728,2.92,4.067ZM36.353,16.75l-6.37,3.641L26.529,15.58l3.454-4.811,6.37,3.641a1.348,1.348,0,0,1,0,2.34Z" 
                        transform="translate(-10.995)"
                      />
                    </svg>
                    <span>download</span>
                  </a>
                  <a 
                    className="btn-video popup-video" 
                    href="https://www.youtube.com/watch?v=mukWYi4-KOg"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="22" 
                      height="29" 
                      viewBox="0 0 22 29"
                    >
                      <path 
                        id="Polygon_3" 
                        data-name="Polygon 3" 
                        d="M12,3.8A3,3,0,0,1,17,3.8l8.93,13.549A3,3,0,0,1,23.43,22H5.57a3,3,0,0,1-2.5-4.651Z" 
                        transform="translate(24) rotate(90)"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="hero-image">
                <img 
                  className="img-fluid" 
                  src="https://360exams.in/web/images/mockup/iphone.png" 
                  alt="iPhone Mockup"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="skew-divider"></div>
    </section>
  );
};

export default Home;

// import React from "react";

// const HeroSection = () => {
//   return (
//     <section className="relative bg-[#f9f9ff] py-16 px-4 md:px-20 flex flex-col md:flex-row items-center">
//       {/* Left Side Content */}
//       <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
//         <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
//           Generate Exams Papers for <span className="text-purple-600">GSEB, CBSE Board</span>
//         </h1>
//         <div className="flex items-center space-x-4 bg-purple-100 p-2 rounded-lg inline-block">
//           <a
//             className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-700"
//             href="https://play.google.com/store/apps/details?id=com.exams360"
//           >
//             Update
//           </a>
//           <span className="text-gray-700">Apps update is available now</span>
//         </div>
//         <p className="text-gray-600 text-lg">
//           The 360Exams provides users the ability to generate exam papers with many plans.
//           Content is provided by 360Exams. You can register as a Teacher, School, Student, or Class.
//         </p>
//         <div className="flex space-x-4">
//           <a
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md flex items-center hover:bg-purple-700"
//             target="_blank"
//             rel="noopener noreferrer"
//             href="https://play.google.com/store/apps/details?id=com.exams360"
//           >
//             <span className="mr-2">📥</span> Download
//           </a>
//           <a
//             className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-purple-600 hover:text-white"
//             href="https://www.youtube.com/watch?v=mukWYi4-KOg"
//           >
//             ▶ Watch Video
//           </a>
//         </div>
//       </div>
      
//       {/* Right Side Image */}
//       <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
//         <img
//           className="w-3/4 md:w-full max-w-xs md:max-w-md drop-shadow-lg"
//           src="https://360exams.in/web/images/mockup/iphone.png"
//           alt="App Mockup"
//         />
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
