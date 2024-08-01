import { CustomNodeElementProps, TreeNodeDatum } from "react-d3-tree";

export const Datum = ({
  click,
  customProps,
}: {
  customProps: CustomNodeElementProps;
  click: (datum: TreeNodeDatum) => void;
}) => {
  const { nodeDatum } = customProps;
  const color = nodeDatum.name ? "#a8f5ff" : "#888";

  return (
    <g>
      <circle r="15" fill={color} onClick={() => click(nodeDatum)} />
      <text fill="black" strokeWidth="0.5" x="20" y="-5">
        {nodeDatum.name}
      </text>
    </g>
  );
};
