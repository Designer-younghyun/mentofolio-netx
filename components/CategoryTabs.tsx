import Link from "next/link";
import type { CategoryTab } from "@/lib/types";

interface Props {
    tabs: CategoryTab[];
    activeId: string;
}

/** 카테고리 탭 */
export default function CategoryTabs({ tabs, activeId }: Props) {
    return (
        <nav aria-label="콘텐츠 카테고리" className="pt-[52px]">
            <ul className="flex items-center gap-10 border-b border-zinc-100">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeId;
                    return (
                        <li key={tab.id}>
                            <Link
                                href={tab.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`-mb-px block whitespace-nowrap border-b-2 pb-3 text-tab ${
                                    isActive
                                        ? "border-navy font-bold text-navy"
                                        : "border-transparent font-medium text-zinc-400"
                                }`}
                            >
                                {tab.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
