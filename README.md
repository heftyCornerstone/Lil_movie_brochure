# lil_movie_brochure

## 사이트 구성

총 3개의 화면과 하나의 모달창으로 구성되어 있습니다.

* 홈 화면
* 검색 화면
* 북마크 화면
* 영화 상세정보 모달

<br>

### 구현된 기능 요약

**헤더** 
  * 검색 바
  * 북마크 화면과 홈을 오가는 토글 버튼<br>
  
**홈 화면**
  * 인기 영화를 보여줌
  * 영화 목록 슬라이드<br>

**검색 화면**
  * 실시간 검색
  * 무한 스크롤<br>

**북마크 화면**
  * 북마크 된 영화 확인 가능<br>

**그 외** :
  * 영화 카드 클릭 시 모달 창 등장. 영화 상세 정보를 확인과 북마크 등록 및 삭제 가능

<br><br>

## 레이아웃

### 헤더

<img src='https://github.com/user-attachments/assets/81b41a27-0ce6-4af6-bf53-7e5fe6cf9b33' width='60%'>

1. 영화 검색 바
2. 북마크 화면과 홈 화면을 오가는 토글 버튼

<br>

### 바디와 푸터

<img src='https://github.com/user-attachments/assets/4d2a5ae0-f67c-4fa0-baa4-71066f436858' width='60%'>

바디 안에는 각 화면의 컨텐츠가 들어가며,
푸터 안에 특별한 정보는 없습니다.

<br><br>

## 홈 화면

<img src='https://github.com/user-attachments/assets/b98603e3-c3ca-4c86-a8c5-04aea8f34fe6' width='60%'>
<img src='https://github.com/user-attachments/assets/5ccd98d2-8015-4786-8719-52a4175aec0e' width='60%'>

홈 화면에는 최근 가장 인기있는 영화 20가지가 카테고리별로 정리되어 있습니다.<br>
영화 카테고리 보드 안에 영화의 포스터, 제목, 평점을 확인할 수 있는 영화 카드가 들어있습니다.

<br><br>

### 슬라이드

<img src='https://github.com/user-attachments/assets/ddbfb1ed-dab7-4be3-be0a-99ae43c0ea2a' width='60%'>

카테고리 보드의 양쪽에 있는 버튼을 이용하면 영화 카드 목록을 좌우로 슬라이드할 수 있습니다.

<br><br>

### 영화 상세 정보 모달 창

<img src='https://github.com/user-attachments/assets/c9fe556b-5866-46ac-8a17-00ae55676883' width='60%'>

모든 영화 카드는 클릭하면 영화 상세 정보를 보여주는 모달 창을 띄웁니다.

<br><br>

## 북마크 화면

<img src='https://github.com/user-attachments/assets/c9fe556b-5866-46ac-8a17-00ae55676883' width='60%'>

북마크한 영화를 확인할 수 있는 화면입니다.<br>
북마크 된 영화의 영화 카드가 나열되어 있으며, 각 영화 카드는 물론 모달창을 띄웁니다.

<br><br>

## 검색 화면

### 실시간 검색

<img src='https://github.com/user-attachments/assets/becd99e4-726f-446d-b1a9-e51902385c9e' width='60%'>

검색창에 입력되는 검색어를 실시간으로 반영하여서 검색 결과를 가져옵니다.

<br><br>

### 무한 스크롤

<img src='https://github.com/user-attachments/assets/ce657872-8ae9-40cc-96e3-4a53b3e26d0c' width='60%'>

검색 결과창에 무한 스크롤이 구현되어 있습니다.
