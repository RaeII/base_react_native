import { useUsersModel } from "@/viewModels/users/users.model";
import { UsersView } from "@/viewModels/users/users.view";

export default function AuthenticatedUsers() {
  const usersModel = useUsersModel();

  return <UsersView {...usersModel} />;
}
