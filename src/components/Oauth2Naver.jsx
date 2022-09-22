import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';
import { useState } from 'react';


const Oauth2Naver = () => {
  let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);


  useEffect(() => {
    const fetchUser = async () => {
      let code = new URL(window.location.href).searchParams.get('code');
      console.log('code', code);

      if (code) {
        fetch(`http://13.125.161.17/oauth2/authorization/naver?code=${code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.success) console.log('성공!', data?.success);
          });

        // fetch(`https://kauth.kakao.com/oauth/token`,{
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //   body: `grant_type=authorization_code&client_id=beaf923464e502569ef542beeb8b039a&redirect_uri=http://localhost:3000/oauth/callback/kakao&code=${code}`
        // })
        //   .then(res => res.json())
        //   .then(data => {
        //     if(data.access_token){
        //       setKakaoToken(data.access_token);
        //     }
        //   })

        // const res = await apis.loginKakao(code);

        // const token = res.data?.data;
        // setCookie(
        //   'accessToken',
        //   token.accessToken,
        //   token.accessTokenExpireDate
        // );
        // setCookie(
        //   'refreshToken',
        //   token.refreshToken,
        //   token.refreshTokenExpireDate
        // );
        // setCookie('memberId', token.memberId);
        // alert('카카오 로그인 성공!');
      } else {
        alert('카카오 로그인에 실패했습니다.');
      }
    };
    fetchUser();

    // setTimeout(() => {
    //   navigate('/');
    // }, 2000);
  }, []);

  return (
    <div>로딩중</div>
  )
}

export default Oauth2Naver;