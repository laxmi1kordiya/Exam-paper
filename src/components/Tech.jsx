// The commented code is for rendering with animations -- I am currently not using it for better performance
// import React from 'react'
// import { BallCanvas } from "./canvas";
// import { SectionWrapper } from "../hoc";
// import { technologies } from "../constants";
// import { Card } from "./canvas";
// import { styles } from "../styles";
// import { motion } from "framer-motion";
// import { fadeIn, textVariant } from "../utils/motion";

// const Tech = () => {
//   return (
//     <div>
//       <motion.div variants={textVariant()}>
//         <h2 className={styles.sectionHeadText}>
//           Tech Stack.
//         </h2>
//         <p className={styles.sectionSubText}>
//           A never ending list of awesomness! 🚀
//         </p>
//         <br></br><br></br>
//       </motion.div>  
//       <motion.p variants={fadeIn("", "", 0.1, 1)}>
//       <div className='flex flex-row flex-wrap justify-center gap-10'>
//         {technologies.map((technology) => (
//           <div className='w-28 h-28' key={technology.name}>
//             <Card imgURL={technology.icon} name={technology.name} />
//           </div>
//         ))}
//       </div>
//       </motion.p>
//     </div>
//   )
// }

// export default SectionWrapper(Tech, "tech");
import React from 'react';
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { Card } from "./canvas";
import { styles } from "../styles";

const Tech = () => {
  return (
    <div>
      <h2 className={styles.sectionHeadText}>
        Tech Stack.
      </h2>
      <p className={styles.sectionSubText}>
        A never-ending list of awesomeness! 🚀
      </p>
      <br /><br />
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <Card imgURL={technology.icon} name={technology.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Tech, "tech");
