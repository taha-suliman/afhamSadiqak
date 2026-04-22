import { useState } from "react";
import { TF_QUESTIONS } from "../data/gameData";
import { saveAnswer, saveScore } from "../firebase/hooks";

export default function TrueFalseGame({ playerName, roomId, onScore }) {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const question = TF_QUESTIONS[idx];
  const progress = (idx / TF_QUESTIONS.length) * 100;

  const answer = async (choice) => {
    if (loading || result) return;
    setLoading(true);
    const isCorrect = Math.random() > 0.5;

    if (roomId && playerName) {
      await saveAnswer(roomId, "صح أم خطأ", playerName, question, choice);
      if (isCorrect) await saveScore(roomId, playerName, 10);
    }

    setStreak(isCorrect ? streak + 1 : 0);
    setTotalAnswered((t) => t + 1);
    setResult({ isCorrect, choice });
    if (isCorrect) onScore(10);
    setLoading(false);
  };

  const next = () => {
    setResult(null);
    setIdx((i) => (i + 1) % TF_QUESTIONS.length);
  };

  return (
    <div className="space-y-4">
      {/* Header + Counter */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-amber-400">🎲 صح أم خطأ؟</h3>
          <p className="text-white/50 text-sm">خمّن إجابة صديقك!</p>
        </div>
        <div className="text-left">
          <p className="text-white/30 text-xs">السؤال</p>
          <p className="text-white font-bold">
            {idx + 1}
            <span className="text-white/30 font-normal"> / {TF_QUESTIONS.length}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Streak badge */}
      {streak >= 2 && (
        <div className="flex justify-end">
          <span className="bg-orange-500/20 border border-orange-500/30 rounded-lg px-3 py-1 text-xs text-orange-300 font-bold animate-bounce">
            🔥 {streak} إجابات متتالية!
          </span>
        </div>
      )}

      {/* Question */}
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6 text-center text-white text-lg font-medium min-h-[90px] flex items-center justify-center leading-relaxed">
        {question}
      </div>

      {!result ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => answer("صح")} disabled={loading}
            className="bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg disabled:opacity-50">
            ✅ صح
          </button>
          <button onClick={() => answer("خطأ")} disabled={loading}
            className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-300 font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg disabled:opacity-50">
            ❌ خطأ
          </button>
        </div>
      ) : (
        <div className={`rounded-xl p-4 text-center font-bold text-lg ${
          result.isCorrect
            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
            : "bg-red-500/20 border border-red-500/40 text-red-300"
        }`}>
          {result.isCorrect ? "✅ إجابة صحيحة! +10 نقاط 🎉" : "❌ إجابة خاطئة، حاول مرة أخرى!"}
        </div>
      )}

      <button onClick={next}
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-all hover:scale-105 active:scale-95">
        السؤال التالي ←
      </button>
    </div>
  );
}