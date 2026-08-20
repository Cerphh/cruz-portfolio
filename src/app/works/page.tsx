import type { Metadata } from "next";
import { CyberDesktop } from "@/components/cyber-os/desktop";

export const metadata: Metadata = {
  title: "Selected Works | Paul Oliver Cruz",
  description: "Selected case studies by Paul Oliver Cruz highlighting practical product and frontend work.",
};

export default function WorksPage() {
  return <CyberDesktop defaultActiveWorks={true} />;
}