import io from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  // 연결 종료
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  // 연결 되지 않은 socket 만 새로 연결
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'], // websocket 만 사용하도록 하는 옵션 (지원하지 않는 브라우저 때문에 http 로 통신을 시도하는게 기본값)
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
