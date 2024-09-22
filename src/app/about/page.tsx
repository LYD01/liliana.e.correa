
import Image from "next/image";
import Link from "next/link";
export default function AboutPage() {
    return (
        <>
            <div className=" px-1 pt-[8px] h-full max-w-[1480px] mx-auto flex items-center justify-between tabletAndBelow:flex-col tabletAndBelow:pt-16 tabletAndBelow:px-4">
                <div className=" select-all border-t text-white p-1 mr-4">
                    <div className="max-w-[600px] py-20 tabletAndBelow:py-10">
                        <h1 className="text-white">About</h1>
                        <p className="my-4 ">Liliana Correa is a bilingual Spanish-English writer and educator living in Bundjalung Country in the Northern Rivers. Liliana attained a Doctoral degree from Western Sydney University in 2013 and she has extensive experience working in the areas of community arts and adult education. She is currently working in the vocational education sector and is passionate about supporting adult literacy and lifelong learning.
                            <strong>
                                Liliana is currently researching the participation of radicalised artists  in the theatre industry in Sydney during the late 1980 and 1990’s.as well as continuing with her creative writing project.
                            </strong>
                        </p>
                    </div>
                </div>
                <Image src={`/img/mar-de-cobo-fin.png`} alt="" width={700} height={700} className="mt-[7rem] tabletAndBelow:mt-4 mx-auto shadow-md rounded-l " />
            </div>
            <div className="p-1 py-12  h-full container mx-auto tabletAndBelow:text-center">
                <div className="max-w-[900px] select-all text-white p-1 [&_section]:p-1">
                    <h2 className="my-4">Works</h2>
                    <section className="w-full bg-slate-600 border-y p-4">
                        <h3 className="">Latin American Arts Practices in Sydney</h3>
                        <span className="block my-1 py-1 font-semibold">2012</span>
                        <Link href={``} className="hover:underline text-blue-200">
                            Doctorate of Cultural Research Thesis: The Politics of Cultural Visibility
                        </Link>
                    </section>
                    <section className="w-full bg-slate-600 border-b p-4">
                        <h3 className="">Syncretic</h3>
                        <span className=" my-1 py-1 font-semibold hidden"></span>
                        <Link href={``} className="hover:underline text-blue-200">
                            Stories from Latin Americans in Australia
                        </Link>
                    </section>
                    <section className="w-full bg-slate-600 border-b p-4" >
                        <h3 className="">Creative Writing</h3>
                        <span className=" my-1 py-1 font-semibold hidden"></span>
                        <div className="flex flex-col items-baseline tabletAndBelow:gap-4 tabletAndBelow:items-center">
                            <Link href={``} className="block hover:underline text-blue-200">
                                &apos;Cuerpos&apos; Poems published in Yo Soy Collective, Australian Multilingual Projct
                            </Link>
                            <span className=" my-1 py-1 font-semibold hidden"></span>
                            <Link href={``} className="block hover:underline text-blue-200">
                                &apos;Perdiendo el rastro&apos; short story and &apos;Araña&apos; poem
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
