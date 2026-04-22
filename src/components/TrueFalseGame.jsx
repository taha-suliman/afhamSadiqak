import { useState } from "react";
import { TF_QUESTIONS } from "../data/gameData";
import { saveAnswer, saveScore } from "../firebase/hooks";

export default function TrueFalseGame({ playerName, roomId, onScore }) {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const question = TF_QUESTIONS[idx];

  const answer = async (choice) => {
    if (loading) return;
    setLoading(true);
    const isCorrect = Math.random() > 0.5;

    if (roomId && playerName) {
      await saveAnswer(roomId, "صح أم خطأ", playerName, question, choice);
      if (isCorrect) await saveScore(roomId, playerName, 10);
    }

    setResult({ isCorrect, choice });
    if (isCorrect) onScore(10);
    setLoading(false);
  };

  const next = () => {
    setResult(null);
    setIdx((i) => (i + 1) % TF_QUESTIONS.length);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-1">🎲 صح أم خطأ؟</h3>
        <p className="text-white/50 text-sm">خمّن إجابة صديقك!</p>
      </div>

      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6 text-center text-white text-lg font-medium min-h-[90px] flex items-center justify-center leading-relaxed">
        {question}
      </div>

      {!result ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => answer("صح")}
            disabled={loading}
            className="bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 font-bold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-lg disabled:opacity-50"
          >
            ✅ صح
          </button>
          <button
            onClick={() => answer("خطأ")}
            disabled={loading}
            className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-300 font-bold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-lg disabled:opacity-50"
          >
            ❌ خطأ
          </button>
        </div>
      ) : (
        <div
          className={`rounded-xl p-4 text-center font-bold text-lg animate-pulse-once ${
            result.isCorrect
              ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
              : "bg-red-500/20 border border-red-500/40 text-red-300"
          }`}
        >
          {result.isCorrect ? "✅ إجابة صحيحة! +10 نقاط 🎉" : "❌ إجابة خاطئة، حاول مرة أخرى!"}
        </div>
      )}

      <button
        onClick={next}
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        السؤال التالي ←
      </button>
    </div>
  );
}