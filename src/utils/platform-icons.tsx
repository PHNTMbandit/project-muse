import { FaXbox } from "react-icons/fa";
import { FaComputer, FaCircleQuestion, FaPlaystation } from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { IoLogoAndroid } from "react-icons/io";
import {
  SiPlaystation3,
  SiWiiu,
  SiPlaystationvita,
  SiNintendo3Ds,
  SiPlaystation4,
  SiPlaystation5,
} from "react-icons/si";
import { ReactElement } from "react";

const getPlatformIcon = (name: string): ReactElement => {
  const lowercaseName = name.toLowerCase();
  lowercaseName.replace("-", "");

  switch (true) {
    case lowercaseName.includes("android"):
      return <IoLogoAndroid size={20} />;
    case lowercaseName.includes("nintendo 3ds"):
      return <SiNintendo3Ds size={20} />;
    case lowercaseName.includes("ps vita"):
      return <SiPlaystationvita size={30} />;
    case lowercaseName.includes("wii u"):
      return <SiWiiu size={30} />;
    case lowercaseName.includes("xbox 360"):
      return (
        <div className="flex gap-1">
          <FaXbox size={20} />
          <p className="font-bold">360</p>
        </div>
      );
    case lowercaseName.includes("xbox one"):
      return (
        <div className="flex gap-1">
          <FaXbox size={20} />
          <p className="font-bold">ONE</p>
        </div>
      );
    case lowercaseName.includes("xbox series x"):
      return (
        <div className="flex gap-1">
          <FaXbox size={20} />
          <p className="font-bold">SERIES X</p>
        </div>
      );
    case lowercaseName.includes("xbox series s/x"):
      return (
        <div className="flex gap-1">
          <FaXbox size={20} />
          <p className="font-bold">SERIES S/X</p>
        </div>
      );
    case lowercaseName.includes("playstation 3"):
      return <SiPlaystation3 size={30} />;
    case lowercaseName.includes("playstation 4"):
      return <SiPlaystation4 size={30} />;
    case lowercaseName.includes("playstation 5"):
      return <SiPlaystation5 size={30} />;
    case lowercaseName.includes("pc"):
      return <FaComputer size={20} />;
    case lowercaseName.includes("switch"):
      return <BsNintendoSwitch size={20} />;
    default:
      return <FaCircleQuestion size={20} />;
  }
};

export default getPlatformIcon;

export const getPlatformIconFamily = (name: string): ReactElement => {
  const lowercaseName = name.toLowerCase();
  lowercaseName.replace("-", "");

  switch (true) {
    case lowercaseName.includes("android"):
      return <IoLogoAndroid size={20} />;
    case lowercaseName.includes("nintendo 3ds"):
      return <SiNintendo3Ds size={20} />;
    case lowercaseName.includes("ps vita"):
      return <SiPlaystationvita size={30} />;
    case lowercaseName.includes("wii u"):
      return <SiWiiu size={30} />;
    case lowercaseName.includes("playstation"):
      return <FaPlaystation size={20} />;
    case lowercaseName.includes("xbox"):
      return <FaXbox size={20} />;
    case lowercaseName.includes("pc") ||
      lowercaseName.includes("macos") ||
      lowercaseName.includes("linux"):
      return <FaComputer size={20} />;
    case lowercaseName.includes("switch"):
      return <BsNintendoSwitch size={20} />;
    default:
      return <FaCircleQuestion size={20} />;
  }
};

export function removeObjectsWithDuplicateStartingString(
  array: [
    {
      platform: { id: number; slug: string; name: string };
      released_at: string;
      requirements: { minimum: string; recommended: string };
    }
  ]
) {
  const seen = new Set();
  return array?.filter((obj) => {
    const startingString = obj.platform.name.substring(
      0,
      obj.platform.name.indexOf(" ")
    );
    if (seen.has(startingString)) {
      return false;
    }
    seen.add(startingString);
    return true;
  });
}
