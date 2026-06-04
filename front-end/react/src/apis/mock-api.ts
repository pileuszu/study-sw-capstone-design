import { AxiosInstance } from 'axios';

const DB_PREFIX = 'ssalon_admin_mock_';

const SEED_USERS = [
  {
    userId: 1,
    nickname: '살롱길동',
    email: 'gildong@ssalon.co.kr',
    profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    gender: '남성',
    address: '서울특별시 마포구',
    introduction: '반갑습니다! 3D 증표 모임 살롱에 함께해요 🌱',
    interests: ['독서', '디자인', '보드게임'],
    joinDate: '2026-06-01T09:00:00Z',
    blackReason: null,
    blackTime: null
  },
  {
    userId: 2,
    nickname: '보드마스터',
    email: 'board@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    gender: '남성',
    address: '서울특별시 서대문구',
    introduction: '보드게임 매니아입니다 🎲',
    interests: ['보드게임', 'IT'],
    joinDate: '2026-06-02T10:00:00Z',
    blackReason: null,
    blackTime: null
  },
  {
    userId: 3,
    nickname: '러닝러버',
    email: 'runner@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    gender: '여성',
    address: '서울특별시 용산구',
    introduction: '매일 아침 러닝해요 🏃‍♀️',
    interests: ['스포츠', '건강'],
    joinDate: '2026-06-03T11:00:00Z',
    blackReason: null,
    blackTime: null
  },
  {
    userId: 4,
    nickname: '커피요정',
    email: 'coffee@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    gender: '여성',
    address: '서울특별시 성동구',
    introduction: '하루에 커피 3잔 마십니다 ☕',
    interests: ['맛집/카페', '요리'],
    joinDate: '2026-06-04T12:00:00Z',
    blackReason: null,
    blackTime: null
  },
  {
    userId: 5,
    nickname: '동네피플',
    email: 'neighborhood@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    gender: '남성',
    address: '서울특별시 마포구',
    introduction: '이웃 사촌들과 친해지고 싶어요!',
    interests: ['맛집/카페', '영화'],
    joinDate: '2026-06-04T12:30:00Z',
    blackReason: null,
    blackTime: null
  },
  {
    userId: 6,
    nickname: '불량유저',
    email: 'baduser@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    gender: '남성',
    address: '부산광역시 해운대구',
    introduction: '광고 게시글만 올립니다.',
    interests: ['맛집/카페'],
    joinDate: '2026-06-04T11:00:00Z',
    blackReason: '광고 스팸 살포 및 음란물 유포',
    blackTime: '2026-06-04T12:15:00Z'
  },
  {
    userId: 7,
    nickname: '도배러',
    email: 'spammer@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    gender: '남성',
    address: '인천광역시 부평구',
    introduction: '반갑습니다!!',
    interests: ['게임', '보드게임'],
    joinDate: '2026-06-04T11:05:00Z',
    blackReason: '채팅창 악의적 도배 및 부적절한 언사',
    blackTime: '2026-06-04T12:20:00Z'
  }
];

const SEED_MOIMS = [
  { moimId: 101, meetingTitle: '성산동 보드게임 & 커피 소모임 🎲', categoryName: '보드게임/오락', capacity: 6, fee: 0, creatorNickname: '보드마스터', location: '성산동 커피앤톡 카페' },
  { moimId: 102, meetingTitle: '한강 백두대간 노을 야간 러닝 🏃‍♂️', categoryName: '스포츠/레저', capacity: 10, fee: 5000, creatorNickname: '러닝러버', location: '망원한강공원 안내판 앞' },
  { moimId: 103, meetingTitle: '반 고흐 특별전 투어 및 드로잉 🎨', categoryName: '문화/예술', capacity: 5, fee: 15000, creatorNickname: '살롱길동', location: '시청역 서울시립미술관 입구' },
  { moimId: 104, meetingTitle: '성수 핫플 에스프레소 바 투어 ☕', categoryName: '맛집/카페', capacity: 4, fee: 0, creatorNickname: '커피요정', location: '성수역 3번 출구' }
];

const SEED_REPORTS = [
  {
    id: 1,
    isSolved: false,
    reporterId: 4, // 커피요정
    reportedId: 6, // 불량유저
    reason: '모임 피드와 단체 채팅방에서 불법 도박 사이트 및 성인 광고 스팸 링크를 반복해서 유포하고 있습니다. 즉각 정지 처리 부탁드립니다.',
    reportPictureUrls: ['https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500'],
    reportDate: '2026-06-04T12:10:00Z',
    solvedDate: null
  },
  {
    id: 2,
    isSolved: true,
    reporterId: 3, // 러닝러버
    reportedId: 7, // 도배러
    reason: '러닝 모임 게시글 댓글에 비방글과 함께 의미 없는 글자들을 수십 개씩 올리는 도배 행동을 계속 일삼고 있습니다.',
    reportPictureUrls: [],
    reportDate: '2026-06-04T12:08:00Z',
    solvedDate: '2026-06-04T12:20:00Z'
  }
];

const getStorageItem = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  const val = localStorage.getItem(DB_PREFIX + key);
  return val ? JSON.parse(val) : defaultValue;
};

const setStorageItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
};

export const initAdminMockDb = () => {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(DB_PREFIX + 'initialized') !== 'v3') {
    setStorageItem('users', SEED_USERS);
    setStorageItem('moims', SEED_MOIMS);
    setStorageItem('reports', SEED_REPORTS);
    localStorage.setItem(DB_PREFIX + 'initialized', 'v3');
  }
};

export const setupAdminMockInterceptors = (instance: AxiosInstance) => {
  instance.defaults.adapter = async (config) => {
    initAdminMockDb();

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

    await new Promise((resolve) => setTimeout(resolve, 150));

    const users = getStorageItem('users', SEED_USERS);
    const moims = getStorageItem('moims', SEED_MOIMS);
    const reports = getStorageItem('reports', SEED_REPORTS);

    let resData: any = null;
    let status = 200;

    try {
      // 1. Admin Moims
      if (url.includes('admin/moims') && method === 'get') {
        resData = { content: moims };
      } else if (url.match(/admin\/moims\/(\d+)/) && method === 'delete') {
        const moimId = parseInt(url.match(/admin\/moims\/(\d+)/)![1]);
        const updated = moims.filter((m: any) => m.moimId !== moimId);
        setStorageItem('moims', updated);
        resData = { success: true };
      }

      // 2. Admin Blacklists
      else if (url.includes('admin/blacklists/users') && method === 'get') {
        const blacklist = users.filter((u: any) => u.blackReason !== undefined && u.blackReason !== null);
        resData = {
          content: blacklist,
          hasNext: false
        };
      } else if (url.match(/admin\/blacklists\/users\/(\d+)/) && method === 'post') {
        const userId = parseInt(url.match(/admin\/blacklists\/users\/(\d+)/)![1]);
        const reason = body.blackReason;
        const targetUser = users.find((u: any) => u.userId === userId);
        if (targetUser) {
          targetUser.blackReason = reason || null;
          targetUser.blackTime = reason ? new Date().toISOString() : null;
          setStorageItem('users', users);
        }
        resData = { success: true };
      }

      // 3. Admin Users (must be after blacklists check to avoid conflicts)
      else if (url.includes('admin/users') && method === 'get') {
        resData = users;
      } else if (url.match(/admin\/users\/(\d+)/) && method === 'delete') {
        const userId = parseInt(url.match(/admin\/users\/(\d+)/)![1]);
        const updated = users.filter((u: any) => u.userId !== userId);
        setStorageItem('users', updated);
        resData = { success: true };
      }

      // 4. Admin Reports
      else if (url.includes('admin/reports') && method === 'get') {
        resData = {
          content: reports,
          hasNext: false
        };
      } else if (url.match(/admin\/report\/(\d+)\/state$/) && method === 'post') {
        const reportId = parseInt(url.match(/admin\/report\/(\d+)\/state$/)![1]);
        const targetReport = reports.find((r: any) => r.id === reportId);
        if (targetReport) {
          targetReport.isSolved = !targetReport.isSolved;
          targetReport.solvedDate = targetReport.isSolved ? new Date().toISOString() : null;
          setStorageItem('reports', reports);
        }
        resData = { success: true };
      } else if (url.match(/admin\/report\/(\d+)$/) && method === 'get') {
        const reportId = parseInt(url.match(/admin\/report\/(\d+)$/)![1]);
        const targetReport = reports.find((r: any) => r.id === reportId);
        resData = targetReport || null;
      } else if (url.match(/admin\/report\/(\d+)$/) && method === 'delete') {
        const reportId = parseInt(url.match(/admin\/report\/(\d+)$/)![1]);
        const updated = reports.filter((r: any) => r.id !== reportId);
        setStorageItem('reports', updated);
        resData = { success: true };
      }

      if (resData === null) {
        resData = [];
      }

      return {
        data: resData,
        status: status,
        statusText: 'OK',
        headers: {},
        config
      };
    } catch (err: any) {
      return Promise.reject({
        response: {
          data: { message: err.message || '서버 오류' },
          status: status || 500,
          statusText: 'Error',
          headers: {},
          config
        }
      });
    }
  };
};
