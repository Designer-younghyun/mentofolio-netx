import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import type { ContentCardData } from "@/lib/types";

/** 콘텐츠 카드 1개 */
export default function ContentCard({ card }: { card: ContentCardData }) {
    return (
        <li className="w-[305px]">
            <Link href={card.href} className="block">
                {/* 썸네일 */}
                <div className="relative h-[220px] w-[305px] overflow-hidden">
                    <Image
                        src={card.thumbnail}
                        alt=""
                        width={305}
                        height={220}
                        className="size-full object-cover"
                    />

                    {card.badges.length > 0 && (
                        <div className="absolute left-2 top-2 flex items-center gap-1">
                            {card.badges.map((badge) => (
                                <Badge key={badge} kind={badge} />
                            ))}
                        </div>
                    )}

                    {card.dday && (
                        <p className="box-border absolute bottom-0 left-0 w-full bg-navy px-2 py-1 text-center text-body font-bold text-white">
                            {card.dday}
                        </p>
                    )}
                </div>

                {/* 카드 정보 */}
                <div className="mt-3">
                    <p className="line-clamp-2 h-[56px] break-words text-lead font-medium text-zinc-900">
                        {card.title}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                        <Image
                            src={card.writer.avatar}
                            alt=""
                            width={36}
                            height={36}
                            className="size-9 rounded-full object-cover object-[50%_0]"
                        />
                        <span className="text-sub font-semibold text-zinc-900">
                            {card.writer.name}
                        </span>
                        <span className="text-body font-medium text-zinc-500">
                            {card.writer.category}
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}
