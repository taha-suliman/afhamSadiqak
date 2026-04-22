import { ACHIEVEMENTS } from "../data/gameData";

export default function Achievements({ score, correctAnswers }) {
  const unlocked = {
    firstCorrect: correctAnswers >= 1,
    streak5: correctAnswers >= 5,
    ten_points: score >= 10,
    topRank: false, // يحتاج Firebase
    speedDone: false, // يُحدَّث من SpeedGame
    hundred: score >= 100,
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold text-yellow-400">⭐ الإنجازات</h3>

      <div className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked[a.key];
          return (
            <div
              key={a.key}
              className={`rounded-2xl p-4 text-center border transition-all duration-300 ${
                isUnlocked
                  ? "bg-yellow-500/20 border-yellow-500/40 scale-100"
                  : "bg-white/5 border-white/10 opacity-40 grayscale"
              }`}
            >
              <p className="text-3xl mb-2">{a.icon}</p>
              <p className="text-white text-sm font-medium leading-snug">{a.label}</p>
              {isUnlocked && (
                <span className="text-xs text-yellow-400 font-bold mt-1 block">✓ مفتوح</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-blue-300 text-sm">
        💡 استمر باللعب لفتح المزيد من الإنجازات!
      </div>
    </div>
  );
}