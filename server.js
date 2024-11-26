const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 5001;

// MySQL 연결
const db = mysql.createConnection({
  host: "223.194.154.149",
  user: "root",
  password: "seoin0713@",
  database: "fitness_app",
});

// 연결 확인
db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류: ", err);
    process.exit(1); // 연결 실패 시 서버 종료
  }
  console.log("MySQL 연결 성공!");
});

app.get("/", (req, res) => {
  res.send("API 서버가 정상적으로 동작 중입니다.");
});

// CORS 설정 (localhost:3000에서 오는 요청을 허용)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// OPTIONS 요청 처리
app.options('/api/plan', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
});

app.use(bodyParser.json()); // JSON body 파싱을 위한 설정

// 하드코딩된 유저 아이디 (임시 로그인된 유저 가정)
const hardcodedUserId = "seoin";

// 유저 존재 여부 확인 및 추가
app.post("/api/user", (req, res) => {
  const userId = req.body.userId || hardcodedUserId; // body에서 userId를 받거나 하드코딩된 값 사용

  const checkUserQuery = "SELECT * FROM users WHERE userId = ?";
  db.query(checkUserQuery, [userId], (err, result) => {
    if (err) {
      console.error("유저 확인 오류:", err);
      res.status(500).send("유저 확인 오류");
      return;
    }

    if (result.length === 0) {
      // 유저가 존재하지 않으면 추가
      const insertUserQuery = "INSERT INTO users (userId) VALUES (?)";
      db.query(insertUserQuery, [userId], (err, result) => {
        if (err) {
          console.error("유저 추가 오류:", err);
          res.status(500).send("유저 추가 오류");
          return;
        }
        console.log(`새 유저(${userId}) 추가됨`);
        res.status(201).send("유저 추가 성공");
      });
    } else {
      console.log(`유저(${userId})가 이미 존재합니다.`);
      res.status(200).send("유저가 이미 존재합니다.");
    }
  });
});

// 해당 유저의 운동 계획 가져오기
app.get("/api/plan", (req, res) => {
  const { userId } = req.query; // 쿼리로부터 userId 받기
  
  if (!userId) {
    return res.status(400).send("userId가 필요합니다.");
  }

  const query = "SELECT * FROM fitness_plans WHERE userId = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("운동 계획 가져오기 오류:", err);
      res.status(500).send("운동 계획 가져오기 오류");
      return;
    }
    res.json(results); // 유저의 운동 계획 반환
  });
});

// 해당 유저의 체중 기록 가져오기
app.get("/api/bmi", (req, res) => {
  const userId = hardcodedUserId; // 하드코딩된 유저 아이디 사용

  const query = "SELECT * FROM weight WHERE userId = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("체중 데이터 가져오기 오류:", err);
      res.status(500).send("체중 데이터 가져오기 오류");
      return;
    }
    res.json(results); // 유저의 체중 기록 반환
  });
});

// 운동 계획 추가
app.post('/api/plan', (req, res) => {
  const { date, text, completed } = req.body;
  
  // 운동 계획을 데이터베이스에 추가하는 코드
  const query = 'INSERT INTO fitness_plans (date, text, completed, userId) VALUES (?, ?, ?, ?)';
  db.query(query, [date, text, completed, hardcodedUserId], (err, result) => {
    if (err) {
      console.error('운동 계획 추가 실패:', err);
      return res.status(500).json({ message: '운동 계획 추가 실패' });
    }
    res.status(200).json({
      id: result.insertId,  // 새로 생성된 운동 계획의 id
      text: text,
      completed: completed,
      message: '운동 계획 추가 성공',
    });
  });
});

// 운동 계획 삭제
app.delete("/api/plan", (req, res) => {
  const { id } = req.body; // 삭제할 계획의 id

  const query = "DELETE FROM fitness_plans WHERE id = ? AND userId = ?";
  db.query(query, [id, hardcodedUserId], (err, result) => {
    if (err) {
      console.error("운동 계획 삭제 오류:", err);
      res.status(500).send("운동 계획 삭제 오류");
      return;
    }
    console.log(`운동 계획 삭제됨 (id: ${id}, userId: ${hardcodedUserId})`);
    res.status(200).send("운동 계획 삭제 성공");
  });
});

// 체중 데이터 삭제
app.delete("/api/bmi", (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "날짜를 제공해야 합니다." });
  }

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }); // "YYYY-MM-DD" 형식으로 변환

  console.log("삭제할 날짜:", formattedDate);

  const query = "DELETE FROM weight WHERE userId = ? AND date = ?";
  db.query(query, [hardcodedUserId, formattedDate], (err, result) => {
    if (err) {
      console.error("체중 데이터 삭제 오류:", err);
      return res.status(500).json({ message: "체중 데이터 삭제 오류", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 날짜의 체중 데이터가 없습니다." });
    }

    console.log(`체중 데이터 삭제됨 (date: ${formattedDate})`);
    res.status(200).json({ message: "체중 데이터 삭제 성공!" });
  });
});

// 체중 데이터 추가
app.post("/api/bmi", (req, res) => {
  const { userId, weight, date } = req.body;  

  if (!weight || !date || !userId) {  // 값이 없다면 오류 처리
    return res.status(400).json({ message: "필수 정보가 누락되었습니다." });
  }

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" });  

  console.log("체중 데이터 추가 요청:", { userId, weight, formattedDate });

  db.query("INSERT INTO weight (userId, weight, date) VALUES (?, ?, ?)", [userId, weight, formattedDate], (err, result) => {
    if (err) {
      console.error("체중 데이터 추가 실패:", err);
      return res.status(500).json({ message: "체중 데이터 추가 실패", error: err.message });
    }

    console.log(`체중 데이터 추가됨 (userId: ${userId}, weight: ${weight}, date: ${formattedDate})`);
    res.status(200).json({ message: "체중 데이터 추가 성공" });
  });
});

// 운동 계획 완료 상태 업데이트
app.put("/api/plan", (req, res) => {
  const { id, completed } = req.body;

  if (!id || completed === undefined) {
    return res.status(400).send("필요한 정보(id, completed)가 누락되었습니다.");
  }

  const query = "UPDATE fitness_plans SET completed = ? WHERE id = ?";
  db.query(query, [completed, id], (err, result) => {
    if (err) {
      console.error("운동 계획 상태 업데이트 오류:", err);
      res.status(500).send("운동 계획 상태 업데이트 오류");
      return;
    }
    res.status(200).send("운동 계획 상태 업데이트 성공");
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Express 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
