import { capitalizeFirstLetter } from "@/app/restaurant/[slug]/components/Header";
import { PRICE } from "@prisma/client";
import Link from "next/link";

export default function SideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: { id: number; name: string }[];
  cuisines: { id: number; name: string }[];
  searchParams: { location?: string; cuisine?: string; price?: PRICE };
}) {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        {locations.length && <h1 className="mb-2">Region</h1>}
        {locations.map((location) => (
          <p className="font-light text-reg">
            <Link
              key={location.id}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  city: location.name,
                },
              }}
            >
              {capitalizeFirstLetter(location.name)}
            </Link>
          </p>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        {cuisines.length && <h1 className="mb-2">Cuisine</h1>}
        {cuisines.map((cuisine) => (
          <p className="font-light text-reg">
            <Link
              key={cuisine.id}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  cuisine: cuisine.name,
                },
              }}
            >
              {capitalizeFirstLetter(cuisine.name)}
            </Link>
          </p>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
            className="border w-full text-reg font-light rounded-l p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.EXPENSIVE },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$$
          </Link>
        </div>
      </div>
    </div>
  );
}
