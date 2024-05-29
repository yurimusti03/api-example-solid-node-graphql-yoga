const ContaDTO = /* GraphQL */ `
  type ContaResponse {
    moeda: String
    valorHora: Float
    totalAnual: String
    totalMensal: String
  }

  input ContaInput {
    moeda: String!
    valorHora: Float!
  }
`;

export default ContaDTO;
