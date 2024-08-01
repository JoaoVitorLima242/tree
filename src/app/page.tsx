"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  CustomNodeElementProps,
  RawNodeDatum,
  TreeNodeDatum,
} from "react-d3-tree";
import { Box, position, Stack } from "@chakra-ui/react";
import { AddMemberModal } from "@/components/modal";
import { v4 } from "uuid";
import { generateDatum, generateDatumChildren } from "@/helpers/generate";
import {
  isBinaryNotClosed,
  isDatumOutOfBinaryLevel,
  isNotDatumEmpty,
} from "@/helpers/validation";

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

export enum Directions {
  LEFT = 0,
  RIGHT = 1,
}

export function bfs(id: string, tree: RawNodeDatum, name: string) {
  const queue: RawNodeDatum[] = [];

  queue.unshift(tree as RawNodeDatum);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode!.attributes?.id === id) {
      curNode!.name = name;
      curNode!.children = generateDatumChildren();

      return { ...tree };
    }

    const len = curNode!.children!.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode!.children![i]);
    }
  }
}

export default function Home() {
  const [tree, setTree] = useState<RawNodeDatum>(
    generateDatum("Joao Rei do Bitcoin")
  );
  const [node, setNode] = useState<TreeNodeDatum | undefined>();

  const close = () => setNode(undefined);

  const handleNodeClick = (datum: TreeNodeDatum) => {
    if (isNotDatumEmpty(datum.name)) return;

    if (
      isBinaryNotClosed(tree) &&
      isDatumOutOfBinaryLevel(datum.attributes!.id as string, tree)
    )
      return;

    console.log(isBinaryNotClosed(tree));
    console.log(isDatumOutOfBinaryLevel(datum.attributes!.id as string, tree));

    setNode(datum);
  };

  const handleSubmit = (familyMemberName: string) => {
    const newTree = bfs(node!.attributes?.id as string, tree, familyMemberName);

    if (newTree) {
      setTree(newTree);
    }

    setNode(undefined);
  };

  const renderRectSvgNode = (
    customProps: CustomNodeElementProps,
    click: (datum: TreeNodeDatum) => void
  ) => {
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

  return (
    <Stack direction="row" spacing="md">
      <Box w="100%" h="100vh">
        <Tree
          data={tree}
          zoomable={true}
          // @ts-ignore
          onNodeClick={handleNodeClick}
          orientation="vertical"
          translate={{
            x: 200,
            y: 200,
          }}
          renderCustomNodeElement={(nodeInfo) =>
            renderRectSvgNode(nodeInfo, handleNodeClick)
          }
        />
        <AddMemberModal
          onSubmit={(familyMemberName) => handleSubmit(familyMemberName)}
          onClose={close}
          isOpen={Boolean(node)}
        />
      </Box>
    </Stack>
  );
}
