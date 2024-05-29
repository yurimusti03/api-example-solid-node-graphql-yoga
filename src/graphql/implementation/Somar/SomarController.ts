import { SOMAR_RANDOM_NUMBER } from ".";

const SomarController = (_: any, { input }: any, { pubSub }: any) => {
  const { value1, value2 } = input;

  pubSub.publish(SOMAR_RANDOM_NUMBER, Math.random());

  return {
    result: value1 + value2,
  };
};

export default SomarController;
