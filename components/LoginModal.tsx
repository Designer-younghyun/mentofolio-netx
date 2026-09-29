"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons";
import type { LoginModalData } from "@/lib/types";

/** 소셜 버튼별 배경/테두리 (브랜드 색은 @theme 토큰으로 등록해 둠) */
const SOCIAL_STYLE: Record<LoginModalData["socials"][number]["id"], string> = {
    kakao: "bg-kakao",
    naver: "bg-white",
    google: "border border-zinc-100 bg-white",
};

interface Props {
    data: LoginModalData;
    open: boolean;
    onClose: () => void;
}

/** 로그인 / 회원가입 모달 */
export default function LoginModal({ data, open, onClose }: Props) {
    const idInputRef = useRef<HTMLInputElement>(null);

    // ESC 로 닫기 + 열려 있는 동안 뒤쪽 페이지 스크롤 잠그기
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        idInputRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        // 오버레이: 바깥을 누르면 닫힌다
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            {/* 안쪽 클릭이 오버레이까지 전달되지 않도록 막는다 */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-modal-title"
                onClick={(event) => event.stopPropagation()}
                className="box-border flex w-modal justify-center bg-white px-6 pb-6"
            >
                <div className="flex w-[520px] flex-col gap-6">
                    {/* 닫기 버튼 */}
                    <div className="flex justify-end pb-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer text-zinc-900"
                        >
                            <span className="sr-only">닫기</span>
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2
                            id="login-modal-title"
                            className="text-lead font-semibold text-zinc-900"
                        >
                            {data.title}
                        </h2>

                        <div className="flex flex-col items-center gap-6">
                            <div className="flex w-full flex-col gap-5">
                                {/* 아이디 / 비밀번호 */}
                                <form
                                    onSubmit={(event) => event.preventDefault()}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="login-id" className="sr-only">
                                            아이디(이메일)
                                        </label>
                                        <input
                                            id="login-id"
                                            ref={idInputRef}
                                            type="email"
                                            placeholder={data.idPlaceholder}
                                            className="box-border w-full border border-zinc-100 px-4 py-4 text-lead text-zinc-900 outline-none placeholder:text-zinc-300"
                                        />
                                        <label htmlFor="login-password" className="sr-only">
                                            비밀번호
                                        </label>
                                        <input
                                            id="login-password"
                                            type="password"
                                            placeholder={data.passwordPlaceholder}
                                            className="box-border w-full border border-zinc-100 px-4 py-4 text-lead text-zinc-900 outline-none placeholder:text-zinc-300"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-[60px] w-full cursor-pointer bg-zinc-200 px-4 py-3 text-lead font-bold text-white shadow-[0_4px_16px_0_rgba(255,255,255,0.15)]"
                                    >
                                        {data.submitLabel}
                                    </button>
                                </form>

                                <div className="flex flex-col gap-5">
                                    {/* 또는 구분선 */}
                                    <div className="flex items-center gap-2">
                                        <hr className="flex-1 border-zinc-100" />
                                        <span className="text-body text-zinc-300">
                                            {data.dividerLabel}
                                        </span>
                                        <hr className="flex-1 border-zinc-100" />
                                    </div>

                                    {/* 소셜 로그인 */}
                                    <ul className="flex flex-col gap-3">
                                        {data.socials.map((social) => (
                                            <li key={social.id}>
                                                <button
                                                    type="button"
                                                    className={`relative box-border flex h-[60px] w-full cursor-pointer items-center justify-center text-sub font-semibold text-blue-dark shadow-[0_18px_30px_0_rgba(131,119,198,0.05)] ${SOCIAL_STYLE[social.id]}`}
                                                >
                                                    <Image
                                                        src={social.icon}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                        className="absolute left-5 size-6"
                                                    />
                                                    {social.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* 회원가입 / 아이디 찾기 / 비밀번호 재설정 */}
                            <ul className="flex items-center">
                                {data.helpLinks.map((link, index) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className={`flex h-12 w-40 items-center justify-center text-body font-medium text-zinc-500 ${
                                                index === 1
                                                    ? "border-x border-zinc-100"
                                                    : ""
                                            }`}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
