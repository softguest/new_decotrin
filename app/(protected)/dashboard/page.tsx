import { auth, signOut } from "@/auth";

import { Button } from '../../../components/ui/button';

import {
  ArrowDownCircleIcon,
  MessageCircle,
  X,
} from "lucide-react";

import ExpertList from "@/components/ExpertList";
import WarTraumaSlider from "@/components/slide/WarTraumaSlider";

const DashBoardPage = async () => {
  const session = await auth();

  return (
    <div>
      <div className="px-2 py-2 ">
        <WarTraumaSlider />
        <ExpertList />
      </div>
    </div>
  )
}

export default DashBoardPage