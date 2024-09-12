import Footer from "./components/Footer";
import { GameScreen } from "./components/GameScreen";
import { Header } from "./components/Header";
import { GameProvider } from "./GameContext";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-8 row-start-2">
        <Header />
        <GameProvider >
          <GameScreen />
        </GameProvider>
      </main>
      <Footer />
    </div>
  );
}
