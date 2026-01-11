"use client"
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactUsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="pt-8 pb-24 md:pt-8 md:pl-40 tabletAndBelow:pb-24 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 md:ml-0 space-y-12">
        <motion.h1
          className="text-5xl sm:text-6xl tabletAndBelow:text-4xl font-bold"
          variants={itemVariants}
        >
          Contact
        </motion.h1>

        <motion.div
          className="space-y-8"
          variants={itemVariants}
        >
          <p className="text-lg sm:text-xl tabletAndBelow:text-base text-grey-800 leading-relaxed">
            I'd love to hear from you. Whether you have questions about my work,
            want to collaborate, or simply want to connect, feel free to reach out.
          </p>

          <div className="flex flex-col space-y-8 pt-4">
            <motion.a
              href="mailto:lilianaecorrea55@gmail.com"
              className="flex items-center gap-3 text-lg sm:text-xl text-grey-800 hover:text-grey-900 transition-colors underline underline-offset-4 decoration-grey-600 hover:decoration-grey-800 group focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                <Image
                  src={"/icons/mail_24dp_FILL0_wght400_GRAD0_opsz24.svg"}
                  alt={"mail icon"}
                  width={24}
                  height={24}
                  className="opacity-70 group-hover:opacity-100 w-5 h-5 sm:w-6 sm:h-6 transition-opacity"
                />
              </div>
              <span className="break-all">lilianaecorrea55@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/liliana-correa-a6670b19"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg sm:text-xl text-grey-800 hover:text-grey-900 transition-colors underline underline-offset-4 decoration-grey-600 hover:decoration-grey-800 group focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded"
              variants={itemVariants}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-grey-700 group-hover:text-grey-900 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>View my LinkedIn profile</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-grey-700 group-hover:text-grey-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
