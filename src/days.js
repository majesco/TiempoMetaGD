const CONSTANTS = {
  PerformanceDailyfactor: 140,
  reBuyAmount: 107,
};

const buyOffsetAmount = (investment, base) => {
  if (base < CONSTANTS.reBuyAmount) {
    return { newInvestment: investment, newBase: base, newDays: 0 };
  }

  return buyOffsetAmount(investment + 100, base - CONSTANTS.reBuyAmount);
};

const daysToRebuy = (investment, base) => {
  if (base >= CONSTANTS.reBuyAmount) {
    return buyOffsetAmount(investment, base);
  }

  const dailyAmount = investment / CONSTANTS.PerformanceDailyfactor;
  const days = Math.ceil((CONSTANTS.reBuyAmount - base) / dailyAmount);
  const newBase = Math.round(dailyAmount * days + base - CONSTANTS.reBuyAmount);
  return {
    newInvestment: days > 0 ? investment + 100 : investment,
    newBase,
    newDays: days > 0 ? days : 0,
  };
};

const daysToGoalAux = (goal, investment, base, days) => {
  if (investment >= goal || days === Infinity) {
    return days;
  }

  const { newInvestment, newBase, newDays } = daysToRebuy(investment, base);

  return daysToGoalAux(goal, newInvestment, newBase, days + newDays);
};

export const daysToGoal = (goal, investment, base) => {
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const days = daysToGoalAux(goal, investment, base, 0);
  return {
    date: addDays(new Date(), days).toLocaleDateString("es-ES", options),
    days,
  };
};
