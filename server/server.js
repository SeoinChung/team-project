const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());
// JSON 본문 파싱 미들웨어 추가
app.use(express.json());  // 이 부분이 없으면 body를 제대로 처리할 수 없음


// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "seoin0713@", // MySQL 비밀번호
    database: "fitness_app", // 데이터베이스 이름
});

db.connect((err) => {
    if (err) {
        console.error("MySQL 연결 오류:", err);
        return;
    }
    console.log("MySQL 연결 성공!");
});

// 하드코딩된 userId 값 (임시)
const HARD_CODED_USER_ID = "seoin";

// 운동 계획 API 엔드포인트
app.get("/api/plan", (req, res) => {
    const query = "SELECT * FROM fitness_plans WHERE user_id = ?";
    db.query(query, [HARD_CODED_USER_ID], (err, results) => {
        if (err) {
            console.error("운동 계획 조회 실패:", err);
            res.status(500).json({ error: "운동 계획 조회 실패" });
            return;
        }
        res.json(results);
    });
});

app.post("/api/plan", (req, res) => {
    const { date, text, completed = false } = req.body;
    const query = "INSERT INTO fitness_plans (date, text, completed, user_id) VALUES (?, ?, ?, ?)";
    db.query(query, [date, text, completed, HARD_CODED_USER_ID], (err, result) => {
        if (err) {
            console.error("운동 계획 추가 실패:", err);
            res.status(500).json({ error: "운동 계획 추가 실패" });
            return;
        }
        res.json({ message: "운동 계획 추가 성공", id: result.insertId });
    });
});

app.delete("/api/plan", (req, res) => {
    const { id } = req.body;
    const query = "DELETE FROM fitness_plans WHERE id = ? AND user_id = ?";
    db.query(query, [id, HARD_CODED_USER_ID], (err, result) => {
        if (err) {
            console.error("운동 계획 삭제 실패:", err);
            res.status(500).json({ error: "운동 계획 삭제 실패" });
            return;
        }
        res.json({ message: "운동 계획 삭제 성공" });
    });
});

app.put("/api/plan", (req, res) => {
    const { id, completed } = req.body;
    const query = "UPDATE fitness_plans SET completed = ? WHERE id = ? AND user_id = ?";
    db.query(query, [completed, id, HARD_CODED_USER_ID], (err, result) => {
        if (err) {
            console.error("운동 계획 상태 업데이트 실패:", err);
            res.status(500).json({ error: "운동 계획 상태 업데이트 실패" });
            return;
        }
        res.json({ message: "운동 계획 상태 업데이트 성공" });
    });
});

// 체중 기록 API 엔드포인트
app.get("/api/bmi", (req, res) => {
    const query = "SELECT * FROM weight_records WHERE user_id = ?";
    db.query(query, [HARD_CODED_USER_ID], (err, results) => {
        if (err) {
            console.error("체중 데이터 조회 실패:", err);
            res.status(500).json({ error: "체중 데이터 조회 실패" });
            return;
        }
        res.json(results);
    });
});

app.post("/api/bmi", (req, res) => {
  const { date, weight, userId } = req.body;  // userId도 전달받도록 수정
  const query = "INSERT INTO weight_records (date, weight, user_id) VALUES (?, ?, ?)";
  db.query(query, [date, weight, userId], (err, result) => {
      if (err) {
          console.error("체중 데이터 추가 실패:", err);
          res.status(500).json({ success: false, message: "체중 데이터 추가 실패" });
          return;
      }
      res.json({ success: true, message: "체중 데이터 추가 성공", id: result.insertId });
  });
});

// 삭제 처리 API (서버 코드)
app.delete("/api/bmi", (req, res) => {
  const { date, weight, userId } = req.body;

  // 받은 date 값의 형식과 유효성 확인 (ISO 형식이 맞는지 확인)
  const formattedDate = new Date(date); // ISO 형식의 날짜를 Date 객체로 변환

  // 날짜가 제대로 파싱되었는지 확인
  console.log("받은 date:", date);
  console.log("파싱된 formattedDate:", formattedDate);

  // 한국 시간으로 변환 (UTC -> 한국 시간)
  formattedDate.setUTCHours(formattedDate.getUTCHours() -9); // UTC 시간을 한국 시간으로 변환

  // 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');  // 월을 2자리로
  const day = formattedDate.getDate().toString().padStart(2, '0');  // 일을 2자리로
  const hours = formattedDate.getHours().toString().padStart(2, '0');  // 시간을 2자리로
  const minutes = formattedDate.getMinutes().toString().padStart(2, '0');  // 분을 2자리로
  const seconds = formattedDate.getSeconds().toString().padStart(2, '0');  // 초를 2자리로

  const koreaTimeDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 최종 날짜 포맷

  console.log("변경된 날짜:", koreaTimeDate); // 변환된 날짜 확인

  // MySQL에서 데이터 삭제
  const query = "DELETE FROM weight_records WHERE date = ? AND weight = ? AND user_id = ?";
  db.query(query, [koreaTimeDate, weight, userId], (error, results) => {
      if (error) {
          console.error("삭제 오류:", error);
          return res.status(500).json({ success: false, message: "체중 데이터 삭제 오류" });
      }

      if (results.affectedRows > 0) {
          return res.json({ success: true, message: "체중 데이터 삭제 성공" });
      } else {
          return res.status(400).json({ success: false, message: "삭제할 데이터가 없습니다." });
      }
  });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
