import Header from "./components/Header";
import Form from "./components/Form";
import { PrismaClient } from "@prisma/client";
import { fetchRestaurantBySlug } from "@/app/restaurant/[slug]/layout";

const prisma = new PrismaClient();
export default async function Reservation({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const { slug } = params;
  const { date, partySize } = searchParams;
  const [day, time] = date.split("T");
  const restaurant = await fetchRestaurantBySlug(slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          name={restaurant.name}
          date={date}
          partySize={partySize}
        ></Header>
        <Form slug={slug} day={day} time={time} partySize={partySize}></Form>
      </div>
    </div>
  );
}
