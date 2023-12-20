import { permissions } from "../constants/permissonContants";

export const canUserManageBots = (permissionString: string): boolean => {
  return (Number(permissionString) & permissions.MANAGE_GUILD) > 0
}