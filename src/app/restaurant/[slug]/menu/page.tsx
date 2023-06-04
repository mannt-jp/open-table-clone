import { PrismaClient } from "@prisma/client";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "./components/Menu";

const prisma = new PrismaClient();

const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) throw new Error();
  return restaurant.items
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchItems(params.slug);
  return (
    <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug}></RestaurantNavBar>
        <Menu menu={menu}></Menu>
      </div>
    </div>
  );
}
