import { useState } from 'react';
import styled from 'styled-components';
import { Card, Space, Table, Button, Modal, Input, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminApi } from '../../apis/admin';

const Container = styled.div`
  padding: 32px;
`;

export default function BlacklistList() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [reasonInput, setReasonInput] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['blacklist'],
    queryFn: AdminApi.getBlacklist,
  });

  const { mutate: updateBlacklistReason } = useMutation({
    mutationFn: AdminApi.setBlacklistReason,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      message.success('블랙리스트 정보가 업데이트되었습니다.');
      setIsModalOpen(false);
    },
    onError: () => {
      message.error('오류가 발생했습니다.');
    }
  });

  const showEditModal = (userId: number, currentReason: string) => {
    setSelectedUserId(userId);
    setReasonInput(currentReason);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedUserId !== null) {
      updateBlacklistReason({ userId: selectedUserId, blackReason: reasonInput });
    }
  };

  return (
    <Container>
      <Card title="블랙리스트 관리" style={{ width: '100%' }}>
        <Table dataSource={data?.content} loading={isLoading} rowKey="userId">
          <Table.Column title="닉네임" dataIndex="nickname" key="nickname" width={150} />
          <Table.Column title="이메일" dataIndex="email" key="email" width={200} />
          <Table.Column title="성별" dataIndex="gender" key="gender" width={100} />
          <Table.Column
            title="차단 일시"
            dataIndex="blackTime"
            key="blackTime"
            render={(date: string) => date ? new Date(date).toLocaleString() : '-'}
            width={200}
          />
          <Table.Column title="차단 사유" dataIndex="blackReason" key="blackReason" />
          <Table.Column
            title="실행"
            key="action"
            width={180}
            render={(_, record: { userId: number; blackReason: string }) => (
              <Space size="middle">
                <Button type="link" onClick={() => showEditModal(record.userId, record.blackReason)}>
                  사유 변경
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => updateBlacklistReason({ userId: record.userId, blackReason: null })}
                >
                  차단 해제
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>

      <Modal
        title="블랙리스트 사유 변경"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="저장"
        cancelText="취소"
      >
        <div style={{ margin: '16px 0' }}>
          <Input.TextArea
            rows={4}
            value={reasonInput}
            onChange={(e) => setReasonInput(e.target.value)}
            placeholder="블랙리스트 차단 사유를 입력하세요."
          />
        </div>
      </Modal>
    </Container>
  );
}
