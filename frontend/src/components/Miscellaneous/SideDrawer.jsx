import { Box, Button, Tooltip, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import NotificationBadge from "react-notification-badge";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import { ChatState } from '../../Context/ChatProvider';


const SideDrawer = () => {
   const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
   const {user} =ChatState();

  return (<>
  <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px" borderWidth="5px">
    <Tooltip label="Search Users to chat" hashArrow placement="bottom-end">
    <Button variant="ghost">
      <i class="fas fa-search"></i>
      <Text display={{base:"none", md: "flex"}} px="4"> Search User</Text>
    </Button>
    </Tooltip>
     
     <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
       <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton> 
             <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              {/* onClick={logoutHandler} */}
              <MenuItem >Logout</MenuItem>
            </MenuList> 
          </Menu>
        </div>
  </Box>
    </>
  )
}

export default SideDrawer