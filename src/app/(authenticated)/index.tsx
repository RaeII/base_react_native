import { useHomeModel } from "@/viewModels/Home/home.model";
import { HomeView } from "@/viewModels/Home/home.view";

export default function AuthenticatedHome() {
  const homeModel = useHomeModel();

  return <HomeView {...homeModel} />;
}
