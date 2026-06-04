import { useState } from 'react';
import styled from 'styled-components';
import { Card, Space, Table, Button, Modal, Tag, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminApi } from '../../apis/admin';
import { UserApi } from '../../apis/user';

const Container = styled.div`
  padding: 32px;
`;

export default function ReportList() {
  const queryClient = useQueryClient();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reports
  const { data: reportsData, isLoading: reportsLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: AdminApi.getReports,
  });

  // Fetch users to map reporterId/reportedId to nicknames
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: UserApi.getUserList,
  });

  // Mutations
  const { mutate: toggleSolved } = useMutation({
    mutationFn: AdminApi.changeReportState,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reports'] });
      message.success('신고 상태가 변경되었습니다.');
    },
  });

  const { mutate: deleteReport } = useMutation({
    mutationFn: AdminApi.deleteReport,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reports'] });
      message.success('신고 내역이 삭제되었습니다.');
    },
  });

  const getUserNickname = (id: number) => {
    const user = usersData?.find((u: any) => u.userId === id);
    return user ? `${user.nickname} (${user.email})` : `User #${id}`;
  };

  const showDetailModal = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Card title="신고 관리" style={{ width: '100%' }}>
        <Table dataSource={reportsData?.content} loading={reportsLoading} rowKey="id">
          <Table.Column title="ID" dataIndex="id" key="id" width={80} />
          <Table.Column
            title="신고자"
            dataIndex="reporterId"
            key="reporterId"
            render={(reporterId: number) => getUserNickname(reporterId)}
            width={200}
          />
          <Table.Column
            title="피신고자"
            dataIndex="reportedId"
            key="reportedId"
            render={(reportedId: number) => getUserNickname(reportedId)}
            width={200}
          />
          <Table.Column
            title="신고 사유"
            dataIndex="reason"
            key="reason"
            ellipsis
          />
          <Table.Column
            title="신고 일시"
            dataIndex="reportDate"
            key="reportDate"
            render={(date: string) => new Date(date).toLocaleString()}
            width={200}
          />
          <Table.Column
            title="상태"
            dataIndex="isSolved"
            key="isSolved"
            render={(isSolved: boolean) => (
              <Tag color={isSolved ? 'green' : 'volcano'}>
                {isSolved ? '해결됨' : '미해결'}
              </Tag>
            )}
            width={100}
          />
          <Table.Column
            title="실행"
            key="action"
            width={220}
            render={(_, record: any) => (
              <Space size="middle">
                <Button type="link" onClick={() => showDetailModal(record)}>
                  상세 보기
                </Button>
                <Button type="link" onClick={() => toggleSolved({ reportId: record.id })}>
                  {record.isSolved ? '미해결 처리' : '해결 완료'}
                </Button>
                <Button type="link" danger onClick={() => deleteReport({ reportId: record.id })}>
                  삭제
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>

      <Modal
        title="신고 상세 정보"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="확인"
        cancelButtonProps={{ style: { display: 'none' } }}
        width={600}
      >
        {selectedReport && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '24px 0 12px' }}>
            <div>
              <strong>신고자: </strong> {getUserNickname(selectedReport.reporterId)}
            </div>
            <div>
              <strong>피신고자: </strong> {getUserNickname(selectedReport.reportedId)}
            </div>
            <div>
              <strong>신고 사유: </strong>
              <div style={{ marginTop: 8, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                {selectedReport.reason}
              </div>
            </div>
            {selectedReport.reportPictureUrls && selectedReport.reportPictureUrls.length > 0 && (
              <div>
                <strong>첨부 이미지:</strong>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  {selectedReport.reportPictureUrls.map((url: string, index: number) => (
                    <img key={index} src={url} alt="신고 캡처" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4 }} />
                  ))}
                </div>
              </div>
            )}
            <div>
              <strong>접수 일시: </strong> {new Date(selectedReport.reportDate).toLocaleString()}
            </div>
            {selectedReport.isSolved && selectedReport.solvedDate && (
              <div>
                <strong>해결 일시: </strong> {new Date(selectedReport.solvedDate).toLocaleString()}
              </div>
            )}
            <div>
              <strong>처리 여부: </strong>
              <Tag color={selectedReport.isSolved ? 'green' : 'volcano'}>
                {selectedReport.isSolved ? '해결됨' : '미해결'}
              </Tag>
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
}
