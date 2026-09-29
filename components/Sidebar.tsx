"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertIcon, FavoriteIcon, HomeIcon, RecentIcon } from "./icons";
import type { SideMenuIconKind, SidebarData } from "@/lib/types";

/** 아이콘 종류 → 실제 아이콘 컴포넌트 */
const ICONS: Record<SideMenuIconKind, () => React.ReactElement> = {
    home: HomeIcon,
    recent: RecentIcon,
    favorite: FavoriteIcon,
    alert: AlertIcon,
};

interface Props {
    data: SidebarData;
    open: boolean;
    onClose: () => void;
}

/** 헤더 햄버거 버튼으로 여는 좌측 사이드바 */
export default function Sidebar({ data, open, onClose }: Props) {
    // ESC 키로 닫기
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    return (
        <>
            {/* 바깥 아무 곳이나 누르면 닫히도록 하는 투명 영역 */}
            {open && (
                <div
                    className="fixed inset-0 top-header z-30"
                    onClick={onClose}
                    aria-hidden
                />
            )}

            {/* inert: 닫혀 있을 때 Tab 키로 안쪽 링크에 접근되지 않게 막는다 */}
            <aside
                id="site-sidebar"
                inert={!open}
                aria-label="전체 메뉴"
                className={`fixed bottom-0 left-0 top-header z-40 box-border flex w-sidebar flex-col gap-7 overflow-y-auto border-r border-zinc-200 bg-white px-8 pb-10 pt-6 drop-shadow-[0_4px_54px_rgba(0,0,0,0.02)] transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* 상단 메뉴 */}
                <ul className="flex w-full flex-col gap-3">
                    {data.menu.map((item) => {
                        const Icon = ICONS[item.icon];
                        const isActive = item.id === data.activeMenuId;
                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`flex items-center gap-4 p-2 text-lead ${
                                        isActive
                                            ? "font-semibold text-zinc-900"
                                            : "font-normal text-zinc-400"
                                    }`}
                                >
                                    <span
                                        className={`shrink-0 ${isActive ? "text-zinc-900" : "text-zinc-300"}`}
                                    >
                                        <Icon />
                                    </span>
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <hr className="w-[172px] border-zinc-100" />

                {/* 카테고리 */}
                <nav aria-label={data.categories.title} className="flex flex-col gap-2">
                    <p className="px-2 text-body font-semibold text-zinc-400">
                        {data.categories.title}
                    </p>
                    <ul className="flex flex-col gap-1">
                        {data.categories.items.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={category.href}
                                    onClick={onClose}
                                    className="block p-2 text-lead font-semibold text-zinc-900"
                                >
                                    {category.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr className="w-[172px] border-zinc-100" />

                {/* 구독 중인 멘토 (비로그인 상태라 목록이 비어 있다) */}
                <section className="flex flex-col gap-2">
                    <p className="px-2 text-body font-semibold text-zinc-400">
                        {data.subscriptions.title}
                    </p>
                    {data.subscriptions.items.length > 0 && (
                        <ul className="flex flex-col gap-1">
                            {data.subscriptions.items.map((mentor) => (
                                <li
                                    key={mentor.name}
                                    className="flex items-center gap-4 py-1 pl-2 text-sub font-medium text-zinc-700"
                                >
                                    {mentor.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </aside>
        </>
    );
}
