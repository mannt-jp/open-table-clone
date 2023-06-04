import { PRICE, PrismaClient } from "@prisma/client";
import Card from "./components/Card";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

export const metadata = {
  title: "Search OpenTable",
  description: "Find restaurant",
};

const prisma = new PrismaClient();

const fetchRestaurantsByQuery = async ({
  city,
  cuisine,
  price,
}: {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}) => {
  const WHERE: any = {};
  if (city) {
    WHERE.location = {
      name: {
        contains: city.toLowerCase(),
      },
    };
  }
  if (cuisine) {
    WHERE.cuisine = {
      name: {
        contains: cuisine.toLowerCase(),
      },
    };
  }
  if (price) {
    WHERE.price = {
      price,
    };
  }
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
    where: WHERE,
  });
  if (!restaurants) return [];
  return restaurants;
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  if (!locations) return [];
  return locations;
};

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  if (!cuisines) return [];
  return cuisines;
};

export default async function Search({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const restaurants = await fetchRestaurantsByQuery(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <>
      <Header></Header>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        ></SideBar>
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <Card key={restaurant.id} restaurant={restaurant}></Card>
            ))
          ) : (
            <p>
              There is no restaurant at
              <span className="capitalize">{searchParams.city}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
