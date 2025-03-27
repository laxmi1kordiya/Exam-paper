// The commented code is for rendering with animations -- I am currently not using it for better performance
// import React from 'react'
// import { Tilt } from 'react-tilt'
// import { motion } from 'framer-motion'
// import { styles } from '../styles'
// import { services } from '../constants'
// import { fadeIn, textVariant } from '../utils/motion'
// import { SectionWrapper } from "../hoc";

// const ServiceCard = ({ index, title, icon }) => {
//   return (
//     <Tilt className='xs:w-[250px] w-full'>
//       <motion.div
//         variants={fadeIn("right", "spring", index * 0.5, 0.75)}
//         className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
//       >
//         <div
//           options={{
//             max: 45,
//             scale: 1,
//             speed: 450,
//           }}
//           className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
//         >
//           <img
//             src={icon}
//             alt={title}
//             className='w-16 h-16 object-contain'
//           />

//           <h3 className='text-white text-[20px] font-bold text-center'>
//             {title}
//           </h3>
//         </div>
//       </motion.div>
//     </Tilt>
//   )
// };

// const About = () => {
//   return (
//     <>
//     <motion.div variants={textVariant()}>
//       <h2 className={`${styles.sectionHeadText} custom`}>About.</h2>
//       <p className={styles.sectionSubText}>It's me! 🙋🏻‍♀️ HI! I'm the coder, it's me! 💻</p>
//     </motion.div>

//     <motion.p
//       variants={fadeIn("", "", 0.1, 1)}
//       className='mt-4 text-secondary text-[17px] w-full leading-[30px]'
//     >
//       {/* I'm a skilled software developer with experience in TypeScript and
//       JavaScript, and expertise in frameworks like React, Node.js, and
//       Three.js. I'm a quick learner and collaborate closely with clients to
//       create efficient, scalable, and user-friendly solutions that solve
//       real-world problems. Let's work together to bring your ideas to life! */}
//         I'm a Full Stack Web Developer with a passion for solving real-world challenges and driving technological advancement. Proficient 
//         in a wide array of programming languages including Python, JavaScript, Java, and C, with expertise spanning frontend technologies such as ReactJS, 
//         HTML, and CSS, as well as backend frameworks like NodeJS, ExpressJS, and Flask. Skilled in database management systems such as MongoDB, MySQL, and Firebase, 
//         and adept at utilizing version control tools like Git and GitHub. With a strong foundation in computer science and a knack for problem-solving, I strive to 
//         transform ideas into functional and efficient code. Whether it's developing web applications, 
//         formulating AI solutions, or managing databases, I have the skills to bring your technological aspirations to fruition. 
//         Let's collaborate and turn visions into reality!
//     </motion.p>

//     <div className='mt-20 flex flex-wrap gap-10'>
//       {services.map((service, index) => (
//         <ServiceCard key={service.title} index={index} {...service} />
//       ))}
//     </div>
//     </>
//   )
// }

// export default SectionWrapper(About, "about")
import React from 'react';
import { Tilt } from 'react-tilt';
import { styles } from '../styles';
import { services } from '../constants';
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ title, icon }) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <div className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img
            src={icon}
            alt={title}
            className='w-16 h-16 object-contain'
          />
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <div>
        <h2 className={`${styles.sectionHeadText} custom`}>About.</h2>
        <p className={styles.sectionSubText}>It's me! 🙋🏻‍♀️ HI! I'm the coder, it's me! 💻</p>
      </div>

      <p className='mt-4 text-secondary text-[17px] w-full leading-[30px]'>
        I'm a Full Stack Web Developer with a passion for solving real-world challenges and driving technological advancement. Proficient 
        in a wide array of programming languages including Python, JavaScript, Java, and C, with expertise spanning frontend technologies such as ReactJS, 
        HTML, and CSS, as well as backend frameworks like NodeJS, ExpressJS, and Flask. Skilled in database management systems such as MongoDB, MySQL, and Firebase, 
        and adept at utilizing version control tools like Git and GitHub. With a strong foundation in computer science and a knack for problem-solving, I strive to 
        transform ideas into functional and efficient code. Whether it's developing web applications, 
        formulating AI solutions, or managing databases, I have the skills to bring your technological aspirations to fruition. 
        Let's collaborate and turn visions into reality!
      </p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
