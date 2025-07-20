import { api } from "../../../libs";

export const getCurrentUser = async () =>
  api.get('/auth/me').then((res) => res.data);