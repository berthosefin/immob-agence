import { prisma } from "./prisma";

export const getTotalOptionsCount = async () => {
  const totalOptions = await prisma.option.count();
  return totalOptions;
};
