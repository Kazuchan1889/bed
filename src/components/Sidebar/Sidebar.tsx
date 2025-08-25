import { RouteSelect } from "./RouteSelect";
import { AccountToggle } from "./AccountToggle";

type SidebarProps = {
  selectedPage: string;
  onSelectPage: (page: string) => void;
};

export const Sidebar = ({ selectedPage, onSelectPage }: SidebarProps) => {
  return (
    <aside className="bg-white p-3 rounded-lg shadow h-fit space-y-4">
      {/* Toggle Akun di bagian atas */}
      <AccountToggle />

      {/* Menu Navigasi */}
      <RouteSelect selectedPage={selectedPage} onSelectPage={onSelectPage} />
    </aside>
  );
};
