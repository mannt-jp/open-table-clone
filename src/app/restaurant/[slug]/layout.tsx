import Header from "./components/Header";

import { Cuisine, Location, PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  location: Location;
  cuisine: Cuisine;
  slug: string;
  reviews: Review[];
}

export const fetchRestaurantBySlug = async (
  slug: string
): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      cuisine: true,
      location: true,
      slug: true,
      reviews: true,
    },
    where: {
      slug,
    },
  });
  if (!restaurant) throw new Error();
  return restaurant;
};
export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <Header name={restaurant.name} cuisine={restaurant.cuisine.name}></Header>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
}
