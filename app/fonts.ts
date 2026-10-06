/* ============================================================================
   폰트 적용 방법 ② next/font/local
   ----------------------------------------------------------------------------
   Next.js 가 woff2 를 빌드 타임에 읽어서
     - 해시가 붙은 URL (/_next/static/media/xxx.woff2) 로 자체 호스팅
     - immutable 캐시 헤더 부여
     - @font-face 를 HTML <head> 에 인라인 주입 (CSS 왕복 1회 제거)
     - 폰트 메트릭을 읽어 size-adjust 폴백을 자동 생성 → CLS 0
   까지 전부 자동으로 처리한다.

   src 경로는 "이 파일(app/fonts.ts) 기준 상대경로" 다.
   ========================================================================== */
import localFont from "next/font/local";

export const freesentation = localFont({
    src: [
        { path: "../public/fonts/Freesentation-4Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/Freesentation-5Medium.woff2", weight: "500", style: "normal" },
        { path: "../public/fonts/Freesentation-6SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../public/fonts/Freesentation-7Bold.woff2", weight: "700", style: "normal" },
    ],
    // globals.css 의 --font-sans 가 이 변수를 읽는다
    variable: "--font-freesentation",
    // 폰트 로드 전에는 폴백으로 먼저 그린다 (텍스트가 안 보이는 FOIT 방지)
    display: "swap",
    // 폰트가 안 떴을 때 대신 쓸 글꼴. 메트릭 보정의 기준이 된다.
    fallback: ["-apple-system", "BlinkMacSystemFont", "malgun gothic", "sans-serif"],
});
