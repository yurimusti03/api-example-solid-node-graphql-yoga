export const Mutation = /* GraphQL */ `
  type Mutation {
    somar(input: SomarInput): SomarResponse
  }
`;

export const Query = /* GraphQL */ `
  type Query {
    conta(input: ContaInput): ContaResponse
  }
`;

export const Subscription = /* GraphQL */ `
  type Subscription {
    randomNumber: Float
  }
`;
