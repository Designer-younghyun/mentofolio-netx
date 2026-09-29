import Image from "next/image";
import { HeartFilledIcon, KebabIcon } from "./icons";
import type { CommentData, CommentReply, CommentSort } from "@/lib/types";

/** 작성자 이름 줄 (배지 + 이름) */
function AuthorLine({ author }: { author: string }) {
    return (
        <span className="flex items-center gap-1">
            <Image
                src="/images/badge-bg.svg"
                alt=""
                width={24}
                height={24}
                className="size-6"
            />
            <span className="text-lead font-semibold text-black">{author}</span>
        </span>
    );
}

/** 좋아요 수 + "멘토가 좋아요 누른 댓글" 툴팁 */
function LikeRow({ likes, mentorLiked }: { likes: number; mentorLiked?: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                className="flex cursor-pointer items-center gap-1 p-1 text-brand-pink"
            >
                <HeartFilledIcon />
                <span className="text-body font-semibold">{likes.toLocaleString()}</span>
            </button>
            {mentorLiked && (
                <span className="relative ml-1 rounded-xl bg-brand-pink px-3 py-1 text-body font-semibold text-zinc-50">
                    {/* 말풍선 꼬리 */}
                    <span
                        className="absolute -left-1 top-1/2 size-2.5 -translate-y-1/2 rotate-45 rounded-[2px] bg-brand-pink"
                        aria-hidden
                    />
                    멘토가 좋아요 누른 댓글이에요
                </span>
            )}
        </div>
    );
}

/** 답글 1개 (회색 배경) */
function Reply({ reply }: { reply: CommentReply }) {
    return (
        <li className="bg-zinc-50 px-5 pb-3 pt-5">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                            <AuthorLine author={reply.author} />
                            <span className="text-body text-zinc-400">{reply.time}</span>
                        </div>
                        <button type="button" className="cursor-pointer text-zinc-200">
                            <span className="sr-only">답글 메뉴</span>
                            <KebabIcon />
                        </button>
                    </div>

                    <p className="text-lead font-medium text-zinc-700">
                        {reply.mention && (
                            <span className="mr-1 bg-cautionary/10 px-1 py-0.5 text-sub font-semibold text-cautionary">
                                {reply.mention}
                            </span>
                        )}
                        {reply.body}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <LikeRow likes={reply.likes} mentorLiked={reply.mentorLiked} />
                    <button
                        type="button"
                        className="cursor-pointer p-1 text-body font-medium text-zinc-500"
                    >
                        답글 달기
                    </button>
                </div>
            </div>
        </li>
    );
}

/** 댓글 1개 */
function Comment({ comment }: { comment: CommentData }) {
    return (
        <li>
            <div className="flex flex-col gap-4 bg-white pb-4">
                <div className="flex flex-col gap-3">
                    <div className="flex h-[46px] items-center gap-3">
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <AuthorLine author={comment.author} />
                            <span className="text-body text-zinc-400">{comment.time}</span>
                        </div>
                        <button type="button" className="cursor-pointer text-zinc-200">
                            <span className="sr-only">댓글 메뉴</span>
                            <KebabIcon />
                        </button>
                    </div>

                    <p className="text-lead font-medium text-zinc-700">{comment.body}</p>
                </div>

                <div className="flex items-center gap-4">
                    <LikeRow likes={comment.likes} mentorLiked={comment.mentorLiked} />
                    {comment.hiddenReplyCount ? (
                        <button
                            type="button"
                            className="cursor-pointer p-1 text-body font-medium text-zinc-500"
                        >
                            답글 {comment.hiddenReplyCount}개 더 보기
                        </button>
                    ) : null}
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <ul>
                    {comment.replies.map((reply) => (
                        <Reply key={reply.id} reply={reply} />
                    ))}
                </ul>
            )}
        </li>
    );
}

interface Props {
    comments: CommentData[];
    sorts: CommentSort[];
    activeSortId: string;
    placeholder: string;
    filterLabel: string;
}

/** 댓글 영역 전체 (개수 + 입력창 + 정렬 칩 + 목록) */
export default function CommentList({
    comments,
    sorts,
    activeSortId,
    placeholder,
    filterLabel,
}: Props) {
    return (
        <section className="mx-auto w-article">
            {/* 개수 + 내 댓글만 보기 */}
            <div className="flex items-center justify-between">
                <h2 className="text-sub font-semibold text-zinc-500">
                    댓글 {comments.length}개
                </h2>
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="checkbox"
                        className="size-5 appearance-none border-[2.5px] border-zinc-200 bg-zinc-200"
                    />
                    <span className="text-body font-medium text-zinc-700">{filterLabel}</span>
                </label>
            </div>

            {/* 댓글 입력 */}
            <form
                className="mt-3 flex flex-col items-end gap-3"
                action="#"
            >
                <label htmlFor="comment-input" className="sr-only">
                    댓글 입력
                </label>
                <input
                    id="comment-input"
                    type="text"
                    placeholder={placeholder}
                    className="box-border w-full border border-zinc-100 bg-white px-5 py-6 text-sub text-zinc-900 outline-none placeholder:text-zinc-300"
                />
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="box-border cursor-pointer border border-zinc-100 bg-white px-4 py-2 text-sub font-medium text-zinc-300 shadow-[0_4px_16px_0_rgba(255,255,255,0.15)]"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="cursor-pointer bg-zinc-50 px-4 py-2 text-sub font-bold text-zinc-300 shadow-[0_4px_16px_0_rgba(255,255,255,0.15)]"
                    >
                        등록
                    </button>
                </div>
            </form>

            {/* 정렬 칩 */}
            <div className="mt-12 flex items-center gap-3">
                {sorts.map((sort) => {
                    const isActive = sort.id === activeSortId;
                    return (
                        <button
                            key={sort.id}
                            type="button"
                            aria-pressed={isActive}
                            className={`box-border h-10 cursor-pointer rounded-full px-4 text-body font-medium ${
                                isActive
                                    ? "bg-navy text-white"
                                    : "border border-zinc-100 bg-white text-zinc-400"
                            }`}
                        >
                            {sort.label}
                        </button>
                    );
                })}
            </div>

            {/* 목록 */}
            <ul className="mt-4 flex flex-col">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </ul>
        </section>
    );
}
