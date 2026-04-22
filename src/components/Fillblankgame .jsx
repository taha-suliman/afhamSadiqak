import { useState } from "react";
import { FILL_BLANKS } from "../data/gameData";
import { saveAnswer, saveScore } from "../firebase/hooks";

export default function FillBlankGame({ playerName, roomId, onScore }) {
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [totalDone, setTotalDone] = useState(0);

  const progress = (idx / FILL_BLANKS.length) * 100;

  const submit = async () => {
    if (!value.trim()) return;
    const question = FILL_BLANKS[idx];

    if (roomId && playerName) {
      await saveAnswer(roomId, "أكمل الجملة", playerName, question, value);
      await saveScore(roomId, playerName, 5);
    }

    onScore(5);
    setSubmitted(value);
    setTotalDone((t) => t + 1);

    setTimeout(() => {
      setSubmitted(null);
      setValue("");
      setIdx((i) => (i + 1) % FILL_BLANKS.length);
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* Header + Counter */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-violet-400">📝 أكمل الجملة</h3>
          <p className="text-white/50 text-sm">اكتب ما يجول في بالك!</p>
        </div>
        <div className="text-left">
          <p className="text-white/30 text-xs">الجملة</p>
          <p className="text-white font-bold">
            {idx + 1}
            <span className="text-white/30 font-normal"> / {FILL_BLANKS.length}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-violet-500 to-purple-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {totalDone > 0 && (
        <span className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white/40 inline-block">
          ✍️ أكملت {totalDone} جملة
        </span>
      )}

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
          <button onClick={submit}
            className="w-full bg-violet-500 hover:bg-violet-400 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 active:scale-95">
            📤 أرسل الإجابة
          </button>
        </div>
      ) : (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl p-4 text-center font-medium">
          ✅ تم حفظ: "<span className="font-bold">{submitted}</span>" +5 نقاط
        </div>
      )}
    </div>
  );
}