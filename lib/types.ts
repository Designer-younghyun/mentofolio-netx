/* ===== 도메인 타입 정의 ===== */

/** 썸네일 위에 올라가는 배지 종류 */
export type BadgeKind = "new" | "free" | "video";

/** 콘텐츠 작성자(멘토) */
export interface Writer {
    name: string;
    /** 예: "IT테크 · 트렌드" */
    category: string;
    avatar: string;
}

/** 콘텐츠 리스트의 카드 1개 */
export interface ContentCardData {
    id: number;
    href: string;
    thumbnail: string;
    badges: BadgeKind[];
    /** 유료 전환 D-day 문구. 없으면 썸네일 하단 바를 렌더하지 않음 */
    dday?: string;
    title: string;
    writer: Writer;
}

/** 카테고리 탭 1개 */
export interface CategoryTab {
    id: string;
    label: string;
    href: string;
}

/** 헤더 구성 값 */
export interface HeaderData {
    logo: { src: string; alt: string; href: string };
    search: { placeholder: string; action: string };
    login: { label: string; href: string };
}

/** 푸터 정책 링크 */
export interface PolicyLink {
    label: string;
    href: string;
}

/**
 * 푸터 사업자 정보 한 줄.
 * - `divider`: 구분선으로 이어 붙이는 여러 조각
 * - `text`: 한 줄짜리 문장(중간에 링크가 들어갈 수 있음)
 */
export type InfoRow =
    | { kind: "divider"; items: string[] }
    | { kind: "text"; before?: string; link?: PolicyLink; after?: string };

/** 푸터 구성 값 */
export interface FooterData {
    logo: { src: string; alt: string };
    policies: PolicyLink[];
    info: InfoRow[];
    /** 줄바꿈되는 저작권 안내 문구 */
    notice: string[];
}

/* ===== 사이드바 ===== */

/** 사이드바 상단 메뉴에 붙는 아이콘 종류 */
export type SideMenuIconKind = "home" | "recent" | "favorite" | "alert";

/** 사이드바 상단 메뉴 1개 */
export interface SideMenuItem {
    id: string;
    label: string;
    href: string;
    icon: SideMenuIconKind;
}

/** 사이드바 구성 값 */
export interface SidebarData {
    /** 홈 / 최근 본 콘텐츠 / 좋아요 한 콘텐츠 / 알림 */
    menu: SideMenuItem[];
    /** 현재 활성화된 메뉴 id */
    activeMenuId: string;
    categories: { title: string; items: CategoryTab[] };
    /** 비로그인 상태에서는 목록이 비어 있다 */
    subscriptions: { title: string; items: Writer[] };
}

/* ===== 로그인 모달 ===== */

/** 소셜 로그인 버튼 1개 */
export interface SocialLogin {
    id: "kakao" | "naver" | "google";
    label: string;
    icon: string;
}

/** 로그인 모달 구성 값 */
export interface LoginModalData {
    title: string;
    idPlaceholder: string;
    passwordPlaceholder: string;
    submitLabel: string;
    dividerLabel: string;
    socials: SocialLogin[];
    helpLinks: PolicyLink[];
}

/* ===== 콘텐츠 상세 ===== */

/** 콘텐츠 상세 페이지 1개 */
export interface ArticleData {
    id: number;
    title: string;
    /** 예: "1월 17일 10:00" */
    date: string;
    views: number;
    likes: number;
    comments: number;
    /** 문단 단위로 끊어 둔 본문 */
    body: string[];
    writer: Writer;
}

/* ===== 멘토 헤더 (콘텐츠 상세 상단 띠) ===== */

export interface MentoProfile {
    /** "[ 한석준 ]" 부분은 Figma 로고를 그대로 내려받아 쓴다 */
    nameLogo: string;
    /** 스크린리더/대체텍스트용 이름 */
    displayName: string;
    avatar: string;
    /** 예: "비즈니스 · 자기개발" */
    category: string;
    contentCount: number;
    /** 구독 중이면 배지 영역, 아니면 구독하기 버튼이 보인다 */
    subscribed: boolean;
    /** 구독 중일 때 표시되는 배지 문구 */
    badges: string[];
}

/* ===== 댓글 ===== */

/** 댓글에 달린 답글 1개 */
export interface CommentReply {
    id: number;
    author: string;
    time: string;
    /** 답글이 누구를 향한 것인지 (@구독자명) */
    mention?: string;
    body: string;
    likes: number;
    /** 멘토가 좋아요를 누른 댓글이면 툴팁이 붙는다 */
    mentorLiked?: boolean;
}

/** 댓글 1개 */
export interface CommentData {
    id: number;
    author: string;
    time: string;
    body: string;
    likes: number;
    mentorLiked?: boolean;
    /** 접혀 있는 답글 개수 ("답글 n개 더 보기") */
    hiddenReplyCount?: number;
    replies?: CommentReply[];
}

/** 댓글 정렬 칩 */
export interface CommentSort {
    id: string;
    label: string;
}
