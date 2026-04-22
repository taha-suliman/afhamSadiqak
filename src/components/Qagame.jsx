import { useState } from "react";
import {
  useActiveQuestion,
  publishQuestion,
  submitQAAnswer,
  clearQuestion,
} from "../firebase/hooks";

export default function QAGame({ playerName, roomId, onScore }) {
  const [myQuestion, setMyQuestion] = useState("");
  const [myAnswer, setMyAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const activeQ = useActiveQuestion(roomId);

  const answers = activeQ?.answers ? Object.values(activeQ.answers) : [];
  const iAsked = activeQ?.askedBy === playerName;
  const iAnswered = answered || answers.some((a) => a.playerName === playerName);

  // ── نشر سؤال ──
  const handlePublish = async () => {
    if (!myQuestion.trim() || !roomId) return;
    setPublishing(true);
    await publishQuestion(roomId, playerName, myQuestion);
    setMyQuestion("");
    setAnswered(false);
    setPublishing(false);
  };

  // ── إرسال إجابة ──
  const handleAnswer = async () => {
    if (!myAnswer.trim() || !roomId) return;
    await submitQAAnswer(roomId, playerName, myAnswer);
    onScore(5);
    setMyAnswer("");
    setAnswered(true);
  };

  // ── مسح السؤال (فقط من سأل) ──
  const handleClear = async () => {
    await clearQuestion(roomId);
    setAnswered(false);
  };

  if (!roomId) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-rose-400 mb-1">💬 اسأل وجاوب</h3>
          <p className="text-white/50 text-sm">لعب جماعي حي</p>
        </div>
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-3">🔒</p>
          <p className="text-white/60 text-sm leading-relaxed">
            هذا الوضع يحتاج <span className="text-rose-400 font-bold">كود غرفة</span>
            <br />ادخل كود مشترك مع أصدقائك من الإعدادات ⚙️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-rose-400 mb-1">💬 اسأل وجاوب</h3>
        <p className="text-white/50 text-sm">
          واحد يسأل، الكل يجاوب — مباشر{" "}
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
            <span className="text-red-400">live</span>
          </span>
        </p>
      </div>

      {/* ── السؤال النشط ── */}
      {activeQ ? (
        <div className="space-y-4">
          {/* بطاقة السؤال */}
          <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-rose-300 font-medium">
                🙋 سؤال من: {activeQ.askedBy}
              </span>
              {iAsked && (
                <button
                  onClick={handleClear}
                  className="text-xs text-white/30 hover:text-red-400 transition-colors"
                >
                  ✕ أغلق السؤال
                </button>
              )}
            </div>
            <p className="text-white text-lg font-bold leading-relaxed">
              {activeQ.question}
            </p>
          </div>

          {/* إجابات المشاركين */}
          {answers.length > 0 && (
            <div className="space-y-2">
              <p className="text-white/40 text-xs">
                {answers.length} إجابة وصلت
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {answers.map((a) => (
                  <div
                    key={a.playerName}
                    className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
                      a.playerName === playerName
                        ? "bg-violet-500/20 border-violet-500/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <span className="text-lg mt-0.5">
                      {a.playerName === playerName ? "👤" : "🙂"}
                    </span>
                    <div>
                      <p className="text-white/50 text-xs">{a.playerName}</p>
                      <p className="text-white font-medium mt-0.5">{a.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* حقل الإجابة */}
          {!iAsked && !iAnswered && (
            <div className="space-y-2">
              <input
                type="text"
                value={myAnswer}
                onChange={(e) => setMyAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnswer()}
                placeholder="اكتب إجابتك..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-400 transition-colors text-right"
                dir="rtl"
              />
              <button
                onClick={handleAnswer}
                className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                📤 أرسل إجابتك +5 نقاط
              </button>
            </div>
          )}

          {iAnswered && !iAsked && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl p-4 text-center font-medium">
              ✅ تم إرسال إجابتك! في انتظار الباقين...
            </div>
          )}

          {iAsked && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center text-white/40 text-sm">
              أنت من طرحت السؤال 🎤 — في انتظار إجابات أصدقائك
            </div>
          )}
        </div>
      ) : (
        /* ── لا يوجد سؤال نشط ── */
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-4xl mb-3">🎤</p>
            <p className="text-white/50 text-sm">لا يوجد سؤال نشط الآن</p>
            <p className="text-white/30 text-xs mt-1">اطرح سؤالاً وسيظهر لجميع أفراد الغرفة فوراً</p>
          </div>

          <div className="space-y-2">
            <label className="text-white/60 text-sm block">اكتب سؤالك:</label>
            <textarea
              value={myQuestion}
              onChange={(e) => setMyQuestion(e.target.value)}
              placeholder="مثال: ما هو أكثر شيء تندم عليه في حياتك؟"
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-400 transition-colors text-right resize-none"
              dir="rtl"
            />
            <button
              onClick={handlePublish}
              disabled={publishing || !myQuestion.trim()}
              className="w-full bg-rose-500 hover:bg-rose-400 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              {publishing ? "جاري النشر..." : "🎤 انشر السؤال للغرفة"}
            </button>
          </div>

          {/* أمثلة أسئلة */}
          <div className="space-y-2">
            <p className="text-white/30 text-xs">أسئلة مقترحة:</p>
            {[
              "ما هو حلمك الذي لم تخبر أحداً به؟",
              "ما هو أضحك موقف حدث معك؟",
              "لو كان عندك يوم واحد تعيشه من جديد، أي يوم تختار؟",
            ].map((q) => (
              <button
                key={q}
                onClick={() => setMyQuestion(q)}
                className="w-full text-right bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white/50 hover:text-white/80 text-sm transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}