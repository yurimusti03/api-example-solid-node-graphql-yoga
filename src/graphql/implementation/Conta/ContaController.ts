import getTotalValue from "../../../utils";

const ContaController = (_: unknown, { input }: any) => {
  const { moeda, valorHora } = input;

  return {
    moeda,
    valorHora,
    totalAnual: getTotalValue(moeda, valorHora, true),
    totalMensal: getTotalValue(moeda, valorHora, false),
  };
};

export default ContaController;
