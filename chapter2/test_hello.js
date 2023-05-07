import http from "k6/http";

export const option = {
  vus: 100, // 100명
  duration: "10s", // 10초 동안 요청
};

export default function () {
  http.get("http://localhost:8000"); // http의 get 메서드로 요청
}
