export const applySpecialAbility = (card, aiCard, currentPlayerHealth, currentAiHealth, Health, nextCardAttackBonus = 0) => {
  let modifiedPlayerHealth = currentPlayerHealth;
  let modifiedAiHealth = currentAiHealth;
  let modifiedPlayerAttack = card.attack + nextCardAttackBonus;
  let modifiedAiAttack = aiCard.attack;
  let modifiedAiDefense = aiCard.defense;
  let modifiedPlayerDefense = card.defense;
  let abilityMessage = null;
  let nextCardAttackBonusOutput = 0;

  switch (card.name) {
    case "World Devourer":
      // Chia đôi số máu hiện tại của AI
      modifiedAiHealth = Math.floor(currentAiHealth / 2);
      abilityMessage = `${card.name} chia đôi số máu của BOT!`;
      break;
    case "Rak'khar":
      // Vô hiệu hóa chỉ số tấn công của thẻ AI
      modifiedAiAttack = 0;
      abilityMessage = `${card.name} vô hiệu hóa chỉ số tấn công của BOT!`;
      break;
    case "Grokk Bonenawer":
      // Giảm phòng thủ của thẻ AI xuống 50%
      modifiedAiDefense = Math.floor(aiCard.defense * 0.5);
      abilityMessage = `${card.name} giảm phòng thủ của BOT xuống 50%!`;
      break;
    case "King Amos":
      // Tăng 10 chỉ số tấn công cho thẻ tiếp theo
      nextCardAttackBonusOutput = 10;
      abilityMessage = `${card.name} tăng 10 chỉ số tấn công cho thẻ tiếp theo!`;
      break;
    case "Elf Archer":
      // Tăng sát thương thêm 5 nếu máu người chơi dưới 50
      if (currentPlayerHealth < 50) {
        modifiedPlayerAttack = card.attack + nextCardAttackBonus + 5;
        abilityMessage = `${card.name} tăng 5 sát thương vì máu của bạn dưới 50!`;
      }
      break;
    case "Abyssal Mage":
      // Hồi 15 HP cho người chơi và gây 10 sát thương trực tiếp cho AI
      modifiedPlayerHealth = Math.min(Health, currentPlayerHealth + 15);
      modifiedAiHealth = Math.max(0, currentAiHealth - 10);
      abilityMessage = `${card.name} hồi 15 HP cho bạn và gây 10 sát thương cho BOT!`;
      break;
    case "Undead Berserkers":
      // Tăng gấp đôi sát thương nếu phòng thủ dưới 5
      if (card.defense < 5) {
        modifiedPlayerAttack = (card.attack + nextCardAttackBonus) * 2;
        abilityMessage = `${card.name} tăng gấp đôi sát thương vì phòng thủ dưới 5!`;
      }
      break;
    case "Paladin Thorne":
      // Tăng phòng thủ của chính nó thêm 8
      modifiedPlayerDefense = card.defense + 8;
      abilityMessage = `${card.name} tăng phòng thủ thêm 8 điểm!`;
      break;
    case "Orc Shaman":
      // Đổi chỉ số tấn công và phòng thủ của thẻ AI
      modifiedAiAttack = aiCard.defense;
      modifiedAiDefense = aiCard.attack;
      abilityMessage = `${card.name} đổi chỉ số tấn công và phòng thủ của BOT!`;
      break;
    default:
      break;
  }

  return { 
    modifiedPlayerHealth, 
    modifiedAiHealth, 
    modifiedPlayerAttack, 
    modifiedAiAttack,
    modifiedAiDefense,
    modifiedPlayerDefense,
    nextCardAttackBonus: nextCardAttackBonusOutput,
    abilityMessage 
  };
};