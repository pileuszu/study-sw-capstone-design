import { instance } from '.';

const authHeader = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoia2FrYW8gMzQ1ODI3NjMwMyIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzE3NDA2OTY3LCJleHAiOjE3MTc0OTMzNjd9.Px0QV5CXIsfxN1Xu9b1-NAPSzCRGpUu9QtE-TGbKIuc`,
  },
};

export const AdminApi = {
  getBlacklist: async () => {
    const { data } = await instance.get('api/admin/blacklists/users', authHeader);
    return data;
  },
  setBlacklistReason: async ({ userId, blackReason }: { userId: number; blackReason: string | null }) => {
    const { data } = await instance.post(`api/admin/blacklists/users/${userId}`, { blackReason }, authHeader);
    return data;
  },
  getReports: async () => {
    const { data } = await instance.get('api/admin/reports', authHeader);
    return data;
  },
  changeReportState: async ({ reportId }: { reportId: number }) => {
    const { data } = await instance.post(`api/admin/report/${reportId}/state`, {}, authHeader);
    return data;
  },
  deleteReport: async ({ reportId }: { reportId: number }) => {
    const { data } = await instance.delete(`api/admin/report/${reportId}`, authHeader);
    return data;
  },
};
