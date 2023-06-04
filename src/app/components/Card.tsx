import Link from "next/link";
import { CardType } from "../page";
import Price from "./Price";
import calculateAvgRating from "../utils/averageRating";
import Stars from "./Stars";

export default function Card({ restaurant }: { restaurant: CardType }) {
  const averageRating = calculateAvgRating(restaurant.reviews);
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={"/restaurant/" + restaurant.slug}>
        <img
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews}></Stars>
            {restaurant.reviews.length ? (
              <p className="ml-2">
                {restaurant.reviews.length === 1
                  ? restaurant.reviews.length + " review"
                  : restaurant.reviews.length + " reviews"}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price}></Price>
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
