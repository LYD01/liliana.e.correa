"use client"
import React, { useState } from 'react';

import { Card } from './Card';
import { SearchBar } from './SearchBar';
export const CardList = ({ cardsData }: { cardsData: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCards = cardsData.filter((card: any) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} className='flex justify-center items-center' />
      <div className="flex flex-wrap gap-4 w-full transition-all justify-center">
        {filteredCards.map((card: any) => (
          <Card key={card.id} title={card.title} description={card.description} url={card.url} img={card.img} className={filteredCards.includes(card) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} />
        ))}
      </div>
    </div>
  );
};
