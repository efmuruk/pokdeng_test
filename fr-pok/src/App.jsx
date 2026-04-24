import { useState } from "react";
import "./App.css";

function App() {
  const [money, setMoney] = useState();
  const [confirmEnable, setConfirmEnable] = useState(false);

  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" && (
        <section>
          <div className="flex flex-col gap-3 items-center mt-8">
            <text className="text-4xl">
              สวัสดี ยินดีต้อนรับเข้าสู่เกม Pokdengggg
            </text>
            <text className="text-xl text-blue-600">กรอกวงเงินของคุณ</text>
            <input
              type="number"
              value={money}
              onChange={(e) => {
                setMoney(Number(e.target.value));
                setConfirmEnable(true);
              }}
              className="border-2 border-gray-500 w-1/4 rounded-xl p-2"
              placeholder="กรอกจำนวนเงิน"
            />

            <button
              className={
                confirmEnable == true
                  ? "px-8  text-xl py-3 font-bold bg-black text-white uppercase transition-all duration-200 ease-in-out transform rounded-lg from-yellow-400 via-yellow-500 to-yellow-600 shadow-[0_4px_15px_rgba(234,179,8,0.4)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(234,179,8,0.6)] active:scale-95 border-b-4 border-yellow-700"
                  : "text-xl text-gray-400 bg-gray-300 px-8 py-3 p-2"
              }
              disabled={!confirmEnable}
              onClick={() => setPage("start")}
            >
              เริ่มเกม
            </button>
          </div>
        </section>
      )}
      {page == "start" && (
        <section className="items-center flex flex-col h-full w-full gap-8">
          <div className="flex justify-between w-full ">
            <button
              onClick={() => {
                setPage("home");
                setMoney();
              }}
              className="bg-blue-100 border-blue-300 border-2 rounded-m"
            >
              ⏪ ย้อนกลับ
            </button>
            <text className="">วงเงินของคุณในรอบนี้ {money}</text>
          </div>

          <text>State game:</text>
          <text>เลือก action ของคุณ</text>
          <div className="flex flex-row gap-4">
            <CustomButton text="Bet" />
            <CustomButton text="Cut" />
            <CustomButton text="Draw" />
          </div>
          <text>ไพ่ที่คุณมีอยู่ได้แก่</text>
        </section>
      )}
      {page == "end" && (
        <section>
          <text>Dealer Card:</text>
          <text>Your Card:</text>
          <text>Result:</text>
          <text>Do you want to restart</text>
          <button>Restart</button>
          <button>Select Money Again</button>
        </section>
      )}
    </div>
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
export default App;
