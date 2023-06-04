import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import calculateAvgRating from "@/app/utils/averageRating";
import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import Link from "next/link";

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

export default function Card({ restaurant }: { restaurant: Restaurant }) {
  const averageRating = calculateAvgRating(restaurant.reviews);
  console.log(averageRating);
  return (
    <div className="w-5/6">
      <div className="border-b flex pb-5">
        <img src={restaurant.main_image} alt="" className="w-44 rounded" />
        <div className="pl-5">
          <h2 className="text-3xl">{restaurant.name}</h2>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews}></Stars>
            {restaurant.reviews.length ? (
              <p className="ml-2 text-sm">
                {averageRating > 4.5
                  ? "Awesome"
                  : averageRating > 3
                  ? "Good"
                  : "Bad"}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <p className="mr-4">
                <Price price={restaurant.price}></Price>
              </p>
              <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
              <p className="mdụngr-4 capitalize">{restaurant.location.name}</p>
            </div>
          </div>
          <div className="text-red-600">
            <Link href={`/restaurant/${restaurant.slug}`}>
              View more information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
