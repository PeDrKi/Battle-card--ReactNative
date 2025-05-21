export const randomizeCards = (cards, num = 3) => {
    if (cards.length < num) {
      throw new Error("Không đủ thẻ bài! Vui lòng thêm thẻ mới.");
    }
    return [...cards].sort(() => 0.5 - Math.random()).slice(0, num);
  };