import fullStar from "../../../public/icons/full-star.png";
import halfStar from "../../../public/icons/half-star.png";
import emptyStar from "../../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import calculateAvgRating from "../utils/averageRating";
export default function Stars({ reviews }: { reviews: Review[] }) {
  const averageRating = calculateAvgRating(reviews);
  let stars = [...Array(Math.floor(averageRating))].map(() => (
    <Image className="w-4 h-4 mr-1" src={fullStar} alt="*"></Image>
  ));
  if (stars.length) {
    const halfStarCount = Math.floor((averageRating - stars.length) / 0.5);
    stars = stars.concat(
      [...Array(halfStarCount)].map(() => (
        <Image className="w-4 h-4 mr-1" src={halfStar} alt=""></Image>
      ))
    );
    const emptyStarCount = 5 - stars.length;
    if (emptyStarCount >= 1) {
      stars = stars.concat(
        [...Array(emptyStarCount)].map(() => (
          <Image className="w-4 h-4 mr-1" src={emptyStar} alt=""></Image>
        ))
      );
    }
  }
  return <div className="flex items-center">{stars}</div>;
}
