# "Node.js 백엔드 개발자 되기" 스터디
## http 서버
+ curl
  + 다양한 네트워크 프로토콜로 데이터를 주고받는 프로그램
  + GET, POST, DELETE, PUT 요청
  + 설치: https://curl.se/windows/
+ K6
  + 성능 테스트 도구
  + 자바스크립트로 부하 테스트 시나리오를 만들 수 있음
  + 설치: https://dl.k6.io/msi/
  + 실행: k6 run test_hello.js

## express
+ npm i express

## npm
+ npm ls -g : 글로벌 설치 모듈 조회
+ yarn2
  + corepack enable : cmd 관리자 모드에서 실행
  + yarn init -2

## NoSQL MongoDB
+ 설치
  + npm i mongodb
+ Mongoose
  + npm i mongoose
+ GUI 도구
  + MongoDB Compass
+ API 테스트
  + REST Client(VSCode Extension)
+ Issue
  + collection은 "person"인데 왜 "people"가 만들어질까?
  + put시 동일한 데이터가 여러개 있을때 첫번째만 수정됨

## 게시판(Express, MongoDB)
+ 초기 설정
  + npm init -y
  + npm i express@4.17.3
  + npm i mongodb@4.13.0
  + npm i express-handlebars@6.0.3 (템플릿 엔진)
  + npm i nodemon@2.0.20
  + npm i lodash
+ Issue
  + handlebars 파일 저장시 <script></script> 태그 안 JS 코드 뭉침 현상 발생
    + .prettierignore 파일 작성하여 해결(VSCode에서 폴더 열기한 폴더의 루트에 해당 파일이 있어야 함)  

## NestJS
### NestJS 시작
+ 의존성 패키지 설치
  + npm i @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata typescript
+ 실행
  + npx ts-node-dev src/main.ts
+ nest-cli 설치
  + npm i -g @nestjs/cli
  + nest new blog
    + npm 선택
+ 몽고디비 연동
  + npm i @nestjs/mongoose mongoose
### 환경 변수 설정
+ 의존성 패키지 설치(dotenv)
  + npm i @nestjs/config
+ weather 모듈
  + nest g module weather
  + nest g controller weather --no-spec
+ .env 관련 Issue
  + @module 데코레이터의 매개변수에 경로를 인수로 넣을때 책에 있는 코드를 따라 작성하면 .env 앞에 공백이 추가되어 제대로 경로를 찾지 못하는 문제 발생함
  ```
  envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`
  ```
  + 따라서 .trim()으로 공백을 제거해야 함
  ```
  envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV.trim()}.env`
  ```
+ YAML 사용 환경 변수 설정
  + npm i js-yaml
  + npm i -D @types/js-yaml
### 회원 가입, 인증
+ nest-cli 프로젝트 생성
  + nest new nest-auth-test
+ User 모듈 생성
  + nest g module user
  + nest g controller user --no-spec
  + nest g service user --no-spec
+ SQlite 데이터 베이스
  + npm i sqlite3 typeorm @nestjs/typeorm
  + SQLite extension 설치
+ ValidationPipe 유효성 검증
  + npm i class-validator class-transformer
+ auth 모듈 생성
  + nest g module auth
  + nest g service auth --no-spec
  + nest g controller auth --no-spec
+ 암호화
  + npm i bcrypt
  + npm i -D @types/bcrypt
