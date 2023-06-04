import Stars from "@/app/components/Stars";
import calculateAvgRating from "@/app/utils/averageRating";
import { Review } from "@prisma/client";

export default function Rating({ reviews }: { reviews: Review[] }) {
  const averageRating = calculateAvgRating(reviews)
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews}></Stars>
        <p className="text-reg ml-3">{averageRating}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Review(s)</p>
      </div>
    </div>
  );
}
