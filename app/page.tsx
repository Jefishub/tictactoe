import CustomFooter from "./components/Footer";
import { GameScreen } from "./components/GameScreen";
import { Header } from "./components/Header";
import { GameProvider } from "./GameContext";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col justify-between">
      <main className="flex flex-col w-full gap-8 row-start-2">
        <Header />
        <GameProvider >
          <GameScreen />
        </GameProvider>
      </main>
      <CustomFooter />
    </div>
  );
}
