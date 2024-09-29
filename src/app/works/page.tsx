"use client"
import { useState } from "react";
import { WORKS_DATA } from "../_constants";
import { CardsList, SearchBar } from "../_components";

export default function WorksPage() {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className=" bg-neutral-700 max-w-[1280px] mx-auto tabletAndBelow:px-4">
            <div className=" pt-20 pb-10 h-full container mx-auto">
                <div className=" border-t">
                    <h1 className="my-4 ml-4">Creative Works</h1>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} className='flex justify-center items-center' />

                    <CardsList cardsData={WORKS_DATA} searchQuery={searchQuery} />
                </div>
            </div>
        </div>
    );
}
