import './css/mainpage.css';
import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { Calender2 } from '../components/Calendar2';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
import { getCookie } from '../shared/cookie';
import { apis } from '../api';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const cookie = getCookie('refreshToken');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  // 친구목록 리덕스에서 꺼내오든가
  const friendList = useSelector((state) => state.friend.friendList);
  console.log('friendList', friendList);

  // // 친구 목록 담을 state
  // const [friends, setFriends] = useState([]);
  // // 친구 조회 api로 데이터 가져오기
  // const showFriends = async () => {
  //   const raw = await apis.getFriendList();
  //   const friendsList = raw.data.data;
  //   setFriends(friendsList);
  // };

  // 그리는 달력 주인 state
  const memberId = getCookie('memberId');
  const nickname = getCookie('nickname');
  const [calMemberId, setCalMemberId] = useState(memberId); // 로그인 유저 초기값
  const [calMemberNickname, setCalMemberNickname] = useState(nickname); // 로그인 유저 초기값
  console.log('calMemberId', calMemberId);

  return (
    <>
      {isLoggedIn ? (
        <>
          <FriendsList
            friendList={friendList}
            setCalMemberId={setCalMemberId}
            setCalMemberNickname={setCalMemberNickname}
          />
          <div className="wrap">
            <Calendar
              calMemberId={calMemberId}
              calMemberNickname={calMemberNickname}
            />
          </div>

          {/* <div className="wrap2">
            <Calender2 />
          </div> */}

          {/* <WriteFixedBtn /> */}
        </>
      ) : (
        <div className="welcome">
          <p>You can use it after Log in ✨</p>
        </div>
      )}
    </>
  );
};

export default MainPage;
