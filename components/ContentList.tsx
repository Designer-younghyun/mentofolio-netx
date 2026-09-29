import ContentCard from "./ContentCard";
import type { ContentCardData } from "@/lib/types";

/** 콘텐츠 카드 목록 (1280px 안에 305px 카드 4열) */
export default function ContentList({ cards }: { cards: ContentCardData[] }) {
    return (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-7">
            {cards.map((card) => (
                <ContentCard key={card.id} card={card} />
            ))}
        </ul>
    );
}
