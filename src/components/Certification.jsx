import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { certificates } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from "../hoc";

const Certification = () => {
  return (
    <div>
    <motion.div variants={textVariant()}>
      <h2 className={styles.sectionHeadText}>Certifications.</h2>
      <p className={styles.sectionSubText}>They teach a lot 🏆</p>
    </motion.div>
    </div>
  )
}

export default SectionWrapper(Certification, "certification")