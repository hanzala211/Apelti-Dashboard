import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import { APP_ACTIONS, ICONS, PERMISSIONS, ROUTES } from "@constants";
import { useAuth, useMessage } from "@context";
import { useQueryClient } from "@tanstack/react-query";

export const Sidebar: React.FC = () => {
  const { setUserData, setIsMainLoading, userData } = useAuth();
  const { setSelectedMessage } = useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const sideBarButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const queryClient = useQueryClient();
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target as Node) &&
        sideBarButtonRef.current &&
        !sideBarButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    setIsMainLoading(true);
    queryClient.removeQueries();
    setUserData(null);
    localStorage.removeItem("token");
    setTimeout(() => {
      setIsMainLoading(false);
      setSelectedMessage(null);
    }, 1000);
  };

  return (
    <>
      <button
        ref={sideBarButtonRef}
        className={`md:hidden fixed top-3 sm:left-0 -left-1 p-3 h-fit bg-transparent rounded-md z-50 transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ICONS.menu size={20} />
      </button>

      <aside
        ref={sideBarRef}
        className={`fixed md:relative h-[100dvh] z-50 bg-basicWhite w-64 p-5 flex flex-col border-r shadow-lg transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:flex`}
      >
        <div className="flex items-center justify-center">
          <img src={ICONS.logoSVG} alt="Logo Image" className="w-28" />
        </div>

        <p className="text-slateGrey text-[15px] mb-5">MENU</p>

        <nav className="flex flex-col space-y-2 overflow-auto">
          <div className="py-2 border-b-[1px] flex flex-col gap-1">
            {userPermissions.includes(APP_ACTIONS.dashboardPage) && (
              <SidebarItem
                link="/"
                icon={ICONS.dashboardSVG}
                label="Dashboard"
              />
            )}
            <SidebarItem
              link={ROUTES.messages}
              icon={ICONS.messageSVG}
              label="Messages"
            />
            {userPermissions.includes(APP_ACTIONS.documentPage) && (
              <SidebarItem
                link={ROUTES.documents}
                icon={ICONS.documentSVG}
                label="Documents"
                isIconType={true}
              />
            )}
          </div>
          <div className="flex flex-col gap-1 border-b-[1px] py-2">
            {userPermissions.includes(APP_ACTIONS.invoicePage) && (
              <SidebarItem
                link={`${ROUTES.invoices}?all=true`}
                icon={ICONS.invoiceSVG}
                isIconType={true}
                label="Invoices"
              />
            )}
            {userPermissions.includes(APP_ACTIONS.supplierPage) && (
              <SidebarItem
                link={ROUTES.suppliers}
                icon={ICONS.supplierSVG}
                label="Suppliers"
                isIconType={true}
              />
            )}
            {userPermissions.includes(APP_ACTIONS.payemntPage) && (
              <SidebarItem
                link={ROUTES.payment}
                icon={ICONS.paymentSVG}
                label="Payment"
                isIconType={true}
              />
            )}
            {userPermissions.includes(APP_ACTIONS.approvalPage) && (
              <SidebarItem
                link={ROUTES.approval}
                icon={ICONS.approvalSVG}
                label="Approval"
                isIconType={true}
              />
            )}
            <SidebarItem
              link={ROUTES.export_invoice}
              icon={ICONS.export}
              label="Export Invoices"
              isIconType={true}
            />
          </div>
          <div className="flex flex-col gap-1 border-b-[1px] py-2">
            <SidebarItem
              link={ROUTES.posting}
              icon={ICONS.postingSVG}
              label="Posting"
              isIconType={true}
            />
            <SidebarItem
              link={ROUTES.reports}
              icon={ICONS.reportSVG}
              label="Reports"
              isIconType={true}
            />
            <SidebarItem
              link={ROUTES.team}
              icon={ICONS.teamSVG}
              label="Team"
              isIconType={true}
            />
            <SidebarItem
              link={`${ROUTES.settings}/${ROUTES.profile}`}
              icon={ICONS.settingSVG}
              label="Settings"
              isIconType={true}
            />
          </div>
          <SidebarItem
            link={`${ROUTES.auth}/${ROUTES.login}`}
            icon={ICONS.logout}
            label="Logout"
            onClick={handleLogout}
            isIconType={true}
          />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
