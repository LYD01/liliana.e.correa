import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (

    <div className="flex items-center gap-40 tabletAndBelow:gap-10 flex-col tabletAndBelow:items-start mx-auto py-10 tabletAndBelow:pt-24 tabletAndBelow:pl-0">
      <div className=" tabletAndBelow:border-b-2 flex gap-10 tabletAndBelow:flex-col">
        <div>
          <h1 className="">Liliana E. Correa</h1>
          <h2 className="my-4">Writer, Adult Educator, Language Teacher</h2>
          <p className="my-4">Liliana E. Correa is a dedicated educator and prolific writer, known for her contributions to adult education and language teaching. Her passion for learning and teaching has inspired many.</p>
          <h3 className="my-4">Argentinian writer and academic</h3>
          <p className="my-4">An esteemed Argentinian academic, Liliana has made significant strides in the literary world, blending her cultural insights with her educational expertise to enrich her readers and students alike.</p>
        </div>
        <Image src={`/img/lili-photo.jpeg`} alt="Photo of Liliana" width={200} height={200}
          className="max-w-md	 w-full max-md:w-[15rem] py-4 rounded-lg tabletAndAbove:pt-[10rem]"
        />
      </div>
      <div className=" w-full">
        <h4 className="text-[2rem] pb-10">Most recent work</h4>
        <div className="flex justify-start tabletAndBelow:justify-end">
          <Link href={`https://www.amazon.com.au/nena-m%C3%A1gica-Liliana-Correa/dp/8419339431`}
            className="h-auto w-[20rem] max-md:w-[15rem] block relative">
            <Image
              src={'/img/la-nene-majica.jpeg'} width={100} height={250} alt="la nene majica"
              className="h-auto w-full rounded shadow-2xl"
            />
            <div className="bg-red-900 rounded md:absolute md:right-[-130px] md:bottom-2 p-4 border shadow-2xl">
              <h3 className="flex gap-1">La Nena Mágica
                <Image className="w-4 h-4 mb-4" src={`/icons/open_in_new_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg`} alt="navigate to purchasing this book" height={10} width={10} />
              </h3>
            </div>
          </Link>
        </div>
        <Link className="block max-w-fit p-4 mt-4 text-white hover:scale-[1.1] transition tabletAndBelow:float-right" href={'/about'}>{'About Liliana and her works ->'}</Link>
      </div>
    </div>

  );
}
