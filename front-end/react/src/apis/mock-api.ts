import { AxiosInstance } from 'axios';

const DB_PREFIX = 'ssalon_admin_mock_';

const SEED_USERS = [
  { id: 1, nickname: '살롱길동', email: 'gildong@ssalon.co.kr', gender: '남성', address: '서울특별시 마포구', roles: 'ROLE_USER' },
  { id: 2, nickname: '보드마스터', email: 'board@example.com', gender: '남성', address: '서울특별시 서대문구', roles: 'ROLE_USER' },
  { id: 3, nickname: '러닝러버', email: 'runner@example.com', gender: '여성', address: '서울특별시 용산구', roles: 'ROLE_USER' },
  { id: 4, nickname: '커피요정', email: 'coffee@example.com', gender: '여성', address: '서울특별시 성동구', roles: 'ROLE_USER' },
  { id: 5, nickname: '동네피플', email: 'neighborhood@example.com', gender: '남성', address: '서울특별시 마포구', roles: 'ROLE_USER' }
];

const SEED_MOIMS = [
  { id: 101, title: '성산동 보드게임 & 커피 소모임 🎲', category: '보드게임/오락', capacity: 6, fee: 0, creatorNickname: '보드마스터', location: '성산동 커피앤톡 카페' },
  { id: 102, title: '한강 백두대간 노을 야간 러닝 🏃‍♂️', category: '스포츠/레저', capacity: 10, fee: 5000, creatorNickname: '러닝러버', location: '망원한강공원 안내판 앞' },
  { id: 103, title: '반 고흐 특별전 투어 및 드로잉 🎨', category: '문화/예술', capacity: 5, fee: 15000, creatorNickname: '살롱길동', location: '시청역 서울시립미술관 입구' },
  { id: 104, title: '성수 핫플 에스프레소 바 투어 ☕', category: '맛집/카페', capacity: 4, fee: 0, creatorNickname: '커피요정', location: '성수역 3번 출구' }
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
  if (!localStorage.getItem(DB_PREFIX + 'initialized')) {
    setStorageItem('users', SEED_USERS);
    setStorageItem('moims', SEED_MOIMS);
    localStorage.setItem(DB_PREFIX + 'initialized', 'true');
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
        resData = moims;
      } else if (url.match(/admin\/moims\/(\d+)/) && method === 'delete') {
        const moimId = parseInt(url.match(/admin\/moims\/(\d+)/)![1]);
        const updated = moims.filter((m: any) => m.id !== moimId);
        setStorageItem('moims', updated);
        resData = { success: true };
      }

      // 2. Admin Users
      else if (url.includes('admin/users') && method === 'get') {
        resData = users;
      } else if (url.match(/admin\/users\/(\d+)/) && method === 'delete') {
        const userId = parseInt(url.match(/admin\/users\/(\d+)/)![1]);
        const updated = users.filter((u: any) => u.id !== userId);
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
