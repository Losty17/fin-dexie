export default interface Category {
  id?: number; // auto-increment
  name: string;
  type: "expense" | "income";
}
