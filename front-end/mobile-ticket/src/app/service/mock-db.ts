import { AxiosInstance } from 'axios';

// Mock DB LocalStorage prefix
const DB_PREFIX = 'ssalon_mock_';

// Default seeded profile
const DEFAULT_PROFILE = {
  id: 1,
  nickname: '살롱길동',
  profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  gender: 'M',
  address: '서울특별시 마포구 월드컵북로',
  introduction: '반갑습니다! 3D 증표 모임 살롱에 함께해요 🌱',
  interests: ['독서', '디자인', '보드게임'],
  email: 'gildong@ssalon.co.kr'
};

// Default seeded categories
const SEED_CATEGORIES = [
  { id: 1, name: '문화/예술', icon: '🎨' },
  { id: 2, name: '보드게임/오락', icon: '🎲' },
  { id: 3, name: '스포츠/레저', icon: '⚽' },
  { id: 4, name: '맛집/카페', icon: '☕' },
  { id: 5, name: '어학/공부', icon: '📚' }
];

// Default seeded Moims (Meetings)
const SEED_MOIMS = [
  {
    id: 'moim-101',
    title: '성산동 보드게임 & 커피 소모임 🎲',
    description: '토요일 오후에 맛있는 커피를 마시며 간단하고 재밌는 보드게임(티켓 투 라이드, 카르카손)을 즐기실 분들을 모집합니다!',
    capacity: 6,
    date: '2026-06-15T14:00:00Z',
    schedule: '2026-06-15 오후 2시',
    fee: 0,
    payment: false,
    location: '성산동 커피앤톡 카페',
    category: '보드게임/오락',
    creatorId: 2,
    creatorNickname: '보드마스터',
    creatorProfilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    participantsCount: 3,
    status: 'ACTIVE'
  },
  {
    id: 'moim-102',
    title: '한강 백두대간 노을 야간 러닝 🏃‍♂️',
    description: '망원지구에서 양화대교 방향으로 가볍게 5km 러닝 후 시원한 캔맥주 한 잔 같이 해요. 초보자도 환영합니다!',
    capacity: 10,
    date: '2026-06-20T19:00:00Z',
    schedule: '2026-06-20 오후 7시',
    fee: 5000,
    payment: true,
    location: '망원한강공원 안내판 앞',
    category: '스포츠/레저',
    creatorId: 3,
    creatorNickname: '러닝러버',
    creatorProfilePictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    participantsCount: 4,
    status: 'ACTIVE'
  },
  {
    id: 'moim-103',
    title: '반 고흐 특별전 투어 및 드로잉 🎨',
    description: '서울시립미술관 반 고흐 특별전을 관람하고, 근처 카페에 모여 드로잉 북에 가볍게 소감을 드로잉하는 힐링 모임입니다.',
    capacity: 5,
    date: '2026-06-22T10:00:00Z',
    schedule: '2026-06-22 오전 10시',
    fee: 15000,
    payment: true,
    location: '시청역 서울시립미술관 입구',
    category: '문화/예술',
    creatorId: 1, // 홍길동이 개최자
    creatorNickname: '살롱길동',
    creatorProfilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    participantsCount: 1,
    status: 'ACTIVE'
  },
  {
    id: 'moim-104',
    title: '성수 핫플 에스프레소 바 투어 ☕',
    description: '성수동의 가장 핫한 에스프레소 바 2곳을 다니며 크레마 넘치는 진한 커피와 디저트를 함께 탐방하는 투어 모임입니다.',
    capacity: 4,
    date: '2026-06-25T13:00:00Z',
    schedule: '2026-06-25 오후 1시',
    fee: 0,
    payment: false,
    location: '성수역 3번 출구',
    category: '맛집/카페',
    creatorId: 4,
    creatorNickname: '커피요정',
    creatorProfilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    participantsCount: 2,
    status: 'ACTIVE'
  },
  {
    id: 'moim-105',
    title: '망원 한강 피크닉 & 북 토크 📚',
    description: '시원한 강바람을 맞으며 인생 책 한 권씩 소개해봐요. 맛있는 샌드위치와 돗자리는 준비되어 있습니다!',
    capacity: 8,
    date: '2026-06-28T15:00:00Z',
    schedule: '2026-06-28 오후 3시',
    fee: 10000,
    payment: true,
    location: '망원 한강공원 초입 잔디밭',
    category: '어학/공부',
    creatorId: 5,
    creatorNickname: '동네피플',
    creatorProfilePictureUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    participantsCount: 2,
    status: 'ACTIVE'
  },
  {
    id: 'moim-106',
    title: '나만의 가죽 카드지갑 만들기 클래스 👜',
    description: '기본 도구 사용법부터 새들 스티치까지 배워 직접 가죽 카드 지갑을 완성해보는 원데이 클래스입니다.',
    capacity: 4,
    date: '2026-07-02T18:30:00Z',
    schedule: '2026-07-02 오후 6시 30분',
    fee: 35000,
    payment: true,
    location: '합정 아뜰리에 가죽 공방',
    category: '문화/예술',
    creatorId: 6,
    creatorNickname: '달리기선수',
    creatorProfilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    participantsCount: 1,
    status: 'ACTIVE'
  }
];

// Helper to get/set LocalStorage items
const getStorageItem = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  const val = localStorage.getItem(DB_PREFIX + key);
  return val ? JSON.parse(val) : defaultValue;
};

const setStorageItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
};

// Initialize localStorage DB
export const initMockDb = () => {
  if (typeof window === 'undefined') return;

  if (localStorage.getItem(DB_PREFIX + 'initialized') !== 'v4') {
    setStorageItem('profile', DEFAULT_PROFILE);
    setStorageItem('categories', SEED_CATEGORIES);
    setStorageItem('moims', SEED_MOIMS);
    
    // Seed meeting participant relations (userIds enrolled in moim)
    // Moim 101: users 1 (hong), 2 (creator), 5
    // Moim 102: users 3 (creator), 6, 7, 8
    // Moim 103: users 1 (hong, creator)
    // Moim 104: users 1 (hong), 4 (creator)
      setStorageItem('participants', {
        'moim-101': [
          { userId: 1, nickname: '살롱길동', profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', attendance: true },
          { userId: 2, nickname: '보드마스터', profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', attendance: true },
          { userId: 5, nickname: '동네피플', profilePictureUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', attendance: false }
        ],
        'moim-102': [
          { userId: 3, nickname: '러닝러버', profilePictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', attendance: true },
          { userId: 6, nickname: '달리기선수', profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', attendance: true },
          { userId: 7, nickname: '아침형인간', profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', attendance: false },
          { userId: 8, nickname: '러너킴', profilePictureUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', attendance: false }
        ],
        'moim-103': [
          { userId: 1, nickname: '살롱길동', profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', attendance: true }
        ],
        'moim-104': [
          { userId: 1, nickname: '살롱길동', profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', attendance: true },
          { userId: 4, nickname: '커피요정', profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', attendance: true }
        ],
        'moim-105': [
          { userId: 5, nickname: '동네피플', profilePictureUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', attendance: true },
          { userId: 1, nickname: '살롱길동', profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', attendance: false }
        ],
        'moim-106': [
          { userId: 6, nickname: '달리기선수', profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', attendance: true }
        ]
      });

    // Seed Tickets (3D Decoration layout JSON mapping)
    // Default tickets for each moim containing simple Fabric.js representations
      setStorageItem('tickets', {
        'moim-101': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500',
            backgroundColor: '#ffe5e5',
            fabric: { objects: [{ type: 'text', text: 'BOARD GAME SATURDAY', left: 50, top: 100, fill: '#ff4d4d' }] }
          })
        },
        'moim-102': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500',
            backgroundColor: '#e6f7ff',
            fabric: { objects: [{ type: 'text', text: 'RUNNING TO THE SUNSET', left: 40, top: 100, fill: '#1890ff' }] }
          })
        },
        'moim-103': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
            backgroundColor: '#f6ffed',
            fabric: { objects: [{ type: 'text', text: 'VAN GOGH DRAWING', left: 60, top: 100, fill: '#52c41a' }] }
          })
        },
        'moim-104': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500',
            backgroundColor: '#fff7e6',
            fabric: { objects: [{ type: 'text', text: 'ESPRESSO TOUR', left: 70, top: 100, fill: '#fa8c16' }] }
          })
        },
        'moim-105': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500',
            backgroundColor: '#e6f7ff',
            fabric: { objects: [{ type: 'text', text: 'HAN RIVER BOOK TALK', left: 40, top: 100, fill: '#1890ff' }] }
          })
        },
        'moim-106': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500',
            backgroundColor: '#fff7e6',
            fabric: { objects: [{ type: 'text', text: 'LEATHER CLASS', left: 30, top: 100, fill: '#fa8c16' }] }
          })
        }
      });

    // Seed Diaries (3D decoration layout JSON mapping for back-side)
      setStorageItem('diaries', {
        'moim-101': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500',
            backgroundColor: '#ffe5e5',
            fabric: { objects: [{ type: 'text', text: 'BOARD GAME MEMORIES', left: 50, top: 100, fill: '#ff4d4d' }] }
          })
        },
        'moim-102': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500',
            backgroundColor: '#e6f7ff',
            fabric: { objects: [{ type: 'text', text: 'RUNNING MEMORIES', left: 40, top: 100, fill: '#1890ff' }] }
          })
        },
        'moim-103': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
            backgroundColor: '#f6ffed',
            fabric: { objects: [{ type: 'text', text: 'VAN GOGH MEMORIES', left: 60, top: 100, fill: '#52c41a' }] }
          })
        },
        'moim-104': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500',
            backgroundColor: '#fff7e6',
            fabric: { objects: [{ type: 'text', text: 'ESPRESSO MEMORIES', left: 70, top: 100, fill: '#fa8c16' }] }
          })
        },
        'moim-105': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500',
            backgroundColor: '#e6f7ff',
            fabric: { objects: [] }
          })
        },
        'moim-106': {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500',
            backgroundColor: '#fff7e6',
            fabric: { objects: [] }
          })
        }
      });

    // Seed Moim Reviews
    setStorageItem('reviews', {
      'moim-101': {
        description: '보드게임 너무 재밌었고 다들 처음 봤는데 매너있고 친절해서 좋았어요! 담에 꼭 또 만나요.',
        diaryPictureUrls: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500']
      }
    });

    // Seed Chat messages
      setStorageItem('chats', {
        'moim-101': [
          { senderId: 2, senderNickname: '보드마스터', content: '안녕하세요! 모임 개설 완료했습니다. 보드게임 준비 완료입니다.', timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString() },
          { senderId: 1, senderNickname: '살롱길동', content: '반가워요! 이번 주에 뵙겠습니다.', timestamp: new Date(Date.now() - 2.5 * 3600 * 1000).toISOString() }
        ],
        'moim-102': [
          { senderId: 3, senderNickname: '러닝러버', content: '다들 몸 잘 풀고 오셔요! 날씨 시원하니 아주 좋을 거 같습니다.', timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString() }
        ],
        'moim-103': [
          { senderId: 1, senderNickname: '살롱길동', content: '미술관 투어 모임방입니다! 소통용 톡방 개설했어요.', timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString() }
        ],
        'moim-104': [
          { senderId: 4, senderNickname: '커피요정', content: '에스프레소 투어 코스 공유해 드려요.', timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() }
        ],
        'moim-105': [
          { senderId: 5, senderNickname: '동네피플', content: '책 추천 모임입니다! 다들 편하게 오세요.', timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString() }
        ],
        'moim-106': [
          { senderId: 6, senderNickname: '달리기선수', content: '공방 예약 완료되었습니다. 재료 준비해둘게요!', timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() }
        ]
      });
  
      // Set initialized
      localStorage.setItem(DB_PREFIX + 'initialized', 'v4');
  }
};

// Custom adapter to mock HTTP requests via Axios
export const setupMockInterceptors = (instance: AxiosInstance) => {
  instance.defaults.adapter = async (config) => {
    initMockDb();

    const url = config.url || '';
    const method = (config.method || 'get').toLowerCase();
    let body: any = {};
    if (config.data) {
      try {
        body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      } catch (e) {
        body = config.data;
      }
    }

    // latency simulator (150ms)
    await new Promise((resolve) => setTimeout(resolve, 150));

    let resData: any = null;
    let status = 200;

    const profile = getStorageItem('profile', DEFAULT_PROFILE);
    const moims = getStorageItem('moims', SEED_MOIMS);
    const participants = getStorageItem('participants', {});
    const tickets = getStorageItem('tickets', {});
    const diaries = getStorageItem('diaries', {});
    const chats = getStorageItem('chats', {});

    try {
      // 1. Authentication & Profile
      if (url.includes('/users/me/profile') && method === 'get') {
        resData = profile;
      } else if (url.includes('/users/me/profile') && method === 'patch') {
        const updated = { ...profile, ...body };
        setStorageItem('profile', updated);
        resData = updated;
      } else if (url.includes('/users/me/signup-verify') && method === 'get') {
        resData = { isRegistered: true };
      } else if (url.includes('/auth/signup') && method === 'post') {
        const newProfile = {
          ...profile,
          nickname: body.nickname || '살롱길동',
          gender: body.gender || 'M',
          address: body.address || '서울특별시',
          introduction: body.introduction || '',
          interests: body.interests || []
        };
        setStorageItem('profile', newProfile);
        resData = newProfile;
      } else if (url.includes('/auth/logout') && method === 'delete') {
        resData = { success: true };
      } else if (url.includes('/users/me') && method === 'delete') {
        resData = { success: true };
      } else if (url.includes('/users/email/profile') && method === 'get') {
        resData = profile;
      }

      // 2. Categories
      else if (url.includes('/category/all') && method === 'get') {
        resData = getStorageItem('categories', SEED_CATEGORIES);
      } else if (url.includes('category/recommend') && method === 'get') {
        resData = getStorageItem('categories', SEED_CATEGORIES).slice(0, 3);
      }

      // 3. Moims (Meetings)
      else if (url.includes('/moims/home') && method === 'get') {
        const categories = getStorageItem('categories', SEED_CATEGORIES);
        const homeMeetings = categories.map((cat: any) => {
          const meetingListForCat = moims
            .filter((m: any) => m.category === cat.name)
            .map((m: any) => {
              const ticketInfo = tickets[m.id] ? JSON.parse(tickets[m.id].resultJSON) : null;
              return {
                moimId: m.id,
                categoryName: m.category,
                meetingTitle: m.title,
                isCreator: m.creatorId === profile.id,
                isEnd: new Date(m.date).getTime() < Date.now(),
                backgroundColor: ticketInfo?.backgroundColor || '#ffffff',
                ticketThumb: ticketInfo?.thumbnailUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'
              };
            });
          return {
            categoryName: cat.name,
            meetingList: meetingListForCat
          };
        });
        resData = {
          content: homeMeetings,
          hasNext: false
        };
      } else if (url.includes('/moims/recommend') && method === 'get') {
        resData = moims.slice(0, 3).map((m: any) => {
          const ticketInfo = tickets[m.id] ? JSON.parse(tickets[m.id].resultJSON) : null;
          return {
            moimId: m.id,
            categoryName: m.category,
            meetingTitle: m.title,
            isCreator: m.creatorId === profile.id,
            isEnd: new Date(m.date).getTime() < Date.now(),
            backgroundColor: ticketInfo?.backgroundColor || '#ffffff',
            ticketThumb: ticketInfo?.thumbnailUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'
          };
        });
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/attendance\/(\d+)/) && method === 'post') {
        const matches = url.match(/\/moims\/([A-Za-z0-9-]+)\/attendance\/(\d+)/)!;
        const mId = matches[1];
        const uId = parseInt(matches[2]);
        const list = participants[mId] || [];
        const found = list.find((u: any) => u.userId === uId);
        if (found) {
          found.attendance = !found.attendance;
          setStorageItem('participants', { ...participants, [mId]: list });
        }
        resData = { success: true };
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/users\/(\d+)/) && method === 'delete') {
        // Leave or kick user from moim
        const matches = url.match(/\/moims\/([A-Za-z0-9-]+)\/users\/(\d+)/)!;
        const mId = matches[1];
        const uId = parseInt(matches[2]);
        let list = participants[mId] || [];
        list = list.filter((u: any) => u.userId !== uId);
        setStorageItem('participants', { ...participants, [mId]: list });

        // Update moim count
        const targetMoim = moims.find((m: any) => m.id === mId);
        if (targetMoim) {
          targetMoim.participantsCount = list.length;
          setStorageItem('moims', moims);
        }
        resData = { success: true };
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/users/) && method === 'get') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)\/users/)![1];
        resData = participants[mId] || [];
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/users/) && method === 'post') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)\/users/)![1];
        const list = participants[mId] || [];
        if (!list.some((u: any) => u.userId === profile.id)) {
          list.push({
            userId: profile.id,
            nickname: profile.nickname,
            profilePictureUrl: profile.profilePictureUrl,
            attendance: false
          });
          setStorageItem('participants', { ...participants, [mId]: list });

          const targetMoim = moims.find((m: any) => m.id === mId);
          if (targetMoim) {
            targetMoim.participantsCount = list.length;
            setStorageItem('moims', moims);
          }
        }
        resData = { success: true };
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/participant/) && method === 'get') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)\/participant/)![1];
        const list = participants[mId] || [];
        resData = list.some((u: any) => u.userId === profile.id);
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/creator/) && method === 'get') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)\/creator/)![1];
        const targetMoim = moims.find((m: any) => m.id === mId);
        resData = targetMoim ? targetMoim.creatorId === profile.id : false;
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/billings/) && method === 'get') {
        // Billings information
        resData = [
          { id: 'pay-01', userId: profile.id, status: 'PAID', amount: 5000 }
        ];
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/billings/) && method === 'post') {
        // Pay fee kakao payment details redirect URL simulation
        resData = {
          next_redirect_mobile_url: `${window.location.origin}${window.location.pathname}#/web/meeting-info?moimId=${url.split('/')[2]}`,
          next_redirect_pc_url: `${window.location.origin}${window.location.pathname}#/web/meeting-info?moimId=${url.split('/')[2]}`
        };
        // Auto enroll on billing simulation
        const mId = url.split('/')[2];
        const list = participants[mId] || [];
        if (!list.some((u: any) => u.userId === profile.id)) {
          list.push({
            userId: profile.id,
            nickname: profile.nickname,
            profilePictureUrl: profile.profilePictureUrl,
            attendance: false
          });
          setStorageItem('participants', { ...participants, [mId]: list });
          const targetMoim = moims.find((m: any) => m.id === mId);
          if (targetMoim) {
            targetMoim.participantsCount = list.length;
            setStorageItem('moims', moims);
          }
        }
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/me\/payment/) && method === 'get') {
        resData = { id: 'pay-01', status: 'PAID' };
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)\/billings\/([A-Za-z0-9-]+)/) && method === 'delete') {
        resData = { success: true };
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)/) && method === 'get') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)/)![1];
        const found = moims.find((m: any) => m.id === mId);
        if (found) {
          const list = participants[mId] || [];
          const ticketInfo = tickets[mId] ? JSON.parse(tickets[mId].resultJSON) : null;
          resData = {
            id: found.id,
            category: found.category,
            payment: found.fee || 0,
            creator: found.creatorNickname,
            creatorProfilePictureUrl: found.creatorProfilePictureUrl,
            participants: list.map((u: any) => ({
              userId: u.userId,
              nickname: u.nickname,
              profilePictureUrl: u.profilePictureUrl,
              attendance: u.attendance
            })),
            meetingPictureUrls: [
              ticketInfo?.thumbnailUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'
            ],
            title: found.title,
            description: found.description,
            location: found.location,
            capacity: found.capacity,
            meetingDate: found.date,
            isSharable: true,
            backgroundColor: ticketInfo?.backgroundColor || '#ffffff'
          };
        } else {
          status = 404;
          throw new Error('Moim not found');
        }
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)/) && method === 'patch') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)/)![1];
        const idx = moims.findIndex((m: any) => m.id === mId);
        if (idx !== -1) {
          moims[idx] = { ...moims[idx], ...body };
          setStorageItem('moims', moims);
          resData = moims[idx];
        } else {
          status = 404;
          throw new Error('Moim not found');
        }
      } else if (url.match(/\/moims\/([A-Za-z0-9-]+)/) && method === 'delete') {
        const mId = url.match(/\/moims\/([A-Za-z0-9-]+)/)![1];
        const updated = moims.filter((m: any) => m.id !== mId);
        setStorageItem('moims', updated);
        resData = { success: true };
      } else if (url.includes('/moims/search/keyword') && method === 'get') {
        const keyword = String(config.params?.keyword || '').toLowerCase();
        const filtered = moims.filter((m: any) => m.title.toLowerCase().includes(keyword) || m.description.toLowerCase().includes(keyword));
        const mapped = filtered.map((m: any) => {
          const ticketInfo = tickets[m.id] ? JSON.parse(tickets[m.id].resultJSON) : null;
          return {
            moimId: m.id,
            categoryName: m.category,
            meetingTitle: m.title,
            isCreator: m.creatorId === profile.id,
            isEnd: new Date(m.date).getTime() < Date.now(),
            backgroundColor: ticketInfo?.backgroundColor || '#ffffff',
            ticketThumb: ticketInfo?.thumbnailUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'
          };
        });
        resData = {
          content: mapped,
          hasNext: false
        };
      } else if (url.includes('/moims') && method === 'get') {
        // Custom query checks
        const isParticipantQuery = config.params?.isParticipant === 'true';
        const isEndQuery = config.params?.isEnd === 'true';
        let filtered = [...moims];
        if (isParticipantQuery) {
          filtered = filtered.filter((m: any) => {
            const list = participants[m.id] || [];
            return list.some((u: any) => u.userId === profile.id);
          });
        }
        if (isEndQuery) {
          // Finished moims simulation (older dates)
          filtered = filtered.filter((m: any) => new Date(m.date).getTime() < Date.now());
        } else {
          // Active moims simulation
          filtered = filtered.filter((m: any) => new Date(m.date).getTime() >= Date.now());
        }
        const mapped = filtered.map((m: any) => {
          const ticketInfo = tickets[m.id] ? JSON.parse(tickets[m.id].resultJSON) : null;
          return {
            moimId: m.id,
            categoryName: m.category,
            meetingTitle: m.title,
            isCreator: m.creatorId === profile.id,
            isEnd: new Date(m.date).getTime() < Date.now(),
            backgroundColor: ticketInfo?.backgroundColor || '#ffffff',
            ticketThumb: ticketInfo?.thumbnailUrl || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'
          };
        });
        resData = {
          content: mapped,
          hasNext: false
        };
      } else if (url.includes('/moims') && method === 'post') {
        const newId = 'moim-' + Math.random().toString(36).substr(2, 9);
        const newMoim = {
          id: newId,
          title: body.title || '새 모임',
          description: body.description || '',
          capacity: body.capacity || 5,
          date: body.date || new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
          schedule: body.schedule || '시간 미지정',
          fee: body.fee || 0,
          payment: body.fee > 0,
          location: body.location || '미정',
          category: body.category || '기타',
          creatorId: profile.id,
          creatorNickname: profile.nickname,
          creatorProfilePictureUrl: profile.profilePictureUrl,
          participantsCount: 1,
          status: 'ACTIVE'
        };
        moims.push(newMoim);
        setStorageItem('moims', moims);

        // Auto join creator
        setStorageItem('participants', {
          ...participants,
          [newId]: [{
            userId: profile.id,
            nickname: profile.nickname,
            profilePictureUrl: profile.profilePictureUrl,
            attendance: true
          }]
        });

        // Set default ticket
        setStorageItem('tickets', {
          ...tickets,
          [newId]: {
            resultJSON: JSON.stringify({
              thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
              backgroundColor: '#ffffff',
              fabric: { objects: [{ type: 'text', text: newMoim.title, left: 30, top: 100, fill: '#000000' }] }
            })
          }
        });

        resData = newMoim;
      }

      // 4. Tickets (3D badge layouts)
      else if (url.match(/\/tickets\/([A-Za-z0-9-]+)\/image/) && method === 'post') {
        resData = { fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500' };
      } else if (url.match(/\/tickets\/([A-Za-z0-9-]+)\/link/) && method === 'get') {
        resData = `ssalon-qr-verification-link-code-${url.split('/')[2]}`;
      } else if (url.match(/\/tickets\/([A-Za-z0-9-]+)\/link/) && method === 'post') {
        // QR check simulation (verify attendance)
        const mId = url.split('/')[2];
        const list = participants[mId] || [];
        const found = list.find((u: any) => u.userId === profile.id);
        if (found) {
          found.attendance = true;
          setStorageItem('participants', { ...participants, [mId]: list });
        }
        resData = { success: true, message: 'QR 검증 및 출석이 완료되었습니다!' };
      } else if (url.match(/\/tickets\/([A-Za-z0-9-]+)/) && method === 'get') {
        const mId = url.match(/\/tickets\/([A-Za-z0-9-]+)/)![1];
        const ticketVal = tickets[mId] || {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
            backgroundColor: '#ffffff',
            fabric: { objects: [] }
          })
        };
        resData = JSON.parse(ticketVal.resultJSON);
      } else if (url.match(/\/tickets\/([A-Za-z0-9-]+)/) && (method === 'post' || method === 'put')) {
        const mId = url.match(/\/tickets\/([A-Za-z0-9-]+)/)![1];
        let fabricData = '';
        if (config.data instanceof FormData) {
          fabricData = config.data.get('json') as string || config.data.get('resultJSON') as string || '';
        } else {
          fabricData = body.json || body.resultJSON || JSON.stringify(body);
        }
        const updated = { resultJSON: fabricData };
        tickets[mId] = updated;
        setStorageItem('tickets', tickets);
        resData = updated;
      }

      // 5. Diary & Moim reviews
      else if (url.match(/\/diary\/([A-Za-z0-9-]+)\/info/) && method === 'get') {
        const mId = url.match(/\/diary\/([A-Za-z0-9-]+)\/info/)![1];
        const reviews = getStorageItem('reviews', {});
        if (reviews[mId]) {
          resData = reviews[mId];
        } else {
          resData = {
            description: '최고의 모임이었어요!',
            diaryPictureUrls: []
          };
        }
      } else if (url.match(/\/diary\/([A-Za-z0-9-]+)\/info/) && (method === 'post' || method === 'put' || method === 'patch')) {
        const mId = url.match(/\/diary\/([A-Za-z0-9-]+)\/info/)![1];
        const reviews = getStorageItem('reviews', {});
        reviews[mId] = body;
        setStorageItem('reviews', reviews);
        resData = body;
      } else if (url.match(/\/diary\/([A-Za-z0-9-]+)\/image/) && method === 'post') {
        resData = { fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500' };
      } else if (url.match(/\/diary\/([A-Za-z0-9-]+)/) && method === 'get') {
        const mId = url.match(/\/diary\/([A-Za-z0-9-]+)/)![1];
        resData = diaries[mId] || {
          resultJSON: JSON.stringify({
            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
            backgroundColor: '#ffffff',
            fabric: { objects: [] }
          })
        };
      } else if (url.match(/\/diary\/([A-Za-z0-9-]+)/) && (method === 'post' || method === 'put')) {
        const mId = url.match(/\/diary\/([A-Za-z0-9-]+)/)![1];
        let fabricData = '';
        if (config.data instanceof FormData) {
          fabricData = config.data.get('json') as string || config.data.get('resultJSON') as string || '';
        } else {
          fabricData = body.json || body.resultJSON || JSON.stringify(body);
        }
        const updated = { resultJSON: fabricData };
        diaries[mId] = updated;
        setStorageItem('diaries', diaries);
        resData = updated;
      }

      // 6. Image Upload General
      else if (url.includes('/image-upload/general') && method === 'post') {
        resData = { fileUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500' };
      } else if (url.match(/\/image\/generate\/([A-Za-z0-9-]+)/) && method === 'post') {
        // AI image generation Karlo simulation
        resData = {
          fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500'
        };
      }

      // 7. Chats
      else if (url.match(/\/chat-history\/([A-Za-z0-9-]+)/) && method === 'get') {
        const mId = url.match(/\/chat-history\/([A-Za-z0-9-]+)/)![1];
        resData = chats[mId] || [];
      } else if (url.match(/\/chat\/([A-Za-z0-9-]+)\/users/) && method === 'get') {
        const mId = url.match(/\/chat\/([A-Za-z0-9-]+)\/users/)![1];
        resData = participants[mId] || [];
      }

      // Fallback
      if (resData === null) {
        console.warn('Unmatched Mock API Call:', method, url, body);
        resData = { success: true };
      }

      return {
        data: resData,
        status: status,
        statusText: 'OK',
        headers: {},
        config
      };
    } catch (err: any) {
      console.error('Mock API Failure:', err);
      return Promise.reject({
        response: {
          data: { message: err.message || '서버 응답 오류' },
          status: status || 500,
          statusText: 'Error',
          headers: {},
          config
        }
      });
    }
  };
};
