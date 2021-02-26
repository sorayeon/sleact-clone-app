import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}
const InviteChannelModal: FC<Props> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const { data: userData } = useSWR<IUser>('/api/users', fetcher);
  const { revalidate: revalidateMembers } = useSWR<IUser[]>(
    userData
      ? `/api/workspaces/${workspace}/channels/${channel}/members`
      : null,
    fetcher,
  );
  return <div></div>;
};

export default InviteChannelModal;
