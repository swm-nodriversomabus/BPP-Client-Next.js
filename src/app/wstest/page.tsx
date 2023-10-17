'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef, useState } from 'react';
import SockJS from 'sockjs-client';

let subs;
let i = 1;
export default function Home(): any {
  const [data, setData] = useState('');
  const client = useRef<CompatClient>();
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(`${process.env.NEXT_BASE_URL}ws/chat`);
      return sock;
    });
    client.current.connect(
      {
        // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음.
        // ex)
        // Authorization: token,
      },
      () => {
        client.current?.send('/pub/subscribe/1234', {});
        // callback 함수 설정, 대부분 여기에 sub 함수 씀
        subs = client.current?.subscribe(
          `/topic/channel/1234`,
          (message) => {
            setData(message.body);
            // setMessage(JSON.parse(message.body));
          },
          {
            // 여기에도 유효성 검증을 위한 header 넣어 줄 수 있음
          }
        );
      }
    );
  };

  const sendHandler = () => {
    client.current?.send(
      '/pub/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: '1234',
        sender: 'a',
        message: ++i,
      })
    );
  };
  return (
    <>
      <button onClick={connectHandler}>connect</button>
      <button onClick={sendHandler}>send</button>
      <button
        onClick={() => {
          subs!.unsubscribe();
        }}
      >
        disconnect
      </button>
      <div>{data}</div>
    </>
  );
}
