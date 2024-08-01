import { Directions } from "@/app/page";
import { RawNodeDatum } from "react-d3-tree";

export const isNotDatumEmpty = (name: string): boolean => Boolean(name);

export const isBinaryNotClosed = (tree: RawNodeDatum): boolean => {
  return !(
    !!tree.children![Directions.LEFT].name &&
    !!tree.children![Directions.RIGHT].name
  );
};

export const isDatumOutOfBinaryLevel = (
  id: string,
  tree: RawNodeDatum
): boolean => {
  const binaryLevelItems = tree.children!;

  return (
    binaryLevelItems[Directions.LEFT].attributes!.id !== id &&
    binaryLevelItems[Directions.RIGHT].attributes!.id !== id
  );
};

export const isFollowingSpilling = (datum: RawNodeDatum) => {
  const datumAttributes = datum.attributes!;
  const isRootChild = datumAttributes.parentPosition === Directions.ROOT;
  const isFollowingParentPosition =
    datumAttributes.position === datumAttributes.parentPosition;

  if (isRootChild) {
    return true;
  }

  console.log(datumAttributes.position, datumAttributes.parentPosition);

  return isFollowingParentPosition;
};
