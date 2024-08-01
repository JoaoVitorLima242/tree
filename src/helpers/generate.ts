import { Directions } from "@/app/page";
import { RawNodeDatum } from "react-d3-tree";
import { v4 } from "uuid";

export const generateDatum = (name: string): RawNodeDatum => {
  return {
    name,
    attributes: {
      id: v4(),
    },
    children: generateDatumChildren(),
  };
};

export const generateDatumChildren = (): RawNodeDatum[] => {
  return [
    {
      name: "",
      attributes: {
        id: v4(),
        position: Directions.LEFT,
      },
      children: [],
    },
    {
      name: "",
      attributes: {
        id: v4(),
        position: Directions.RIGHT,
      },
      children: [],
    },
  ];
};
