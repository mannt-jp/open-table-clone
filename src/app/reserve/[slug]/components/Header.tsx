import { times } from "@/data";

export default function Header({
  name,
  date,
  partySize,
}: {
  name: string;
  date: string;
  partySize: string;
}) {
  const [day, time] = date.split("T");
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img
          src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{day}</p>
            <p className="mr-6">
              {times.findLast((t) => t.time === time)?.displayTime}
            </p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
