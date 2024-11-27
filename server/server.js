require('dotenv').config();  // 이 부분을 추가하여 .env 파일을 로드합니다.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const path = require('path');
const app = express();

// 환경 변수 로드

const PORT = process.env.PORT || 5001; // 포트는 환경 변수에서 가져옴

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());  // 이 부분이 없으면 body를 제대로 처리할 수 없음

// MySQL 데이터베이스 연결 설정
// 환경 변수로 MySQL 연결 정보 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST || "223.194.154.149",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "seoin0713@",
    database: process.env.DB_NAME || "fitness_app",
  });

db.connect((err) => {
    if (err) {
        console.error("MySQL 연결 오류:", err);
        return;
    }
    console.log("MySQL 연결 성공!");
});

// 프로덕션: 빌드된 정적 파일 서빙
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")));

    // API 요청을 제외한 나머지 요청에 대해서만 index.html을 반환하도록 수정합니다.
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });
} else {
    // 개발 환경: 개발 중인 React 서버를 분리하여 API만 제공
    app.get("/", (req, res) => {
        res.send("API 서버가 실행 중입니다. (개발 환경)");
    });
}

function ensureUserExists(userId, callback) {
    const actualUserId = userId;

    // 사용자 존재 여부 확인
    db.query('SELECT * FROM users WHERE id = ?', [actualUserId], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        // 사용자 없으면 생성
        if (results.length === 0) {
            const query = 'INSERT INTO users (id, name) VALUES (?, ?)';
            db.query(query, [actualUserId, actualUserId], (insertErr, insertResults) => {
                if (insertErr) {
                    return callback(insertErr);
                }
                callback(null); // 사용자 생성 후 callback 호출
            });
        } else {
            // 사용자 존재 시 바로 callback 호출
            callback(null);
        }
    });
}


app.get("/api/plan", (req, res) => {
    const userId = req.query.userId;  
    const actualUserId = userId;

    console.log("plan userId from query:", userId);  // 디버깅 로그 추가
    console.log("plan actualUserId used:", actualUserId);

    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        const query = "SELECT * FROM fitness_plans WHERE user_id = ?";
        db.query(query, [actualUserId], (err, results) => {
            if (err) {
                console.error("운동 계획 조회 실패:", err);
                res.status(500).json({ error: "운동 계획 조회 실패" });
                return;
            }
            // 조회 결과가 없을 경우 빈 배열을 반환합니다.
            res.json(results.length > 0 ? results : []);
        });
    });
});


app.post("/api/plan", (req, res) => {
    const { date, text, completed = false, userId } = req.body;  // userId도 받도록 수정
    console.log("POST 요청의 body 확인: " + req.body);  // POST 요청의 body 확인
    const actualUserId = userId;

    // 사용자 존재 확인 후 운동 계획 추가
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        const query = "INSERT INTO fitness_plans (date, text, completed, user_id) VALUES (?, ?, ?, ?)";
        db.query(query, [date, text, completed, actualUserId], (err, result) => {
            if (err) {
                console.error("운동 계획 추가 실패:", err);
                return res.status(500).json({ error: "운동 계획 추가 실패" });
            }

            console.log("운동 계획 추가 성공:", result);
            res.json({ message: "운동 계획 추가 성공", id: result.insertId });
        });
    });

    console.log("ensureUserExists 호출됨: actualUserId =", actualUserId);
});

app.delete("/api/plan", (req, res) => {
    const { id, userId } = req.body;
    const actualUserId = userId;

    if (!userId) {
        return res.status(400).json({ error: "userId가 필요합니다." });
    }

    // 사용자 존재 확인 후 운동 계획 삭제
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        // 쿼리에서 id와 userId의 위치를 수정
        const deleteQuery = `DELETE FROM fitness_plans WHERE id = ? AND user_id = ?`;

        // 올바른 순서로 파라미터 전달: id, userId
        db.query(deleteQuery, [id, actualUserId], (err, result) => {
            if (err) {
                console.error("운동 계획 삭제 실패:", err);
                return res.status(500).json({ error: "운동 계획 삭제 실패" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "삭제할 데이터를 찾을 수 없습니다." });
            }

            res.json({ success: true, message: "운동 계획 삭제 성공" });
        });
    });
    console.log("ensureUserExists 호출됨: actualUserId =", actualUserId);
});


app.put("/api/plan", (req, res) => {
    const { id, completed, userId } = req.body;  // userId도 받도록 수정
    const actualUserId = userId; // userId가 없으면 default_name 사용

    // 사용자 존재 확인 후 운동 계획 상태 업데이트
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        const query = "UPDATE fitness_plans SET completed = ? WHERE id = ? AND user_id = ?";
        db.query(query, [completed, id, actualUserId], (err, result) => {
            if (err) {
                console.error("운동 계획 상태 업데이트 실패:", err);
                res.status(500).json({ error: "운동 계획 상태 업데이트 실패" });
                return;
            }
            res.json({ message: "운동 계획 상태 업데이트 성공" });
        });
    });
});

// 체중 기록 API 엔드포인트
app.get("/api/bmi", (req, res) => {
    const { userId } = req.query;
    const actualUserId = userId; // userId가 없으면 default_name 사용

    console.log("bmi userId from query:", userId);  // 디버깅 로그 추가
    console.log("bmi actualUserId used:", actualUserId);

    // 사용자 존재 확인 후 체중 기록 조회
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        const query = "SELECT * FROM weight_records WHERE user_id = ?";
        db.query(query, [actualUserId], (err, results) => {
            if (err) {
                console.error("체중 데이터 조회 실패:", err);
                return res.status(500).json({ error: "체중 데이터 조회 실패" });
            }
            res.json(results);
        });
    });
});

//추가 API
app.post("/api/bmi", (req, res) => {
    const { date, weight, userId } = req.body;  // userId도 받도록 수정
    const actualUserId = userId; // userId가 없으면 default_name 사용

    // 사용자 존재 확인 후 체중 기록 추가
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        const query = "INSERT INTO weight_records (date, weight, user_id) VALUES (?, ?, ?)";
        db.query(query, [date, weight, actualUserId], (err, result) => {
            if (err) {
                console.error("체중 데이터 추가 실패:", err);
                return res.status(500).json({ success: false, message: "체중 데이터 추가 실패" });
            }
            res.json({ success: true, message: "체중 데이터 추가 성공", id: result.insertId });
        });
    });
});

// 삭제 처리 API
app.delete("/api/bmi", (req, res) => {
    const { date, weight, userId } = req.body;
    const actualUserId = userId;

    if (!userId) {
        return res.status(400).json({ error: "userId가 필요합니다." });
    }

    // 사용자 존재 확인 후 체중 데이터 삭제
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        // 날짜 포맷팅 및 삭제 처리
        const formattedDate = new Date(date);
        const dateToDelete = formattedDate.toISOString().split('T')[0]; // 날짜만 추출 (YYYY-MM-DD 형식)

        const deleteQuery = `DELETE FROM weight_records WHERE user_id = ? AND weight = ? AND DATE(date) = ?`;
        
        db.query(deleteQuery, [actualUserId, weight, dateToDelete], (err, result) => {
            if (err) {
                console.error("체중 데이터 삭제 실패:", err);
                res.status(500).json({ error: "체중 데이터 삭제 실패" });
                return;
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "삭제할 데이터를 찾을 수 없습니다." });
            }

            res.json({ success: true, message: "체중 데이터 삭제 성공" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
