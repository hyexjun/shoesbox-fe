# Project #1 Shoes Box 📦️

### 프로젝트 소개 👓️

추억을 보관해두는 신발상자.

오늘 하루의 사건사고를 기록하는 나 혼자만의 일기장은 심심하다.

***오늘 나 이런 일이 있었어!*** 친구들에게 알려주고 싶지만 바빠서 언제 만날 지 모르는 친구들!

A에게도 B에게도 C에게도 같은 얘기를 반복하기는 귀찮고, 나의 소식을 알려주고는 싶을 땐?

월간 달력처럼 보여지는 이미지 캘린더에서 일별 친구의 근황을 확인하세요!


### 프로젝트 기간 및 구성원 🐱‍🚀
- 기간 : 22년 8월 26일 ~ 9월 17일
- 인원 : 프론트(React) 3명, 백엔드(Spring) 3명

|이름|담당|
|---|---|
|정찬호(L)|`BE`|
|최명백|`BE`|
|최인영|`BE`|
|박혜정(VL)|`FE`|
|김동규|`FE`|
|황선하|`FE`|


### 사용 기술 👨‍🦱️
- React
- Redux Toolkit
- React Bootstrap
- axios
- Spring Boot 2.7.3
- JDK 11
- AWS EC2, S3
- RDS


### 프로젝트 요구사항 분석🤔️
* jwt 및 소셜 로그인/회원가입
* 일기 및 댓글 CRUD
* 일기 본문에 이미지 첨부 가능
* 마이페이지 (회원정보 수정페이지) - 프로필 이미지, 닉네임, 자기소개 문구


### 와이어프레임🏛️
![image](https://user-images.githubusercontent.com/97497201/193610404-76f4e2a1-f672-4b6e-a962-3e5e7f49f69b.png)


### [API 리스트](https://documenter.getpostman.com/view/22269005/VV4tSxBy)📃️


### 기술 아키텍쳐🧩️
![shoesbox아키텍쳐 ](https://user-images.githubusercontent.com/106072839/193525118-b30b5be5-65ff-428b-8d93-67a95fea8387.png)


### Trouble Shooting 💡️

#### 캘린더에 날짜와 썸네일을 동시에 표시하기
* 문제상황 : 기존에는 캘린더에서 표시할 년, 월, 일 배열을 모두 프론트엔드에서 연산했으나 썸네일 추가/날짜 이동등의 기능을 확장하는 과정에서 추가적인 연산소요가 증가함
* 의견조율 : 백엔드에서 데이터를 받아온 이후 추가적인 연산이 발생하지 않도록 API를 수정, 프론트엔드는 받아온 데이터를 이용해 뷰를 그려주는 형태로 역할을 분담
* 수정결과 : 일자에 해당하는 데이터를 백엔드에서 받아오기 때문에 프론트에 추가적인 연산 부담이 줄어들었고 렌더링 속도가 개선됨

#### 이미 작성한 일기의 이미지 수정하기
* 문제상황 : 작성한 일기를 수정할 시 기존 이미지가 표시되지 않으며 추가된 이미지로 overwrite되기 때문에 사용자가 불편을 겪음 
* 의견조율 : 기존에 투고했던 이미지를 표시하고 삭제할 수 있도록 기능을 개선, 추가할 이미지와 합쳐 총 이미지 수가 5개 이하일 경우에만 반영되도록 수정하기
* 수정결과 : 기존 이미지 삭제와 새 이미지 추가기능이 개선되어 사용자 편의성이 증대됨

#### CI/CD 자동화하기
* 문제상황 : 배포 중 소셜로그인 기능을 구현하기 위해 빈번하게 redirect URL을 수정했으나 수동으로 배포하면 불필요하게 많은 시간을 소요함
* 의견조율 : aws codepipeline 혹은 github actions등을 비교해보고 빌드 및 EC2배포과정을 자동화하기로 결정
* 수정결과 : 이미 remote repository로 github을 이용하고 있기 때문에 불필요한 추가과정을 생략하기 위해 github actions를 활용하여 CI/CD자동화. 서버비용때문에 최종적으로는 firebase로 이전했으나 소셜로그인 기능을 테스트하는 과정에서 수동배포를 반복해야하는 시간을 단축함

