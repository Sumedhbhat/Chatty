import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      py={1}
      px={2}
      borderRadius={"lg"}
      m={1}
      mb={2}
      fontSize={12}
      backgroundColor={"purple"}
      color={"white"}
    >
      {user.name}
      <CloseIcon pl={1} cursor={"pointer"} onClick={handleFunction} />
    </Box>
  );
};

export default UserBadgeItem;
