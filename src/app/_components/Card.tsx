import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
export const Card = ({
  title,
  description,
  url,
  img,
  className
}: {
  title: string;
  description: string;
  url: string;
  img: string;
  className: string;
}) => {
  return (
    <div className={`card rounded h-auto w-[16rem] border bg-zinc-900 flex flex-col justify-between transition-all duration-300 ease-in-out ${className}`}>
      <div className='rounded'>
        <Link href={`${url}`} className='block'>
          <Image src={`${img}`} className='w-full h-auto rounded' alt='Image of article' width={75} height={100} />
        </Link>
      </div>
      <h2 className='py-4 text-[16px] text-center'>{title}</h2>
      {/* <p className='my-4 text-sm'>{description}</p> */}
    </div>
  );
};
