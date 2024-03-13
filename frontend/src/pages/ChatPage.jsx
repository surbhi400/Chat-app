import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer  from '../components/Miscellaneous/SideDrawer';
import MyChats  from '../components/Miscellaneous/MyChats';
import ChatBox  from '../components/Miscellaneous/ChatBox';
const ChatPage = () => {
   const { user } = ChatState()
  return (
    <div style ={{width:'100%'}}>
        {user && <SideDrawer/>}
        <Box display="flex" justifyContent="space-between" w="100% "h="100vh" p="10px">
          {user && <MyChats/>}
          {user && <ChatBox/>}
        </Box>
    </div>
  );
};

export default ChatPage