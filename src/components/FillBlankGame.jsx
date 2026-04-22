import { useState } from "react";
import { FILL_BLANKS } from "../data/gameData";
import { saveAnswer, saveScore } from "../firebase/hooks";

export default function FillBlankGame({ playerName, roomId, onScore }) {
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const submit = async () => {
    if (!value.trim()) return;
    const question = FILL_BLANKS[idx];

    if (roomId && playerName) {
      await saveAnswer(roomId, "أكمل الجملة", playerName, question, value);
      await saveScore(roomId, playerName, 5);
    }

    onScore(5);
    setSubmitted(value);

    setTimeout(() => {
      setSubmitted(null);
      setValue("");
      setIdx((i) => (i + 1) % FILL_BLANKS.length);
    }, 1800);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-violet-400 mb-1">📝 أكمل الجملة</h3>
        <p className="text-white/50 text-sm">اكتب ما يجول في بالك!</p>
      </div>

      <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-6 text-center text-white text-lg font-medium min-h-[90px] flex items-center justify-center leading-relaxed">
        {FILL_BLANKS[idx]}
      </div>

      {!submitted ? (
        <div className="space-y-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="اكتب إجابتك هنا..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-400 transition-colors text-right"
            dir="rtl"
          />
          <button
            onClick={submit}
            className="w-full bg-violet-500 hover:bg-violet-400 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📤 أرسل الإجابة
          </button>
        </div>
      ) : (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl p-4 text-center font-medium animate-bounce">
          ✅ تم حفظ: "<span className="font-bold">{submitted}</span>" +5 نقاط
        </div>
      )}
    </div>
  );
}