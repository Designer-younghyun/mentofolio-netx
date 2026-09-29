import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import { footer, header, loginModal, sidebar } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
    title: "콘텐츠 | MentoFolio",
    description: "멘토폴리오 콘텐츠 목록",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                {/* 헤더 / 사이드바 / 로그인 모달은 모든 페이지에 공통으로 붙는다 */}
                <SiteChrome header={header} sidebar={sidebar} loginModal={loginModal} />
                {children}
                <Footer data={footer} />
            </body>
        </html>
    );
}
