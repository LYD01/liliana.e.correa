
import Image from "next/image";
import Link from "next/link";
import { BASE_URL, WORKS_DATA } from "../_constants";
export default function AboutPage() {
    return (

        <div className="flex flex-col justify-center items-center mb-10">
            <div className="">
                <Image src={`/img/mar-de-cobo-fin.png`} alt="" width={700} height={700} className="mt-[7rem] tabletAndBelow:mt-4 shadow-md rounded-l w-full max-w-[900px]" />
            </div>
            <div className="max-w-[900px] select-all text-white p-1 [&_section]:p-1 [&_section]:my-4">
                <h2 className="my-4">Works</h2>
                <section className="w-full border-y p-4">
                    <h3 className="">Latin American Arts Practices in Sydney</h3>
                    <span className="block my-1 py-1 font-semibold">2012</span>
                    <Link href={WORKS_DATA[2].url} className="hover:underline text-blue-200">
                        Doctorate of Cultural Research Thesis: The Politics of Cultural Visibility
                    </Link>
                </section>
                <section className="w-full  border-b p-4">
                    <h3 className="">Syncretic</h3>
                    <span className=" my-1 py-1 font-semibold hidden"></span>
                    <Link href={WORKS_DATA[1].url} className="hover:underline text-blue-200">
                        Stories from Latin Americans in Australia
                    </Link>
                </section>
                <section className="w-full  border-b p-4" >
                    <h3 className="">Creative Writing</h3>
                    <span className=" my-1 py-1 font-semibold hidden"></span>
                    <div className="flex flex-col items-baseline tabletAndBelow:gap-4 tabletAndBelow:items-center">
                        <Link href={WORKS_DATA[3].url} className="block hover:underline text-blue-200">
                            &apos;Cuerpos&apos; Poems published in Yo Soy Collective, Australian Multilingual Projct
                        </Link>
                        <span className=" my-1 py-1 font-semibold hidden"></span>
                        <Link href={WORKS_DATA[9].url} className="block hover:underline text-blue-200">
                            {'Perdiendo el rastro short story and Araña poem'}
                        </Link>
                    </div>
                </section>
            </div>


        </div >
    );
}
