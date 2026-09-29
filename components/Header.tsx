import Image from "next/image";
import Link from "next/link";
import SearchForm from "./SearchForm";
import type { HeaderData } from "@/lib/types";

interface Props {
    data: HeaderData;
    /** 햄버거 버튼 클릭 → 사이드바 열기 */
    onMenuClick: () => void;
    /** 로그인/회원가입 클릭 → 모달 열기 */
    onLoginClick: () => void;
    /** 사이드바가 열려 있는지 (aria-expanded 용) */
    sidebarOpen: boolean;
}

/** 상단 헤더 */
export default function Header({
    data,
    onMenuClick,
    onLoginClick,
    sidebarOpen,
}: Props) {
    return (
        <header className="sticky top-0 z-50 box-border flex h-header items-center justify-between border-b border-zinc-200 bg-white px-10">
            <div className="flex items-center gap-6">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-expanded={sidebarOpen}
                    aria-controls="site-sidebar"
                    className="cursor-pointer"
                >
                    <span className="sr-only">전체 메뉴</span>
                    <Image src="/images/icon-menu.svg" alt="" width={24} height={24} />
                </button>
                <Link href={data.logo.href}>
                    <Image
                        src={data.logo.src}
                        alt={data.logo.alt}
                        width={121}
                        height={32}
                        className="h-8 w-[120.36px]"
                    />
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <SearchForm search={data.search} />
                <button
                    type="button"
                    onClick={onLoginClick}
                    className="flex cursor-pointer items-center gap-3 py-2 text-lead font-semibold text-zinc-900"
                >
                    <Image src="/images/icon-mypage.svg" alt="" width={24} height={24} />
                    {data.login.label}
                </button>
            </div>
        </header>
    );
}
