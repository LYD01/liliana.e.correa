"use client"
import { WORKS_DATA } from "@/app/_constants";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ArticlePage() {
    // TODO: cmolpete articles
    const { id } = useParams();
    const cardId = Number(id);

    const card = WORKS_DATA.find(card => card.id === cardId);

    if (!card) {
        return <p>Card not found</p>;
    }
    return (

        <div className=" bg-neutral-700  tabletAndBelow:px-4">
            <div className="px-1 pt-20 h-full  container mx-auto">
                <div className="w-[50%] min-h-[45rem] border-t select-text text-white">
                    <div>
                        <h1 className="my-4">{card.title}</h1>
                    </div>
                    <div>
                        <Image src={`${card.img}`} alt={"card.img.alt"} width={200} height={200}></Image>
                    </div>

                </div>
            </div>
        </div>

    );
}