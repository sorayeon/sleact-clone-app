import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/Signup/styles';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  /**
   * useSWR
   * @param url 호출 URL
   * @param fetcher 함수
   * @param options {
   * revalidateOnFocus: 화면에 다른 탭 갔다가 다시 돌아왔을때 요청,
   * dedupingInterval: 반복요청 인터벌 시간 ,
   * focusThrottleInterval: 한번 요청 보내고 다음 요청까지의 스로틀 시간,
   * errorRetryInterval: 에러 시 다시 요청 인터벌 시간,
   * errorRetryCount: 에러 시 최대 요청 카운트,
   * loadingTimeout 타임아웃 설정
   * }
   * @return {
   *  data : 성공했을때 데이타
   *  error : 실패 했을때
   *  revalidate : 원하는 시점에 호출
   * }
   */
  const { data, revalidate } = useSWR('/api/users', fetcher);

  const [logInError, setLogInError] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError('');
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          revalidate();
        })
        .catch((error) => {
          setLogInError(error.response?.data);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/Sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && <Error>{logInError}</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
