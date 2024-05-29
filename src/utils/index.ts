const getTotalValue = (
  moeda: string,
  valorHora: number,
  anual: boolean = true
): number => {
  const COTACAO_DOLAR = 5.15;

  const value = anual === true ? 12 : 1;

  if (moeda === "BRL") {
    return valorHora * 8 * 22 * value;
  } else if (moeda === "USD") {
    return valorHora * COTACAO_DOLAR * 8 * 22 * value;
  } else {
    return -1;
  }
};

export default getTotalValue;
