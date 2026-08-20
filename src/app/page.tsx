import type { Metadata } from "next";
import { CyberDesktop } from "@/components/cyber-os/desktop";

export const metadata: Metadata = {
  title: "Paul Oliver Cruz | Cyber OS Portfolio",
  description: "Retro-futuristic virtual operating system and portfolio of Paul Oliver Cruz, Frontend Developer.",
};

export default function Home() {
  return <CyberDesktop />;
}
