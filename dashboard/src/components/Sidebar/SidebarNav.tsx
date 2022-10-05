import { Stack } from "@chakra-ui/react";
import { RiBarChartLine, RiContactsLine, RiDashboardLine, RiTicketLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiBarChartLine} href="/charts">Gráficos</NavLink>
        <NavLink icon={RiTicketLine} href="/complaints">Denúncias</NavLink>
      </NavSection>

      {/* <NavSection title="AUTOMAÇÃO">
        <NavLink icon={RiInputMethodLine} href="/forms">Formulários</NavLink>
        <NavLink icon={RiGitMergeLine} href="/automation">Automação</NavLink>
      </NavSection> */}
    </Stack>
  );
}