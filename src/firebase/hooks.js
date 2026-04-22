// 🔥 Firebase Realtime Hooks
import { ref, push, onValue, set, get, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./config";

// =============================
// حفظ إجابة في قاعدة البيانات
// =============================
export const saveAnswer = async (roomId, gameType, playerName, question, answer) => {
  const answersRef = ref(db, `rooms/${roomId}/answers`);
  await push(answersRef, {
    gameType,
    playerName,
    question,
    answer,
    timestamp: Date.now(),
  });
};

// =============================
// حفظ نتيجة لاعب
// =============================
export const saveScore = async (roomId, playerName, score) => {
  const scoreRef = ref(db, `rooms/${roomId}/scores/${playerName}`);
  const snapshot = await get(scoreRef);
  const currentScore = snapshot.exists() ? snapshot.val().score : 0;
  await set(scoreRef, {
    playerName,
    score: currentScore + score,
    updatedAt: Date.now(),
  });
};

// =============================
// Hook: قراءة الإجابات الحية
// =============================
export const useAnswers = (roomId) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!roomId) return;
    const answersRef = ref(db, `rooms/${roomId}/answers`);
    const unsubscribe = onValue(answersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setAnswers(list.reverse()); // الأحدث أولاً
      } else {
        setAnswers([]);
      }
    });
    return () => unsubscribe();
  }, [roomId]);

  return answers;
};

// =============================
// Hook: قراءة النقاط الحية
// =============================
export const useScores = (roomId) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!roomId) return;
    const scoresRef = ref(db, `rooms/${roomId}/scores`);
    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data).sort((a, b) => b.score - a.score);
        setScores(list);
      } else {
        setScores([]);
      }
    });
    return () => unsubscribe();
  }, [roomId]);

  return scores;
};

// =============================
// Q&A Mode — نشر سؤال للغرفة
// =============================
export const publishQuestion = async (roomId, playerName, question) => {
  const qRef = ref(db, `rooms/${roomId}/activeQuestion`);
  await set(qRef, {
    question,
    askedBy: playerName,
    timestamp: Date.now(),
    answers: {},
  });
};

// =============================
// Q&A Mode — إرسال إجابة على السؤال النشط
// =============================
export const submitQAAnswer = async (roomId, playerName, answer) => {
  const ansRef = ref(db, `rooms/${roomId}/activeQuestion/answers/${playerName}`);
  await set(ansRef, { answer, playerName, timestamp: Date.now() });
};

// =============================
// Q&A Mode — مسح السؤال النشط
// =============================
export const clearQuestion = async (roomId) => {
  const qRef = ref(db, `rooms/${roomId}/activeQuestion`);
  await remove(qRef);
};

// =============================
// Hook: السؤال النشط في الغرفة
// =============================
export const useActiveQuestion = (roomId) => {
  const [activeQ, setActiveQ] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    const qRef = ref(db, `rooms/${roomId}/activeQuestion`);
    const unsubscribe = onValue(qRef, (snapshot) => {
      setActiveQ(snapshot.exists() ? snapshot.val() : null);
    });
    return () => unsubscribe();
  }, [roomId]);

  return activeQ;
};