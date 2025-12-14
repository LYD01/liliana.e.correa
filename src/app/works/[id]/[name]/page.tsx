"use client"
import { WORKS_DATA } from "@/app/_constants";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ArticlePage() {
    // TODO: cmolpete articles
    const { id } = useParams();
    const cardId = Number(id);

    const card = WORKS_DATA.find(card => card.id === cardId);

    if (!card) {
        return <p>Card not found</p>;
    }
    return (

        <div className="tabletAndBelow:px-4">
            <div className="px-1 pt-20 h-full mx-auto">
                <div className="min-h-[45rem] border-t select-text text-white">
                    <div>
                        <h1 className="my-4">{card.title}</h1>
                    </div>
                    <div className="w-fit">
                        {card.externalUrl ?
                            <Link href={card.externalUrl} target="_blank" className="max-w-fit flex" >
                                <Image src={`${card.img}`} alt={"card.img.alt"} width={200} height={200} />
                            </Link>
                            :
                            <Image src={`${card.img}`} alt={"card.img.alt"} width={200} height={200} />
                        }
                        {card.summary ? (
                            <div className="">
                                {/* <h2 className="px-4 mt-6">{`By Liliana Correa`}</h2> */}
                                <p className="px-6 py-4">{card.summary}</p>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                </div>
            </div>
        </div>

    );
}