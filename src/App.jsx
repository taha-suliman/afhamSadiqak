import { useState, useEffect } from "react";
import TrueFalseGame from "./components/TrueFalseGame";
import FillBlankGame from "./components/FillBlankGame";
import GuessNumberGame from "./components/GuessNumberGame";
import SpeedGame from "./components/SpeedGame";
import QAGame from "./components/QAGame";
import Leaderboard from "./components/Leaderboard";
import Achievements from "./components/Achievements";
import Settings from "./components/Settings";
import AnswersFeed from "./components/AnswersFeed";

const TABS = [
  { id: "games", label: "🎯 الألعاب" },
  { id: "leaderboard", label: "🏆 التصنيف" },
  { id: "achievements", label: "⭐ الإنجازات" },
  { id: "settings", label: "⚙️ إعدادات" },
];

const GAMES = [
  { id: "tf", label: "🎲 صح أم خطأ" },
  { id: "fill", label: "📝 أكمل الجملة" },
  { id: "number", label: "🔢 خمن الرقم" },
  { id: "speed", label: "⚡ تحدي السرعة" },
  { id: "qa", label: "💬 اسأل وجاوب" },
];

export default function App() {
  const [tab, setTab] = useState("games");
  const [game, setGame] = useState("tf");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem("uf_player") || "اللاعب"
  );
  const [roomId, setRoomId] = useState(
    () => localStorage.getItem("uf_room") || ""
  );

  const addScore = (pts) => {
    setScore((s) => s + pts);
    if (pts >= 10) setCorrectAnswers((c) => c + 1);
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a12] text-white"
      dir="rtl"
      style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-cyan-600/8 blur-[90px]" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 pb-32">
        {/* Header */}
        <header className="pt-10 pb-6 text-center">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400">
              🎮 افهم صديقك
            </span>
          </h1>
          <p className="text-white/40 text-sm mt-1">اكسر الجليد، ابنِ صداقات حقيقية</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white/50">
              👤 {playerName}
            </span>
            {roomId && (
              <span className="bg-violet-500/20 border border-violet-500/30 rounded-full px-3 py-1 text-xs text-violet-300">
                🔴 {roomId}
              </span>
            )}
            <span className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1 text-xs text-amber-300 font-bold">
              ⭐ {score} نقطة
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="space-y-4">
          {tab === "games" && (
            <>
              {/* Game selector — horizontal scroll */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGame(g.id)}
                    className={`flex-shrink-0 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      game === g.id
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Game Panel */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                {game === "tf" && (
                  <TrueFalseGame playerName={playerName} roomId={roomId} onScore={addScore} />
                )}
                {game === "fill" && (
                  <FillBlankGame playerName={playerName} roomId={roomId} onScore={addScore} />
                )}
                {game === "number" && (
                  <GuessNumberGame playerName={playerName} roomId={roomId} onScore={addScore} />
                )}
                {game === "speed" && (
                  <SpeedGame playerName={playerName} roomId={roomId} onScore={addScore} />
                )}
                {game === "qa" && (
                  <QAGame playerName={playerName} roomId={roomId} onScore={addScore} />
                )}
              </div>

              {/* Live feed */}
              <AnswersFeed roomId={roomId} />
            </>
          )}

          {tab === "leaderboard" && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <Leaderboard roomId={roomId} localScore={score} playerName={playerName} />
            </div>
          )}

          {tab === "achievements" && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <Achievements score={score} correctAnswers={correctAnswers} />
            </div>
          )}

          {tab === "settings" && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <Settings
                playerName={playerName}
                setPlayerName={setPlayerName}
                roomId={roomId}
                setRoomId={setRoomId}
              />
            </div>
          )}
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a12]/90 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-lg mx-auto flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-4 text-xs font-medium transition-all duration-200 ${
                tab === t.id
                  ? "text-violet-400 border-t-2 border-violet-400"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}