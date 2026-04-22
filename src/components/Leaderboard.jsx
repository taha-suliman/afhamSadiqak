import { useScores } from "../firebase/hooks";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ roomId, localScore, playerName }) {
  const scores = useScores(roomId);

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold text-amber-400">🏆 التصنيفات</h3>

      {/* Local Score */}
      <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-2xl p-5">
        <p className="text-white/50 text-sm mb-1">نقاطك الحالية</p>
        <p className="text-5xl font-black text-amber-400">{localScore}</p>
        <p className="text-white/40 text-sm mt-1">{playerName || "اللاعب"}</p>
      </div>

      {/* Firebase Leaderboard */}
      {roomId ? (
        <div className="space-y-2">
          <p className="text-white/50 text-sm">ترتيب الغرفة — حي ومباشر 🔴</p>
          {scores.length === 0 ? (
            <p className="text-white/30 text-center py-8">لا يوجد لاعبون بعد...</p>
          ) : (
            scores.map((s, i) => (
              <div
                key={s.playerName}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  s.playerName === playerName
                    ? "bg-amber-500/20 border-amber-500/40"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{MEDALS[i] || `${i + 1}.`}</span>
                  <span className="text-white font-medium">{s.playerName}</span>
                  {s.playerName === playerName && (
                    <span className="text-xs bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full">أنت</span>
                  )}
                </div>
                <span className="text-amber-400 font-black">{s.score} نقطة</span>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
          <p className="text-white/40 text-sm">أدخل كود الغرفة في الإعدادات لرؤية تصنيفات المجموعة</p>
        </div>
      )}

      {/* Static leaderboard fallback */}
      {!roomId && (
        <div className="space-y-2 opacity-40">
          <p className="text-white/50 text-xs">مثال للترتيب:</p>
          {["أحمد محمد", "فاطمة علي", "محمود حسن"].map((name, i) => (
            <div key={name} className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <span>{MEDALS[i]}</span>
                <span className="text-white">{name}</span>
              </div>
              <span className="text-amber-400 font-bold">{250 - i * 20} نقطة</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}