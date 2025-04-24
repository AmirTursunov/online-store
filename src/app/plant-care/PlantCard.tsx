import Image from "next/image";
import React from "react";

type PlantCardProps = {
  name: string;
  image: string;
  watering: string;
  sunlight: string;
};

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  image,
  watering,
  sunlight,
}) => {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="rounded-md object-cover w-full"
      />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-sm mt-1">
        <strong>Watering:</strong> {watering}
      </p>
      <p className="text-sm">
        <strong>Sunlight:</strong> {sunlight}
      </p>
    </div>
  );
};

export default PlantCard;
