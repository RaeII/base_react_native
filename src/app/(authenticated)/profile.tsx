import { useProfileModel } from "@/viewModels/profile/profile.model";
import { ProfileView } from "@/viewModels/profile/profile.view";

export default function AuthenticatedProfile() {
  const profileModel = useProfileModel();

  return <ProfileView {...profileModel} />;
}
