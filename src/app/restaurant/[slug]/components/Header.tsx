export function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export default function Header({
  name,
  cuisine,
}: {
  name: string;
  cuisine: string;
}) {
  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white captitalize text-shadow text-center">
          {`${name} (${capitalizeFirstLetter(cuisine)})`}
        </h1>
      </div>
    </div>
  );
}
