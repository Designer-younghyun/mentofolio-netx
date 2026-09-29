import Image from "next/image";
import type { BadgeKind } from "@/lib/types";

const BADGE_TEXT: Record<Exclude<BadgeKind, "video">, string> = {
    new: "NEW",
    free: "무료",
};

const BADGE_STYLE: Record<Exclude<BadgeKind, "video">, string> = {
    new: "bg-brand-red text-white",
    free: "bg-white text-navy",
};

/** 썸네일 좌상단 배지 */
export default function Badge({ kind }: { kind: BadgeKind }) {
    if (kind === "video") {
        return (
            <span className="box-border flex size-7 items-center justify-center bg-white p-1">
                <Image
                    src="/images/icon-videocam.svg"
                    alt="동영상 콘텐츠"
                    width={16}
                    height={16}
                />
            </span>
        );
    }

    return (
        <span
            className={`flex items-center justify-center whitespace-nowrap px-2 py-1 text-body font-bold ${BADGE_STYLE[kind]}`}
        >
            {BADGE_TEXT[kind]}
        </span>
    );
}
