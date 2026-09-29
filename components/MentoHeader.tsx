import Image from "next/image";
import { AlertIcon, PremiumIcon } from "./icons";
import type { MentoProfile } from "@/lib/types";

/** 콘텐츠 상세 상단, 헤더 바로 아래 붙는 멘토 정보 띠 (1920 전체 폭 / 내용은 1280 정렬) */
export default function MentoHeader({ data }: { data: MentoProfile }) {
    return (
        <div className="box-border h-mento border-y border-zinc-200 bg-white">
            <div className="mx-auto flex h-full w-page items-center justify-between">
                {/* 프로필 */}
                <div className="flex items-center gap-4">
                    <Image
                        src={data.avatar}
                        alt=""
                        width={56}
                        height={56}
                        className="size-14 object-cover object-top"
                    />
                    <div className="flex flex-col gap-1">
                        {/* "[ 한석준 ] 폴리오" — 이름 부분은 Figma 로고 svg 그대로 */}
                        <p className="flex items-center gap-1 text-[24px] leading-none text-navy">
                            <span aria-hidden>[</span>
                            <Image
                                src={data.nameLogo}
                                alt={data.displayName}
                                width={62}
                                height={25}
                                className="h-[25px] w-[62px]"
                            />
                            <span aria-hidden>]</span>
                            <span>폴리오</span>
                        </p>
                        <p className="flex items-center gap-2 text-body font-medium text-zinc-400">
                            <span>{data.category}</span>
                            <span className="size-dot rounded-full bg-zinc-400" aria-hidden />
                            <span>콘텐츠 {data.contentCount}개</span>
                        </p>
                    </div>
                </div>

                {/* 구독 버튼 / 구독 중 배지 + 알림 */}
                <div className="flex items-center gap-3">
                    {data.subscribed ? (
                        <div className="box-border flex h-14 items-center gap-3 border border-zinc-100 bg-white py-4 pl-4 pr-5">
                            <Image
                                src="/images/badge-bg.svg"
                                alt=""
                                width={24}
                                height={24}
                                className="size-6"
                            />
                            {data.badges.map((badge, index) => (
                                <span key={badge} className="flex items-center gap-3">
                                    {index > 0 && (
                                        <span className="h-1 w-0.5 bg-zinc-200" aria-hidden />
                                    )}
                                    <span className="text-lead font-bold text-navy">
                                        {badge}
                                    </span>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="flex h-14 cursor-pointer items-center gap-3 bg-zinc-900 py-4 pl-5 pr-7 text-lead font-semibold text-white"
                        >
                            <PremiumIcon />
                            구독하기
                        </button>
                    )}

                    <button
                        type="button"
                        className="box-border flex h-14 cursor-pointer items-center justify-center border border-zinc-100 bg-white px-6 py-4 text-zinc-300"
                    >
                        <span className="sr-only">알림 받기</span>
                        <AlertIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
