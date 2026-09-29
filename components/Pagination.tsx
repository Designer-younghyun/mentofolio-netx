/** 댓글 목록 페이지네이션 (디자인상 정적 표시) */
export default function Pagination({
    current,
    total,
}: {
    current: number;
    total: number;
}) {
    // 1, 2, 3 ... 마지막 형태로 줄여서 보여준다
    const pages = [1, 2, 3].filter((page) => page <= total);
    const cell =
        "flex size-8 items-center justify-center border border-zinc-100 text-body font-medium";

    return (
        <nav aria-label="댓글 페이지" className="mt-10 flex justify-center">
            <ul className="flex">
                <li>
                    <button type="button" className={`${cell} cursor-pointer text-zinc-400`}>
                        <span className="sr-only">첫 페이지</span>«
                    </button>
                </li>
                <li>
                    <button type="button" className={`${cell} cursor-pointer text-zinc-400`}>
                        <span className="sr-only">이전 페이지</span>‹
                    </button>
                </li>

                {pages.map((page) => (
                    <li key={page}>
                        <button
                            type="button"
                            aria-current={page === current ? "page" : undefined}
                            className={`${cell} cursor-pointer ${
                                page === current
                                    ? "border-navy bg-navy font-bold text-white"
                                    : "text-zinc-900"
                            }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li>
                    <span className={`${cell} text-zinc-400`}>…</span>
                </li>
                <li>
                    <button type="button" className={`${cell} cursor-pointer text-zinc-900`}>
                        {total}
                    </button>
                </li>

                <li>
                    <button type="button" className={`${cell} cursor-pointer text-zinc-400`}>
                        <span className="sr-only">다음 페이지</span>›
                    </button>
                </li>
                <li>
                    <button type="button" className={`${cell} cursor-pointer text-zinc-400`}>
                        <span className="sr-only">마지막 페이지</span>»
                    </button>
                </li>
            </ul>
        </nav>
    );
}
