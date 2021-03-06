/* /api/messages */
import { Router } from "express";
import { expressWrapper } from "../controller/expressHelper";
import {
  GetConversationsHandler,
  CreateConversationHandler,
  GetConversationHandler,
  GetMessagesHandler,
  CreateMessageHandler,
} from "../controller/MessageController";

const router = Router();

router.get("/", expressWrapper(GetConversationsHandler));
router.post("/", expressWrapper(CreateConversationHandler));
router.get("/:id", expressWrapper(GetConversationHandler));
router.get("/:id/messages", expressWrapper(GetMessagesHandler));
router.post("/:id/messages", expressWrapper(CreateMessageHandler));
// router.get("/:id/messages/:msgid", expressWrapper(GetMessageHandler));

export default router;
