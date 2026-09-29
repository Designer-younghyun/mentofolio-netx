/** 더보기 버튼 */
export default function MoreButton({ label }: { label: string }) {
    return (
        <div className="mt-20 text-center">
            <button
                type="button"
                className="box-border h-[60px] w-[240px] cursor-pointer border border-zinc-200 bg-white px-4 py-3 text-lead font-semibold text-zinc-900 shadow-[0_4px_16px_0_rgba(255,255,255,0.15)]"
            >
                {label}
            </button>
        </div>
    );
}
