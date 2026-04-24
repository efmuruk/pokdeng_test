import { useEffect } from "react";

export default function Play({ gameId, balance }) {
  const onAction = async (gameId, action, cost) => {
    try {
      const response = await fetch(
        `http://localhost:3000/game/${gameId}/action`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
            action_charge: cost,
            amount: balance,
          }),
        },
      );

      //   if (!response.ok) throw new Error("เกิดข้อผิดพลาด");
      //   setBalance(balance - cost);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "เกิดข้อผิดพลาดจาก Server");
      }

      const data = await response.json();
      console.log("ผลลัพธ์ที่ได้:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getGameInfo = async (gameId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/game/${gameId}/inform`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("ไม่พบข้อมูลเกมmm");

      const data = await response.json();
      console.log("ข้อมูลเกม", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!gameId) return;
    console.log("fetch game data");
    getGameInfo(gameId);
  }, [gameId]);
  return (
    <section className="items-center flex flex-col h-full w-full gap-8">
      <text>game id: {gameId}</text>

      <text className="text-center">ยอดเงินคงเหลือ {balance}</text>

      <text>State game:</text>
      <text>Chose your action</text>
      <div className="flex flex-row gap-4">
        <CustomButton
          text="Bet"
          onClick={() => {
            onAction({ gameId: gameId, action: "bet", cost: 100 });
          }}
        />
        <CustomButton
          text="Cut"
          onClick={() => {
            onAction({ gameId: gameId, action: "cut", cost: 100 });
          }}
        />
        <CustomButton text="Draw" />
      </div>
      <text>ไพ่ที่คุณมีอยู่ได้แก่</text>
    </section>
  );
}

function CustomButton({ text, onClick, disabled }) {
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className="px-8 py-3 font-bold bg-black text-white uppercase transition-all duration-200 ease-in-out transform rounded-lg from-yellow-400 via-yellow-500 to-yellow-600 shadow-[0_4px_15px_rgba(234,179,8,0.4)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(234,179,8,0.6)] active:scale-95 border-b-4 border-yellow-700"
    >
      {text}
    </button>
  );
}
