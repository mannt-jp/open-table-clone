import Header from "./components/Header";
import Card from "./components/Card";
import { PrismaClient, Cuisine, PRICE, Location, Review } from "@prisma/client";

const prisma = new PrismaClient();
export interface CardType {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  reviews: Review[];
}
const fetchRestaurants = async (): Promise<CardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header></Header>
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} restaurant={restaurant}></Card>
        ))}
      </div>
    </main>
  );
}
