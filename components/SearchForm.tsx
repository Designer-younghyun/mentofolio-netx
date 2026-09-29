import Image from "next/image";
import type { HeaderData } from "@/lib/types";

/** 헤더 검색창 */
export default function SearchForm({ search }: { search: HeaderData["search"] }) {
    return (
        <form
            action={search.action}
            className="box-border flex w-[410px] items-center justify-between gap-4 rounded-full border border-zinc-100 bg-white px-5 py-3"
        >
            <label htmlFor="search-input" className="sr-only">
                검색어 입력
            </label>
            <input
                id="search-input"
                type="text"
                placeholder={search.placeholder}
                className="min-w-0 flex-1 border-0 text-zinc-900 outline-none placeholder:text-zinc-400"
            />
            <button type="submit" className="shrink-0 cursor-pointer">
                <span className="sr-only">검색</span>
                <Image src="/images/icon-search.svg" alt="" width={24} height={24} />
            </button>
        </form>
    );
}
