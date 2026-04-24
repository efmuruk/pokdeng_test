import { useState } from "react";

export default function Home({ setPage, setGameId, setBalance }) {
  const onStart = async (money) => {
    try {
      const response = await fetch("http://localhost:3000/game/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initial_balance: money }),
      });

      if (!response.ok) throw new Error("เกิดข้อผิดพลาด");

      const data = await response.json();
      console.log("ผลลัพธ์ที่ได้:", data);
      setPage("Play");
      setGameId(data.game_id);
      setBalance(data.initial_balance);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [money, setMoney] = useState();
  const [confirmEnable, setConfirmEnable] = useState(false);
  return (
    <section>
      <div className="flex flex-col gap-3 items-center mt-8">
        <text className="text-4xl">Hello welcome to Pokdengggg</text>
        <text className="text-xl text-blue-600">Insert your balance </text>
        <input
          type="number"
          value={money}
          onChange={(e) => {
            setMoney(Number(e.target.value));
            setConfirmEnable(true);
          }}
          className="border-2 border-gray-500 w-1/4 rounded-xl p-2"
          placeholder="balance"
        />

        <button
          className={
            confirmEnable == true
              ? "px-8  text-xl py-3 font-bold bg-black text-white uppercase transition-all duration-200 ease-in-out transform rounded-lg from-yellow-400 via-yellow-500 to-yellow-600 shadow-[0_4px_15px_rgba(234,179,8,0.4)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(234,179,8,0.6)] active:scale-95 border-b-4 border-yellow-700"
              : "text-xl text-gray-400 bg-gray-300 px-8 py-3 p-2"
          }
          disabled={!confirmEnable}
          onClick={() => {
            onStart(money);
            console.log(money);
          }}
        >
          เริ่มเกม
        </button>
      </div>
    </section>
  );
}
