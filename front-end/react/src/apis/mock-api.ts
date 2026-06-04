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
    joinDate: '2026-06-01T09:00:00Z'
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
    joinDate: '2026-06-02T10:00:00Z'
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
    joinDate: '2026-06-03T11:00:00Z'
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
    joinDate: '2026-06-04T12:00:00Z'
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
    joinDate: '2026-06-04T12:30:00Z'
  }
];

const SEED_MOIMS = [
  { moimId: 101, meetingTitle: '성산동 보드게임 & 커피 소모임 🎲', categoryName: '보드게임/오락', capacity: 6, fee: 0, creatorNickname: '보드마스터', location: '성산동 커피앤톡 카페' },
  { moimId: 102, meetingTitle: '한강 백두대간 노을 야간 러닝 🏃‍♂️', categoryName: '스포츠/레저', capacity: 10, fee: 5000, creatorNickname: '러닝러버', location: '망원한강공원 안내판 앞' },
  { moimId: 103, meetingTitle: '반 고흐 특별전 투어 및 드로잉 🎨', categoryName: '문화/예술', capacity: 5, fee: 15000, creatorNickname: '살롱길동', location: '시청역 서울시립미술관 입구' },
  { moimId: 104, meetingTitle: '성수 핫플 에스프레소 바 투어 ☕', categoryName: '맛집/카페', capacity: 4, fee: 0, creatorNickname: '커피요정', location: '성수역 3번 출구' }
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
  if (localStorage.getItem(DB_PREFIX + 'initialized') !== 'v2') {
    setStorageItem('users', SEED_USERS);
    setStorageItem('moims', SEED_MOIMS);
    localStorage.setItem(DB_PREFIX + 'initialized', 'v2');
  }
};

export const setupAdminMockInterceptors = (instance: AxiosInstance) => {
  instance.defaults.adapter = async (config) => {
    initAdminMockDb();

    const url = config.url || '';
    const method = (config.method || 'get').toLowerCase();

    await new Promise((resolve) => setTimeout(resolve, 150));

    const users = getStorageItem('users', SEED_USERS);
    const moims = getStorageItem('moims', SEED_MOIMS);

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

      // 2. Admin Users
      else if (url.includes('admin/users') && method === 'get') {
        resData = users;
      } else if (url.match(/admin\/users\/(\d+)/) && method === 'delete') {
        const userId = parseInt(url.match(/admin\/users\/(\d+)/)![1]);
        const updated = users.filter((u: any) => u.userId !== userId);
        setStorageItem('users', updated);
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
