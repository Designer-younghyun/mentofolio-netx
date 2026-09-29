"use client";

import { useState } from "react";
import Header from "./Header";
import LoginModal from "./LoginModal";
import Sidebar from "./Sidebar";
import type { HeaderData, LoginModalData, SidebarData } from "@/lib/types";

interface Props {
    header: HeaderData;
    sidebar: SidebarData;
    loginModal: LoginModalData;
}

/**
 * 헤더 + 사이드바 + 로그인 모달을 묶어 두는 껍데기.
 * "열림/닫힘" 상태를 여기 한 곳에서만 들고 있고, 아래로 내려준다.
 */
export default function SiteChrome({ header, sidebar, loginModal }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <Header
                data={header}
                sidebarOpen={sidebarOpen}
                onMenuClick={() => setSidebarOpen((prev) => !prev)}
                onLoginClick={() => setLoginOpen(true)}
            />
            <Sidebar
                data={sidebar}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <LoginModal
                data={loginModal}
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
            />
        </>
    );
}
