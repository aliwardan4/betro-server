import { UserSettingsAction } from "./UserSettingsAction";

export interface UserNotification {
  id: string;
  user_id: string;
  action: UserSettingsAction;
  content: string;
  payload: Record<string, unknown>;
  created_at: Date;
}
