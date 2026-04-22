import { useState } from "react";
import { saveAnswer, saveScore } from "../firebase/hooks";

export default function GuessNumberGame({ playerName, roomId, onScore }) {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);

  const check = async () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 10) return;

    const random = Math.floor(Math.random() * 10) + 1;
    const correct = num === random;

    if (roomId && playerName) {
      await saveAnswer(roomId, "خمن الرقم", playerName, "رقم بين 1-10", guess);
      if (correct) await saveScore(roomId, playerName, 20);
    }

    if (correct) onScore(20);
    setResult({ correct, random });
    setGuess("");
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-1">🔢 خمن الرقم</h3>
        <p className="text-white/50 text-sm">خمن رقم صديقك بين 1 و 10!</p>
      </div>

      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-6 text-center text-white text-lg font-medium min-h-[90px] flex items-center justify-center">
        فكّر صديقك برقم بين 1 و 10 🤔
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          min="1"
          max="10"
          placeholder="1 - 10"
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors text-center text-xl font-bold"
        />
        <button
          onClick={check}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          🎯 خمّن!
        </button>
      </div>

      {result && (
        <div
          className={`rounded-xl p-4 text-center font-bold text-lg ${
            result.correct
              ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
              : "bg-red-500/20 border border-red-500/40 text-red-300"
          }`}
        >
          {result.correct
            ? `🎉 صح! الرقم كان ${result.random} +20 نقطة`
            : `❌ الرقم الصحيح كان ${result.random}`}
        </div>
      )}
    </div>
  );
}