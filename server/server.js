const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());
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

// 사용자 확인 및 생성 함수
function ensureUserExists(userId, callback) {
    const actualUserId = userId || "seoin0713@"; // userId가 없으면 default_name 사용

    // 사용자 존재 여부 확인
    db.query('SELECT * FROM users WHERE id = ?', [actualUserId], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        // 사용자 없으면 생성
        if (results.length === 0) {
            const query = 'INSERT INTO users (id, name) VALUES (?, ?)';
            db.query(query, [actualUserId, actualUserId === "null" ? "default_name" : actualUserId], (insertErr, insertResults) => {
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
    const actualUserId = userId || "default_name";

    console.log("userId from query:", userId);  // 디버깅 로그 추가
    console.log("actualUserId used:", actualUserId);

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
            res.json(results);
        });
    });
});

// 운동 계획 추가 API 엔드포인트
app.post("/api/plan", (req, res) => {
    const { date, text, completed = false, userId } = req.body;  // userId도 받도록 수정
    const actualUserId = userId || "default_name"; // userId가 없으면 default_name 사용

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
                res.status(500).json({ error: "운동 계획 추가 실패" });
                return;
            }
            res.json({ message: "운동 계획 추가 성공", id: result.insertId });
        });
    });
    console.log("ensureUserExists 호출됨: actualUserId =", actualUserId);
});

app.delete("/api/plan", (req, res) => {
    const { id, userId } = req.body;  // userId도 받도록 수정
    const actualUserId = userId || "default_name"; // userId가 없으면 default_name 사용

    // 사용자 존재 확인 후 운동 계획 삭제
    ensureUserExists(actualUserId, (err) => {
        if (err) {
            console.error("사용자 확인 또는 생성 실패:", err);
            return res.status(500).json({ error: "사용자 확인 또는 생성 실패" });
        }

        const query = "DELETE FROM fitness_plans WHERE id = ? AND user_id = ?";
        db.query(query, [id, actualUserId], (err, result) => {
            if (err) {
                console.error("운동 계획 삭제 실패:", err);
                res.status(500).json({ error: "운동 계획 삭제 실패" });
                return;
            }
            res.json({ message: "운동 계획 삭제 성공" });
        });
    });
    console.log("ensureUserExists 호출됨: actualUserId =", actualUserId);
});

app.put("/api/plan", (req, res) => {
    const { id, completed, userId } = req.body;  // userId도 받도록 수정
    const actualUserId = userId || "default_name"; // userId가 없으면 default_name 사용

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
    const userId = req.query.userId;  // 클라이언트에서 userId를 받아옴
    const actualUserId = userId || "default_name"; // userId가 없으면 default_name 사용

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
                res.status(500).json({ error: "체중 데이터 조회 실패" });
                return;
            }
            res.json(results);
        });
    });
});

app.post("/api/bmi", (req, res) => {
    const { date, weight, userId } = req.body;  // userId도 받도록 수정
    const actualUserId = userId || "default_name"; // userId가 없으면 default_name 사용

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
                res.status(500).json({ success: false, message: "체중 데이터 추가 실패" });
                return;
            }
            res.json({ success: true, message: "체중 데이터 추가 성공", id: result.insertId });
        });
    });
});

// 삭제 처리 API
app.delete("/api/bmi", (req, res) => {
    const { date, weight, userId } = req.body;
    const actualUserId = userId || "default_name"; // userId가 없으면 default_name 사용

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
        formattedDate.setUTCHours(formattedDate.getUTCHours() - 9);

        const year = formattedDate.getUTCFullYear();
        const month = formattedDate.getUTCMonth() + 1;
        const day = formattedDate.getUTCDate();
        const hour = formattedDate.getUTCHours();
        const minute = formattedDate.getUTCMinutes();
        const second = formattedDate.getUTCSeconds();

        const deleteQuery = `
            DELETE FROM weight_records
            WHERE user_id = ?
            AND DATE_FORMAT(date, "%Y-%m-%d %H:%i:%s") = ?
        `;
        const dateToDelete = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        
        db.query(deleteQuery, [actualUserId, dateToDelete], (err, result) => {
            if (err) {
                console.error("체중 데이터 삭제 실패:", err);
                res.status(500).json({ error: "체중 데이터 삭제 실패" });
                return;
            }
            res.json({ success: true, message: "체중 데이터 삭제 성공" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
