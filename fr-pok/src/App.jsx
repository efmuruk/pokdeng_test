import { useState } from "react";
import "./App.css";
import Home from "./page/home";
import Play from "./page/play";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [gameId, setGameId] = useState("");
  const [balance, setBalance] = useState();
  return (
    <>
      {currentPage === "Home" && (
        <Home
          setPage={setCurrentPage}
          setGameId={setGameId}
          setBalance={setBalance}
        />
      )}
      {currentPage === "Play" && (
        <Play gameId={gameId} balance={balance} setBalance={setBalance} />
      )}
    </>
  );
}
