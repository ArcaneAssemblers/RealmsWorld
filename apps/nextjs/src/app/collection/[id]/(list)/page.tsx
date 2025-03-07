import type { Metadata } from "next";
import { erc721Tokens } from "@/constants";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import type { Collection } from "@/types";
import { getTokenContractAddresses } from "@/utils/utils";

import Mint from "./Mint";
import { Trade } from "./Trade";

//export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  /*const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const collectionData = await getCollections([
    { contract: tokenAddresses.L1 ?? params.id },
  ]);
  const collection: Collection = collectionData.collections?.[0];*/
  const collection = erc721Tokens[params.id as keyof typeof erc721Tokens];
  return {
    title: `Collection: ${collection?.name}`,
    description: `Collection Details and Marketplace for ${collection?.name} - Created for adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  //const token = erc721Tokens[params.id as keyof typeof erc721Tokens];
  const isGoldenToken =
    params.id == getTokenContractAddresses("goldenToken").L2 ||
    params.id == "goldenToken";

  if (isGoldenToken) {
    return <Mint contractId={params.id} />;
  }

  return (
    <Trade
      contractId={params.id as keyof typeof erc721Tokens}
      searchParams={searchParams}
    />
  );
}
