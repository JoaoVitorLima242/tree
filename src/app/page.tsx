"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { RawNodeDatum } from "react-d3-tree";
import { Box } from "@chakra-ui/react";

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

export default function Home() {
  const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]>({
    name: "Root",
    children: [],
  });

  return (
    <Box h="100vh" w="99vw">
      <Tree data={tree} />
    </Box>
  );
}
