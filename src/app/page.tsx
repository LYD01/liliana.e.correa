import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-full mx-auto  max-w-[1280px]">
      <div className="flex items-center gap-60 tabletAndBelow:gap-10 tabletAndBelow:flex-col tabletAndBelow:items-start mx-auto py-10">
        <div className="max-w-[600px] tabletAndBelow:border-b-2">
          <h1 className="">Liliana E. Correa</h1>
          <h2 className="my-4">Writer, Adult Educator, Language Teacher</h2>
          <p className="my-4">Liliana E. Correa is a dedicated educator and prolific writer, known for her contributions to adult education and language teaching. Her passion for learning and teaching has inspired many.</p>
          <h3 className="my-4">Argentinian writer and academic</h3>
          <p className="my-4">An esteemed Argentinian academic, Liliana has made significant strides in the literary world, blending her cultural insights with her educational expertise to enrich her readers and students alike.</p>
          <Image src={`/img/lili-photo.jpeg`} alt="Photo of Liliana" width={200} height={200}
            className="max-w-md	 w-full max-md:w-[15rem] py-4 rounded-lg "
          />
        </div>
        <div className="tabletAndBelow:w-full">
          <div className="tabletAndBelow:flex tabletAndBelow:justify-end">
            <Link href={`https://www.amazon.com.au/nena-m%C3%A1gica-Liliana-Correa/dp/8419339431`}
              className="h-auto w-[20rem] max-md:w-[15rem] block relative">
              <Image
                src={'/img/la-nene-majica.jpeg'} width={100} height={250} alt="la nene majica"
                className="h-auto w-full rounded shadow-2xl"
              />
              <div className="bg-red-900 rounded md:absolute md:left-[-130px] md:bottom-2 p-4 border shadow-2xl">
                <h3>La Nena Mágica</h3>
              </div>
            </Link>
          </div>
          <Link className="block p-4 mt-4 text-white hover:scale-[1.1] transition tabletAndBelow:float-right" href={'/about'}>{'About Liliana and her works ->'}</Link>
        </div>
      </div>
    </main>
  );
}
