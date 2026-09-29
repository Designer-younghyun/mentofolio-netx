import type {
    ArticleData,
    BadgeKind,
    CategoryTab,
    CommentData,
    CommentSort,
    ContentCardData,
    FooterData,
    HeaderData,
    LoginModalData,
    MentoProfile,
    SidebarData,
    Writer,
} from "./types";

export const PAGE_TITLE = "콘텐츠";

export const header: HeaderData = {
    logo: { src: "/images/logo.svg", alt: "MentoFolio", href: "#" },
    search: { placeholder: "검색어를 입력해주세요.", action: "#" },
    login: { label: "로그인/회원가입", href: "#" },
};

export const categoryTabs: CategoryTab[] = [
    { id: "all", label: "전체", href: "#" },
    { id: "money", label: "재테크·경제", href: "#" },
    { id: "culture", label: "인문·문화", href: "#" },
    { id: "business", label: "비즈니스·자기개발", href: "#" },
    { id: "it", label: "IT테크·트렌드", href: "#" },
];

export const activeTabId = "all";

const CARD_TITLE =
    "콘텐츠 타이틀은 2줄을 기본으로 하고, 2줄을 넘어가면 ...처리로 해주세요 " +
    "콘텐츠 타이틀은 2줄을 기본으로 하고, 2줄을 넘어가면 ...처리로 해주세요";

const DDAY = "유료 전환까지 D일 23:59:12 남음";

const WRITER: Writer = {
    name: "한석준",
    category: "IT테크 · 트렌드",
    avatar: "/images/avatar.png",
};

/** 시안에서 반복되는 카드 4종 (썸네일 / 배지 / D-day 조합) */
type CardPattern = { thumbnail: string; badges: BadgeKind[]; dday?: string };

const CARD_PATTERNS: CardPattern[] = [
    { thumbnail: "/images/thumb-01.png", badges: ["new", "free", "video"], dday: DDAY },
    { thumbnail: "/images/thumb-02.png", badges: [], dday: DDAY },
    { thumbnail: "/images/thumb-03.png", badges: ["new"] },
    { thumbnail: "/images/thumb-04.png", badges: ["free"] },
];

const TOTAL_CARDS = 32;

/** 4종 패턴을 순환시켜 리스트를 만든다 (기존 index.html과 동일한 순서). */
export const contentCards: ContentCardData[] = Array.from(
    { length: TOTAL_CARDS },
    (_unused, index): ContentCardData => {
        const pattern = CARD_PATTERNS[index % CARD_PATTERNS.length];
        return {
            id: index + 1,
            href: `/contents/${index + 1}`,
            thumbnail: pattern.thumbnail,
            badges: pattern.badges,
            ...(pattern.dday !== undefined ? { dday: pattern.dday } : {}),
            title: CARD_TITLE,
            writer: WRITER,
        };
    },
);

export const moreButtonLabel = "더보기";

export const footer: FooterData = {
    logo: { src: "/images/logo.svg", alt: "MentoFolio" },
    policies: [
        { label: "이용 약관", href: "#" },
        { label: "개인정보처리방침", href: "#" },
        { label: "환불 정책", href: "#" },
    ],
    info: [
        {
            kind: "divider",
            items: [
                "주식회사 아비투스인사이트",
                "사업자등록번호 : 859-81-04014",
                "대표자 : 최정우",
            ],
        },
        {
            kind: "text",
            before: "통신판매업신고번호 : ",
            link: { label: "제2026-서울강남-01968호", href: "#" },
        },
        { kind: "text", before: "주소 : 서울특별시 강남구 언주로 106길 41, 5층(역삼동)" },
        {
            kind: "divider",
            items: ["이메일 : support@mentofolio.com", "전화번호 : 010-2187-4437"],
        },
        { kind: "text", before: "Copyright © 2026 All rights reserved." },
    ],
    notice: [
        "멘토폴리오의 정보/이벤트/UI를 포함한 모든 콘텐츠는 저작권법, 콘텐츠 산업 진흥원의 보호를 받습니다.",
        "무단복제, 전송, 배포, 스크래핑 등의 행위는 관련 법령에 의하여 엄격히 금지됩니다.",
    ],
};

/* ===== 사이드바 ===== */

export const sidebar: SidebarData = {
    menu: [
        { id: "home", label: "홈", href: "/", icon: "home" },
        { id: "recent", label: "최근 본 콘텐츠", href: "#", icon: "recent" },
        { id: "favorite", label: "좋아요 한 콘텐츠", href: "#", icon: "favorite" },
        { id: "alert", label: "알림", href: "#", icon: "alert" },
    ],
    activeMenuId: "home",
    categories: {
        title: "카테고리",
        items: [
            { id: "explore", label: "멘토 탐색", href: "#" },
            { id: "money", label: "재테크·경제", href: "#" },
            { id: "culture", label: "인문·문화", href: "#" },
            { id: "business", label: "비지니스·자기개발", href: "#" },
            { id: "it", label: "IT테크·트렌드", href: "#" },
        ],
    },
    // 비로그인 상태라 목록이 비어 있다. 로그인하면 구독 중인 멘토가 채워진다.
    subscriptions: { title: "구독 중인 멘토", items: [] },
};

/* ===== 로그인 모달 ===== */

export const loginModal: LoginModalData = {
    title: "로그인",
    idPlaceholder: "아이디(이메일) 입력해주세요.",
    passwordPlaceholder: "비밀번호 입력해주세요.",
    submitLabel: "로그인",
    dividerLabel: "또는",
    socials: [
        { id: "kakao", label: "카카오 계정으로 로그인", icon: "/images/logo-kakao.svg" },
        { id: "naver", label: "네이버 계정으로 로그인", icon: "/images/logo-naver.svg" },
        { id: "google", label: "Google계정으로 로그인", icon: "/images/logo-google.svg" },
    ],
    helpLinks: [
        { label: "이메일로 회원가입", href: "#" },
        { label: "아이디 찾기", href: "#" },
        { label: "비밀번호 재설정", href: "#" },
    ],
};

/* ===== 콘텐츠 상세 ===== */

const ARTICLE_BODY = [
    "🤔 지난 1년간 ‘글로벌 메모리 반도체 빅 3(삼성전자·SK하이닉스·마이크론)’ 기업의 주가는 200~300%대의 상승률을 보였어요. 그런데 여전히 밸류에이션 측면에서 ‘저평가’ 얘기가 나오는데 왜 그런가요?",
    "🧑🏻‍🏫 이럴 때일수록 밸류에이션에 대한 이해가 반드시 필요합니다. 특히 한국 투자자에게 지금은 골든타임입니다. 과거엔 그저 ‘싸게 많이 찍어내는 것’이 미덕이었던 메모리가, 이제는 인공지능(AI)의 성능을 결정짓는 핵심 병목이 되었습니다.",
    "“메모리도 엔비디아처럼 높은 멀티플(주가 배수)을 받을 수 있을까?”라는 질문에 스스로 답을 내릴 수 있어야 해요. 특히 최근엔 “반도체 업황이 좋다더라”는 말에 ‘묻지 마’ 투자를 하는 경향이 있는데요. 각 비즈니스 모델이 어떻게 돈을 벌고 왜 시장에서 다르게 평가받는지 그 본질을 알아야 합니다.",
    "밸류에이션은 결국 ‘이 회사가 앞으로 얼마를 벌 것인가’에 대한 시장의 합의입니다. 숫자 자체보다, 그 숫자가 어떤 가정 위에 서 있는지를 읽어내는 연습이 필요합니다.",
];

/** 상세 페이지 더미 데이터. 어떤 id 로 들어와도 같은 형태의 글을 만들어 준다. */
export function getArticle(id: number): ArticleData {
    return {
        id,
        title: "글 제목이 여기에 들어갑니다. 길어질 경우 계속 줄바꿈처리됩니다.",
        date: "1월 17일 10:00",
        views: 385330,
        likes: 320,
        comments: 15000,
        body: ARTICLE_BODY,
        writer: WRITER,
    };
}

/** 상세 페이지 하단에 붙는 추천 영역 (기존 카드 목록을 잘라 재사용) */
export const relatedSections = [
    { id: "related", title: "이 콘텐츠와 비슷한 콘텐츠", cards: contentCards.slice(0, 8) },
    { id: "popular", title: "많은 독자들의 관심을 받은 콘텐츠", cards: contentCards.slice(8, 16) },
];

/* ===== 멘토 헤더 ===== */

export const mentoProfile: MentoProfile = {
    nameLogo: "/images/logo-mento-name.svg",
    displayName: "한석준",
    avatar: "/images/mento-profile.png",
    category: "비즈니스 · 자기개발",
    contentCount: 21,
    subscribed: false,
    badges: ["꾸준한 동행자", "나의 그룹명 기본 제외"],
};

/* ===== 콘텐츠 좋아요 버튼 ===== */

export const likeContentLabel = "콘텐츠 좋아요";

/* ===== 댓글 ===== */

const COMMENT_BODY =
    "Text 길어지면 말 줄임 없이 계속 줄바꿈합니다. Text 길어지면 말 줄임 없이 계속 줄바꿈합니다. " +
    "Text 길어지면 말 줄임 없이 계속 줄바꿈합니다. Text 길어지면 말 줄임 없이 계속 줄바꿈합니다.";

export const commentPlaceholder = "댓글을 작성해주세요.";
export const commentFilterLabel = "내 댓글만 보기";

export const commentSorts: CommentSort[] = [
    { id: "latest", label: "최신순" },
    { id: "likes", label: "좋아요 순" },
];

export const activeCommentSortId = "latest";

export const comments: CommentData[] = [
    {
        id: 1,
        author: "구독자명A",
        time: "N분 전",
        body: COMMENT_BODY,
        likes: 320,
        mentorLiked: true,
        hiddenReplyCount: 2,
    },
    {
        id: 2,
        author: "구독자명B",
        time: "N분 전",
        body: COMMENT_BODY,
        likes: 12,
    },
    {
        id: 3,
        author: "구독자명C",
        time: "N분 전",
        body: COMMENT_BODY,
        likes: 87,
        replies: [
            {
                id: 31,
                author: "구독자명D",
                time: "N분 전",
                mention: "@구독자명C",
                body: "Text 길어지면 말 줄임 없이 계속 줄바꿈합니다. Text 길어지면 말 줄임 없이 계속 줄바꿈합니다.",
                likes: 5,
            },
            {
                id: 32,
                author: "구독자명E",
                time: "N분 전",
                body: "Text 길어지면 말 줄임 없이 계속 줄바꿈합니다.",
                likes: 2,
                mentorLiked: true,
            },
        ],
    },
    {
        id: 4,
        author: "구독자명F",
        time: "N분 전",
        body: COMMENT_BODY,
        likes: 3,
    },
];

/** 댓글 페이지네이션 (더미) */
export const commentPagination = { current: 1, total: 10 };
