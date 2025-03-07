import React from "react";
import { useUIContext } from "@/app/providers/UIProvider";
import StarknetLogo from "@/icons/starknet.svg";
import { shortenHex } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";

import { Button } from "../ui/button";

export const StarknetLoginButton = ({
  openAccount = false,
}: {
  openAccount?: boolean;
}) => {
  const { address, isConnected } = useL2Account();
  const { isAccountOpen, toggleAccount, toggleStarknetLogin } = useUIContext();

  const onConnectClick = () => {
    return !isConnected
      ? toggleStarknetLogin()
      : openAccount && toggleAccount();
  };

  return (
    <Button
      className="px-3"
      variant="outline"
      size="lg"
      onClick={onConnectClick}
    >
      <span className="flex items-center font-sans normal-case">
        <StarknetLogo className="mx-2 h-6 w-6" />

        {address && isConnected ? (
          <>{shortenHex(address, 8)}</>
        ) : (
          "Connect Starknet"
        )}
      </span>
    </Button>
  );
};
