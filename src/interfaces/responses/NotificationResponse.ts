import { UserSettingsAction } from "../database/UserSettingsAction";

export interface NotificationResponse {
  id: string;
  user_id: string;
  action: UserSettingsAction;
  content: string;
  payload: Record<string, unknown>;
  created_at: Date;
}
