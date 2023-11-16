"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { LIMIT } from "./constant";

const performAction = async (action: () => Promise<any>, path: string) => {
  try {
    const result = await action();
    revalidatePath(path);
    return result;
  } catch (error) {
    throw error;
  }
};

// Properties
export const getAllProperties = async () => {
  const properties = await prisma.property.findMany();

  return properties;
};

export const getProperties = async ({
  page = 1,
  limit = LIMIT,
}: {
  page?: number;
  limit?: number;
}) => {
  const properties = await prisma.property.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      options: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};

export const getFilteredProperties = async ({
  page = 1,
  limit = LIMIT,
  rooms,
  surface,
  price,
  title,
}: {
  page?: number;
  limit?: number;
  rooms?: number | "";
  surface?: number | "";
  price?: number | "";
  title?: string | "";
}) => {
  const filters: {
    rooms?: number | { gte: number };
    surface?: number | { gte: number };
    price?: number | { lte: number };
    title?: { contains: string };
  } = {};

  if (rooms !== "") filters.rooms = { gte: Number(rooms) };
  if (surface !== "") filters.surface = { gte: Number(surface) };
  if (price !== "") filters.price = { lte: Number(price) };
  if (title !== "") filters.title = { contains: title };

  const properties = await prisma.property.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      ...filters,
    },
    include: {
      options: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};

export const getPropertyById = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      options: {
        include: {
          option: true,
        },
      },
    },
  });

  return property;
};

export const createProperty = async (values: any) => {
  return performAction(
    async () =>
      await prisma.property.create({
        data: {
          ...values,
          options: {
            create: values.options.map((option: any) => ({
              option: { connect: { id: option.option.id } },
            })),
          },
        },
      }),
    "/admin/property"
  );
};

export const editProperty = async (propertyId: string, values: any) => {
  return performAction(async () => {
    const property = await prisma.property.update({
      where: { id: propertyId },
      data: {
        title: values.title,
        description: values.description,
        surface: values.surface,
        rooms: values.rooms,
        bedrooms: values.bedrooms,
        floor: values.floor,
        price: values.price,
        city: values.city,
        address: values.address,
        postal_code: values.postal_code,
        sold: values.sold,
        options: {
          deleteMany: {},
          create: values.options.map((option: any) => ({
            option: { connect: { id: option.option.id } },
          })),
        },
      },
    });
    return property;
  }, "/admin/property");
};

export const deleteProperty = async (propertyId: string) => {
  return performAction(async () => {
    await prisma.propertyOption.deleteMany({
      where: { propertyId },
    });

    return await prisma.property.delete({ where: { id: propertyId } });
  }, "/admin/property");
};

// Options
export const getAllOptions = async () => {
  const options = await prisma.option.findMany();

  return options;
};

export const getOptions = async ({
  page = 1,
  limit = LIMIT,
}: {
  page?: number;
  limit?: number;
}) => {
  const options = await prisma.option.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return options;
};

export const getOptionById = async (optionId: string) => {
  const option = await prisma.option.findUnique({
    where: {
      id: optionId,
    },
  });

  return option;
};

export const createOption = async (values: any) => {
  return performAction(
    async () => await prisma.option.create({ data: values }),
    "/admin/option"
  );
};

export const editOption = async (optionId: string, values: any) => {
  return performAction(
    async () =>
      await prisma.option.update({
        where: {
          id: optionId,
        },
        data: values,
      }),
    "/admin/option"
  );
};

export const deleteOption = async (optionId: string) => {
  return performAction(async () => {
    await prisma.propertyOption.deleteMany({
      where: { optionId },
    });

    return await prisma.option.delete({
      where: {
        id: optionId,
      },
    });
  }, "/admin/option");
};
