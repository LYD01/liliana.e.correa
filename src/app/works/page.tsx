import { CardList } from "../_components/CardsList";
import { WORKS_DATA } from "../_constants";

export default function WorksPage() {

    return (
        <div className=" bg-neutral-700 max-w-[1280px] mx-auto tabletAndBelow:px-4">
            <div className=" pt-20 pb-10 h-full container mx-auto">
                <div className=" border-t">
                    <h1 className="my-4">Creative Works</h1>
                    <CardList cardsData={WORKS_DATA} />
                </div>
            </div>
        </div>
    );
}
