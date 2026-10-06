import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import { footer, header, loginModal, sidebar } from "@/lib/data";
import { freesentation } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: "콘텐츠 | MentoFolio",
    description: "멘토폴리오 콘텐츠 목록",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        // freesentation.variable = --font-freesentation 를 정의하는 클래스.
        // globals.css 의 --font-sans 가 이 변수를 읽어 body 전체에 적용된다.
        <html lang="ko" className={freesentation.variable}>
            {/* ───── 폰트 적용 방법 ① CDN (<link> 버전) ─────
                방법 ②를 끄고 아래 두 줄 주석을 풀면 jsDelivr CDN 에서 받아온다.
                globals.css 의 @import 버전보다 이쪽이 빠르다 (요청이 직렬이 아니라 병렬).
                preconnect 를 먼저 깔아 DNS+TLS 왕복을 미리 끝내 두는 게 요령.
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/Freesentation/freesentation@main/Freesentation.css"
                />
            </head>
            */}
            <body>
                {/* 헤더 / 사이드바 / 로그인 모달은 모든 페이지에 공통으로 붙는다 */}
                <SiteChrome header={header} sidebar={sidebar} loginModal={loginModal} />
                {children}
                <Footer data={footer} />
            </body>
        </html>
    );
}
