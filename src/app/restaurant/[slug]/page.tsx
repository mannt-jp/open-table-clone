import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import MakeReservation from "./components/MakeReservation";
import Reviews from "./components/Reviews";
import { fetchRestaurantBySlug } from "./layout";

export default async function RestaurantDetail({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug}></RestaurantNavBar>
        <Title title={restaurant.name}></Title>
        <Rating reviews={restaurant.reviews}></Rating>
        <Description description={restaurant.description}></Description>
        <Images images={restaurant.images}></Images>
        {restaurant.reviews && <Reviews reviews={restaurant.reviews}></Reviews>}
      </div>
      <MakeReservation></MakeReservation>
    </>
  );
}
