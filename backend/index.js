const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let sessionGames = [];

const GameState = {
  WAITING_FOR_CUT: "WAITING_FOR_CUT",
  WAITING_FOR_BET: "WAITING_FOR_BET",
  WAITING_FOR_DECISION: "WAITING_FOR_DECISION",
  ROUND_END: "ROUND_END",
};

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

function shuffle(deck) {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

app.post("/game/start", (req, res) => {
  const { initial_balance } = req.body;
  const game_id = uuidv4();
  sessionGames.push({
    id: game_id,
    balance: initial_balance,
    state: GameState.WAITING_FOR_CUT,
    player_hand: [],
    dealer_hand: [],
    deck: shuffle(createDeck()),
  });

  res.json({
    game_id: game_id,
    initial_balance: initial_balance,
    state: GameState.WAITING_FOR_CUT,
  });
});

app.post("/game/:game_id/action", (req, res) => {
  const { game_id } = req.params;
  const { action, amount } = req.body;

  const sessionGame = sessionGames.find((g) => g.id === game_id);
  if (!sessionGame) {
    return res.status(404).json({ error: "ERR_SESSION_NOT_FOUND" });
  }

  if (sessionGame.state === GameState.WAITING_FOR_CUT) {
    if (action !== "cut") {
      return res.status(400).json({ error: "ERR_INVALID_ACTION" });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "ERR_INVALID_AMOUNT" });
    }

    sessionGame.state = GameState.WAITING_FOR_BET;
    const cutIndex = Math.min(amount, sessionGame.deck.length - 1);
    sessionGame.deck = [
      ...sessionGame.deck.slice(cutIndex),
      ...sessionGame.deck.slice(0, cutIndex),
    ];

    return res.json({
      game_id: game_id,
      state: sessionGame.state,
      balance: sessionGame.balance,
    });
  }

  return res.json({
    game_id: game_id,
    state: action,
    balance: sessionGame.balance,
    player_hand: [],
    dealer_hand_visible: [],
    player_score: 0,
    dealer_score: null,
    winner: null,
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
