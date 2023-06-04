import { Review } from "@prisma/client";

export default function calculateAvgRating(reviews: Review[]) {
  return reviews.length
    ? reviews.reduce((prev, cur) => prev + cur.rating, 0) / reviews.length
    : 0;
}
