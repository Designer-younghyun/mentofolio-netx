import CategoryTabs from "@/components/CategoryTabs";
import ContentList from "@/components/ContentList";
import MoreButton from "@/components/MoreButton";
import {
    activeTabId,
    categoryTabs,
    contentCards,
    moreButtonLabel,
    PAGE_TITLE,
} from "@/lib/data";

/** 콘텐츠 목록 페이지 */
export default function ContentsPage() {
    return (
        <main className="mx-auto w-page pb-[120px] pt-10">
            <h1 className="text-heading font-bold text-zinc-900">{PAGE_TITLE}</h1>

            <CategoryTabs tabs={categoryTabs} activeId={activeTabId} />

            <p className="mt-6 text-sub font-medium text-zinc-500">
                총 {contentCards.length}개
            </p>

            <ContentList cards={contentCards} />
            <MoreButton label={moreButtonLabel} />
        </main>
    );
}
