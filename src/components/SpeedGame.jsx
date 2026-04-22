import { useState, useEffect, useRef } from "react";
import { SPEED_QUESTIONS } from "../data/gameData";
import { saveScore } from "../firebase/hooks";

export default function SpeedGame({ playerName, roomId, onScore }) {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    setActive(true);
    setTimer(60);
    setScore(0);
    setQIdx(0);
    setDone(false);
  };

  useEffect(() => {
    if (!active) return;
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setActive(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const answer = async () => {
    if (!active) return;
    const pts = 5;
    setScore((s) => s + pts);
    onScore(pts);
    setQIdx((i) => (i + 1) % SPEED_QUESTIONS.length);

    if (roomId && playerName) {
      await saveScore(roomId, playerName, pts);
    }
  };

  const timerColor =
    timer > 30 ? "text-emerald-400" : timer > 10 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-pink-400 mb-1">⚡ تحدي السرعة</h3>
        <p className="text-white/50 text-sm">أجب على أكبر عدد في دقيقة!</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-white/50 text-xs mb-1">الوقت</p>
          <p className={`text-3xl font-black ${timerColor}`}>{timer}s</p>
        </div>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-white/50 text-xs mb-1">النقاط</p>
          <p className="text-3xl font-black text-pink-400">{score}</p>
        </div>
      </div>

      {done ? (
        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl p-6 text-center space-y-2">
          <p className="text-4xl">🏁</p>
          <p className="text-white font-bold text-xl">انتهى التحدي!</p>
          <p className="text-white/70">حصلت على <span className="text-pink-400 font-black">{score}</span> نقطة</p>
          <button onClick={start} className="mt-2 bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-6 rounded-xl transition-all hover:scale-105">
            🔄 العب مجدداً
          </button>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-2xl p-6 text-center text-white text-lg font-medium min-h-[90px] flex items-center justify-center">
            {active ? SPEED_QUESTIONS[qIdx] : "هل أنت مستعد؟ 🚀"}
          </div>

          {active ? (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={answer} className="bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg">
                ✅ نعم
              </button>
              <button onClick={answer} className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-300 font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg">
                ❌ لا
              </button>
            </div>
          ) : (
            <button onClick={start} className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg">
              🚀 ابدأ التحدي!
            </button>
          )}
        </>
      )}
    </div>
  );
}