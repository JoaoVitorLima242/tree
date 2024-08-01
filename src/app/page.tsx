"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { RawNodeDatum, TreeNodeDatum } from "react-d3-tree";
import { Box, Stack, useToast } from "@chakra-ui/react";
import { AddMemberModal } from "@/components/modal";
import { generateDatum, generateDatumChildren } from "@/helpers/generate";
import {
  isBinaryNotClosed,
  isDatumOutOfBinaryLevel,
  isFollowingSpilling,
  isNotDatumEmpty,
} from "@/helpers/validation";
import { Datum } from "@/components/datum";

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

export enum Directions {
  LEFT = 0,
  RIGHT = 1,
  ROOT = 2,
}

export function bfs(id: string, tree: RawNodeDatum, name: string) {
  const queue: RawNodeDatum[] = [];

  queue.unshift(tree as RawNodeDatum);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode!.attributes?.id === id) {
      curNode!.name = name;
      curNode!.children = generateDatumChildren(
        (curNode as RawNodeDatum).attributes!.position as Directions
      );

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
  const toast = useToast();

  const close = () => setNode(undefined);

  const errorToast = () => {
    toast({
      title: "Error",
      // description: "We've created your account for you.",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleNodeClick = (datum: TreeNodeDatum) => {
    if (isNotDatumEmpty(datum.name)) {
      return errorToast();
    }

    if (
      isBinaryNotClosed(tree) &&
      isDatumOutOfBinaryLevel(datum.attributes!.id as string, tree)
    ) {
      return errorToast();
    }

    if (!isFollowingSpilling(datum)) {
      return errorToast();
    }

    return setNode(datum);
  };

  const handleSubmit = (familyMemberName: string) => {
    const newTree = bfs(node!.attributes?.id as string, tree, familyMemberName);

    if (newTree) {
      setTree(newTree);
    }

    setNode(undefined);
  };

  console.log(tree);

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
          renderCustomNodeElement={(nodeInfo) => (
            <Datum customProps={nodeInfo} click={handleNodeClick} />
          )}
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
