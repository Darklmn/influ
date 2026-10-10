// Footprint candle used throughout the explainer (Bid x Ask per price, tick 0.25).
// Built to be internally consistent:
//   OHLC  O 4518.00  H 4520.00  L 4517.75  C 4519.75 (bullish)
//   Diagonal imbalance = Ask(P) / Bid(P - 1 tick) ≥ 3  → rows 4519.50, 4519.25, 4519.00 (stacked)
//   Σ Ask 2,170 − Σ Bid 1,073 = Delta +1,097

export type Row = {price: number; bid: number; ask: number};

export const ROWS: Row[] = [
  {price: 4520.0, bid: 12, ask: 48},
  {price: 4519.75, bid: 64, ask: 186},
  {price: 4519.5, bid: 95, ask: 412},
  {price: 4519.25, bid: 88, ask: 365},
  {price: 4519.0, bid: 102, ask: 398},
  {price: 4518.75, bid: 118, ask: 285},
  {price: 4518.5, bid: 310, ask: 296},
  {price: 4518.25, bid: 156, ask: 120},
  {price: 4518.0, bid: 98, ask: 54},
  {price: 4517.75, bid: 30, ask: 6},
];

export const OPEN_ROW = 8; // 4518.00
export const CLOSE_ROW = 1; // 4519.75
export const IMB_ROWS = [2, 3, 4];
export const SUM_ASK = ROWS.reduce((a, r) => a + r.ask, 0); // 2170
export const SUM_BID = ROWS.reduce((a, r) => a + r.bid, 0); // 1073
export const DELTA = SUM_ASK - SUM_BID; // 1097
export const MAX_BID = Math.max(...ROWS.map((r) => r.bid));
export const MAX_ASK = Math.max(...ROWS.map((r) => r.ask));

// Ladder layout (px, 1080x1920 canvas)
export const LAD = {
  top: 400,
  rowH: 70,
  pitch: 76,
  candleX: 145,
  bidX: 185,
  askX: 475,
  cellW: 280,
  priceX: 772,
};
export const rowY = (i: number) => LAD.top + i * LAD.pitch; // top edge of row i
export const rowCY = (i: number) => rowY(i) + LAD.rowH / 2;
export const LAD_BOTTOM = rowY(ROWS.length - 1) + LAD.rowH;
export const CELLS_CX = (LAD.bidX + LAD.askX + LAD.cellW) / 2; // centre of bid+ask block
export const CELLS_W = LAD.askX + LAD.cellW - LAD.bidX;

export const fmtPrice = (p: number) => p.toFixed(2);
export const fmtInt = (n: number) => n.toLocaleString('en-US');
