import React, { useCallback, VFC, RefObject } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import Chat from '@components/Chat';
import { IDM, IChat } from '@typings/db';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
  scrollRef: RefObject<Scrollbars>;
}

const ChatList: VFC<Props> = ({ chatSections, setSize, isReachingEnd, scrollRef }) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      // 데이타 추가로
      setSize((prevSize) => prevSize + 1).then(() => {
        // 스크롤 위치 유지
        if (scrollRef?.current) {
          scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
        }
      });
    }
  }, []);
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
