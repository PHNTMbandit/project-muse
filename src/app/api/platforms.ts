import { IconType } from "react-icons/lib";
import { Platform } from "@/types/platform";
import { FaXbox, FaPlaystation } from "react-icons/fa";
import { FaComputer, FaCircleQuestion } from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";

export const getPlatform = async (id: number): Promise<Platform> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/platforms/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    const result: Platform = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlatformIcon = (name: string): IconType => {
  switch (true) {
    case name.includes("Xbox"):
      return FaXbox;
    case name.includes("PlayStation"):
      return FaPlaystation;
    case name.includes("PC"):
      return FaComputer;
    case name.includes("Switch"):
      return BsNintendoSwitch;
    default:
      return FaCircleQuestion;
  }
};
