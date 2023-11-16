import { prisma } from "./prisma";

export const getTotalPropertiesCount = async () => {
  const totalProperties = await prisma.property.count();
  return totalProperties;
};
