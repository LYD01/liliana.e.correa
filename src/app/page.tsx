"use client"
import {
  motion,
  useInView
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { WORKS_DATA } from "./_constants";

export default function Home() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  return (
    <div className="flex items-center tabletAndBelow:gap-10 flex-col tabletAndBelow:items-start mx-auto py-10 tabletAndBelow:pt-24 tabletAndBelow:pl-0">
      <div className=" tabletAndBelow:border-b-2 flex gap-10 tabletAndBelow:flex-col">
        <div>
          <h1 className="">Liliana E. Correa</h1>
          <h2 className="my-4">Writer, Adult Educator, Language Teacher</h2>
          <p className="my-4">Liliana E. Correa is a dedicated educator and prolific writer, known for her contributions to adult education and language teaching. Her passion for learning and teaching has inspired many.</p>
          <h3 className="my-4">Argentinian writer and academic</h3>
          <p className="my-4">An esteemed Argentinian academic, Liliana has made significant strides in the literary world, blending her cultural insights with her educational expertise to enrich her readers and students alike.</p>
        </div>
        <Image src={`/img/liliFront.png`} alt="Photo of Liliana" width={200} height={200}
          className="max-w-md	w-full max-md:w-[15rem]  rounded-[20px] "
        />
      </div>
      <motion.div
        className="w-full "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h4 className="text-[2rem] pb-10" variants={itemVariants}>Most recent work</motion.h4>
        <motion.div className="flex justify-start tablet:justify-end  " variants={itemVariants}>
          <Link href={`https://www.amazon.com.au/nena-m%C3%A1gica-Liliana-Correa/dp/8419339431`}
            className="h-auto w-[20rem] max-md:w-[15rem] block relative tablet:mr-[9rem]">
            <Image
              src={'/img/la-nene-majica.jpeg'} width={100} height={250} alt="la nene majica"
              className="h-auto w-full rounded shadow-2xl"
            />
            <div className="bg-red-900 rounded md:absolute md:right-[-130px] md:bottom-2 p-4 border shadow-2xl">
              <h3 className="flex gap-1 underline">La Nena Mágica
                <Image className="w-4 h-4 mb-4" src={`/icons/open_in_new_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg`} alt="navigate to purchasing this book" height={10} width={10} />
              </h3>
            </div>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link className="tablet-[9rem] block max-w-fit p-4 mt-4 text-white hover:scale-[1.1] transition tabletAndBelow:float-right" href={'/about'}>{'About Liliana and her works ->'}</Link>
        </motion.div>
      </motion.div>

      {/* TODO: move to reusable or add somewhere meaningful. */}
      <div className="flex relative w-full justify-end tabletAndBelow:mt-40">
        <div
          ref={container}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}>
          <Image
            src={'/img/lili-phd-work.png'} width={400} height={250} alt=""
            className="h-auto w-full rounded shadow-2xl"
          />
          <Link href={WORKS_DATA[2].url} className="bg-red-900 underline rounded absolute -right-10 -top-[3rem] p-4 border shadow-2xl tabletAndBelow:mr-10 block">
            View more details
            {/* <Image className="w-4 h-4 mb-4" src={`/icons/open_in_new_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg`} alt="" height={10} width={10} /> */}
          </Link>
        </div >
      </div>
      <div className="flex relative w-full  my-40">
        <div
          ref={container}
          style={{
            transform: isInView ? "none" : "translateX(200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}>
          <Image
            src={WORKS_DATA[1].img} width={400} height={250} alt=""
            className="h-auto w-full rounded shadow-2xl"
          />
          <Link href={WORKS_DATA[1].url} className="bg-red-900 underline rounded absolute -left-10 -top-[3rem] p-4 border shadow-2xl tabletAndBelow:mr-10 block">
            View more details
            {/* <Image className="w-4 h-4 mb-4" src={`/icons/open_in_new_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg`} alt="" height={10} width={10} /> */}
          </Link>
        </div >
      </div>
    </div>
  );
}
