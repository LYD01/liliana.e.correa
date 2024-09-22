
import { Card } from './Card';

export const CardsList = ({ cardsData, searchQuery }: { cardsData: any, searchQuery: string }) => {
  const filteredCards = cardsData.filter((card: any) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className="flex flex-wrap gap-4 w-full transition-all justify-center">
        {filteredCards.map((card: any) => (
          <Card key={card.id} title={card.title} description={card.description} url={card.url} img={card.img} className={filteredCards.includes(card) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} />
        ))}
      </div>
    </div>
  );
};
