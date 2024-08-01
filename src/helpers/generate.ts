import { Directions } from "@/app/page";
import { RawNodeDatum } from "react-d3-tree";
import { v4 } from "uuid";

export const generateDatum = (name: string): RawNodeDatum => {
  return {
    name,
    attributes: {
      id: v4(),
    },
    children: generateDatumChildren(Directions.ROOT),
  };
};

export const generateDatumChildren = (
  parentPosition: Directions
): RawNodeDatum[] => {
  return [
    {
      name: "",
      attributes: {
        id: v4(),
        position: Directions.LEFT,
        parentPosition: parentPosition,
      },
      children: [],
    },
    {
      name: "",
      attributes: {
        id: v4(),
        position: Directions.RIGHT,
        parentPosition: parentPosition,
      },
      children: [],
    },
  ];
};
