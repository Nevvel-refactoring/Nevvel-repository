# NEVVEL

---

## <u>프로젝트 소개</u>

‘NEVVEL’을 통해 소설 작가는 자신의 소설에서 원하는 타이밍에 움직이는 이미지를 넣거나 효과음을 삽입하여,

소설 작가는 텍스트의 한계를 극복하여 새로운 형태의 컨텐츠 생산 및 새로운 독자층 유입

에셋 작가는 새로운 컨텐츠 시장을 확보

독자들은 새로운 소설 몰입도를 높이고 새로운 형태의 컨텐츠를 향유할 수 있습니다.

---

### 기획 배경

최근까지 화제가 되었던 재벌집 막내아들, 사내맞선, 김비서가 왜그럴까 등의 드라마들이 있었습니다. 
이 드라마들의 공통점은 원작이 웹소설이라는 점입니다.
이처럼 웹소설은 웹툰, 드라마, 영화 등으로 미디어믹스를 통해 시장이 커지고 있습니다.

웹소설은 웹 상에서 배포되는 컨텐츠로서 꼭 단순 텍스트 컨텐츠로 머무를 필요가 없습니다. 멀티미디어 활용을 통해 웹소설을 한단계 진화시키고, 더 많은 작가 및 독자가 새로운 형태의 컨텐츠를 생산 및 향유할 수 있도록 하고자 "Nevvel"을 기획하게 되었습니다.

웹소설시장에 더 많은 작가들이 쉽게 참여하여 독자들에게 새로운 경험을 주고 에셋 작가들도 참여하여 컨텐츠 시장 활성화하도록는 데에 기여하고자 합니다.

---

## <u>주요 기능</u>

### 메인 페이지

- 베스트 소설과 베스트 에셋 목록을 조회합니다.
- 장르별, 완결/연재중, 최신순 등으로 정렬을 합니다.
- 작품의 이름, 작가의 이름을 통해 목록을 검색합니다.

### 에셋 스토어

- 사용자는 원하는 태그의 이미지/사운드 에셋목록을 조회하고, 등록할 수 있습니다
- 작가는 원하는 태그 또는 키워드를 통해 에셋 목록을 검색합니다.
- 이미지/사운드 에셋과 인기순/최신순 에셋을 구분하여 조회할 수 있습니다.
- 에셋의 상세보기 모달에서 미리보기를 통해 독자에게 어떻게 보일지 확인하고, 구매할 수 있습니다.

### 소설 등록페이지

- 작가는 새로 발행할 소설의 썸네일이미지와 제목 등을 등록할 수 있습니다.

### 에피소드 등록 페이지

- 작가는 독자가 한번 클릭/스크롤 시 보여줄 텍스트를 등록할 수 있습니다.
- 한 개의 블록이 독자가 한번 클릭/스크롤 할 때에 보여줄 컨텐츠입니다.
- 한번 클릭마다 이미지와 오디오 이벤트를 각각 1개씩 등록 할 수 있습니다.
- 예약발행을 통해 에피소드가 발행될 날짜를 예약할 수 있습니다.

### 에피소드 뷰어

- 독자는 줄 간격조정, 폰트변경, 배경지정, 탭/스크롤 페이지 전환방식 설정 등을 설정할 수 있습니다.
- 스크롤/클릭에 따라 작가가 의도한 컨텐츠 단위로 컨텐츠가 나타납니다.
- 등록된 이벤트 발생 시 이미지와 오디오를 실행하여 독자의 몰입감을 높여줍니다.

### 마이페이지

- 사용자가 작성/구매한 소설, 작성/구매한 에셋의 목록을 조회할 수 있습니다.

---

## <u>기술 스택</u>

**Backend**

- IntelliJ IDE
- Springboot Gradle 7.6.1
- Java jdk corretto 11.0.17
- Spring Data JPA
- Springframework 2.7.9
- Spring Security
- Spring Validation
- Spring Web
- Swagger 3.0.0
- Lombok
- jjwt 0.11.2

**Backend - DB**

- MySQL 8.0.32

**Frontend**

- react 18.2.0
- styled-components ^5.3
- typescript 5.0.4
- next 13.3.1
- yarn
- jotai 2.0.4
- axios 1.4.0

**CI/CD**

- AWS EC2
  Ubuntu 20.04
  Docker 23.0.1
- Jenkins
- NGINX
- SSL

---

## 외부 서비스

- OAUTH2(kakao):
  
  ```
     client-id: {client-id}
     client-secret: {client-secret}
     redirect-uri: http://k8d106.p.ssafy.io/api/login/oauth2/code/kakao
     authorization-grant-type: authorization_code
     client-authentication-method: POST
     client-name: Kakao
     scope:
       - profile_nickname
       - account_email
       - profile_image
  ```

- ```
  cloud:
  aws:
    credentials:
      access-key: {access-key}
      secret-key: {secret-key}
    s3:
      bucket: nevvel
    region:
      static: ap-northeast-2
    stack:
      auto: false
  ```

---

## 빌드시 환경변수

- spring : java -jar -Dspring.profiles.active=server app.jar (yml 프로파일 지정)

---

## <u>ERD</u>

---

# <u>개발 팀 소개</u>

- FE : 김민지, 김유홍, 김현진, 이시준
- BE : 김호균, 박희종, 이시준
