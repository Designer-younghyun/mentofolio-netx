import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { FooterData, InfoRow } from "@/lib/types";

/** 정책 링크·사업자 정보 사이의 세로 구분선 */
function Divider() {
    return <span className="h-2 w-px bg-current" />;
}

function InfoRowView({ row }: { row: InfoRow }) {
    if (row.kind === "divider") {
        return (
            <div className="flex items-center gap-2">
                {row.items.map((item, index) => (
                    <Fragment key={item}>
                        {index > 0 && <Divider />}
                        <span>{item}</span>
                    </Fragment>
                ))}
            </div>
        );
    }

    return (
        <p>
            {row.before}
            {row.link && (
                <Link href={row.link.href} className="underline">
                    {row.link.label}
                </Link>
            )}
            {row.after}
        </p>
    );
}

/** 하단 푸터 */
export default function Footer({ data }: { data: FooterData }) {
    return (
        <footer className="border-t border-zinc-200 bg-white py-12">
            <div className="mx-auto flex w-page items-end gap-[173px]">
                <div className="flex w-[481px] flex-col gap-6">
                    <div>
                        <Image
                            src={data.logo.src}
                            alt={data.logo.alt}
                            width={121}
                            height={32}
                            className="h-8 w-[120.36px]"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* 정책 링크 */}
                        <div className="flex items-center gap-3 text-sub font-medium text-zinc-600">
                            {data.policies.map((policy, index) => (
                                <Fragment key={policy.label}>
                                    {index > 0 && <Divider />}
                                    <Link href={policy.href}>{policy.label}</Link>
                                </Fragment>
                            ))}
                        </div>

                        {/* 사업자 정보 */}
                        <address className="flex flex-col gap-1 text-body font-normal not-italic text-zinc-500">
                            {data.info.map((row, index) => (
                                <InfoRowView key={index} row={row} />
                            ))}
                        </address>
                    </div>
                </div>

                <p className="w-[481px] text-body font-normal text-zinc-400">
                    {data.notice.map((line, index) => (
                        <Fragment key={line}>
                            {index > 0 && <br />}
                            {line}
                        </Fragment>
                    ))}
                </p>
            </div>
        </footer>
    );
}
