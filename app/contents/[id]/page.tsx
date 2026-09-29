import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CommentList from "@/components/CommentList";
import ContentList from "@/components/ContentList";
import MentoHeader from "@/components/MentoHeader";
import Pagination from "@/components/Pagination";
import { HeartFilledIcon, KebabIcon } from "@/components/icons";
import {
    activeCommentSortId,
    commentFilterLabel,
    commentPagination,
    commentPlaceholder,
    comments,
    commentSorts,
    contentCards,
    getArticle,
    likeContentLabel,
    mentoProfile,
    relatedSections,
} from "@/lib/data";

/** URL 의 [id] 부분. Next 16 에서 params 는 Promise 라서 await 해서 꺼낸다. */
type Params = { params: Promise<{ id: string }> };

/** 주소로 들어온 id 를 숫자로 바꾸고, 목록에 없는 번호면 404 처리한다. */
async function resolveId({ params }: Params) {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1 || numericId > contentCards.length) {
        notFound();
    }
    return numericId;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const article = getArticle(await resolveId({ params }));
    return { title: `${article.title} | MentoFolio` };
}

/** 콘텐츠 상세 페이지 */
export default async function ContentDetailPage({ params }: Params) {
    const article = getArticle(await resolveId({ params }));

    return (
        <main className="pb-[120px]">
            {/* 헤더 바로 아래 붙는 멘토 띠 (전체 폭) */}
            <MentoHeader data={mentoProfile} />

            {/* 본문 단은 680px 고정 폭 */}
            <article className="mx-auto w-article pt-12">
                <h1 className="text-title font-bold text-zinc-900">{article.title}</h1>

                <p className="mt-2 flex items-center gap-2 text-body text-zinc-500">
                    <span>{article.date}</span>
                    <span className="size-dot rounded-full bg-zinc-400" aria-hidden />
                    <span>조회 {article.views.toLocaleString()}회</span>
                </p>

                {/* 좋아요 / 댓글 / 공유 */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="box-border flex h-9 cursor-pointer items-center gap-2 border border-zinc-100 px-3 text-body font-medium text-zinc-600"
                        >
                            <span className="text-zinc-300">
                                <HeartFilledIcon />
                            </span>
                            {article.likes.toLocaleString()}
                        </button>
                        <button
                            type="button"
                            className="box-border flex h-9 cursor-pointer items-center border border-zinc-100 px-3 text-body font-medium text-zinc-600"
                        >
                            댓글 {article.comments.toLocaleString()}
                        </button>
                        <button
                            type="button"
                            className="box-border flex h-9 cursor-pointer items-center border border-zinc-100 px-3 text-body font-medium text-zinc-600"
                        >
                            공유
                        </button>
                    </div>
                    <button type="button" className="cursor-pointer text-zinc-300">
                        <span className="sr-only">콘텐츠 메뉴</span>
                        <KebabIcon />
                    </button>
                </div>

                {/* 본문 */}
                <div className="mt-10 flex flex-col gap-6 border-t border-zinc-100 pt-10">
                    {article.body.map((paragraph, index) => (
                        <p key={index} className="text-lead text-zinc-900">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

            {/* 본문 아래 가운데 정렬 버튼 */}
            <div className="mt-10 flex justify-center">
                <button
                    type="button"
                    className="box-border flex h-14 cursor-pointer items-center gap-2 border border-zinc-100 bg-white px-5 text-lead font-semibold text-zinc-900"
                >
                    <span className="text-zinc-200">
                        <HeartFilledIcon />
                    </span>
                    {likeContentLabel}
                </button>
            </div>

            {/* 댓글 */}
            <div className="mt-[60px]">
                <CommentList
                    comments={comments}
                    sorts={commentSorts}
                    activeSortId={activeCommentSortId}
                    placeholder={commentPlaceholder}
                    filterLabel={commentFilterLabel}
                />
                <div className="mx-auto w-article">
                    <Pagination
                        current={commentPagination.current}
                        total={commentPagination.total}
                    />
                </div>
            </div>

            {/* 추천 콘텐츠: 목록 페이지의 ContentList 를 그대로 재사용 */}
            {relatedSections.map((section) => (
                <section key={section.id} className="mx-auto mt-[120px] w-page">
                    <h2 className="text-title font-bold text-zinc-900">{section.title}</h2>
                    <ContentList cards={section.cards} />
                </section>
            ))}
        </main>
    );
}
