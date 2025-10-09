import { IconChartLine, IconPlayCardA } from "@tabler/icons-react";
import { useMemo } from "react";

import { useAuth } from "@/use-auth";

export const useAppSidebar = () => {
  const { isAuthenticated } = useAuth();

  return useMemo(() => {
    return {
      user: isAuthenticated
        ? {
            name: "Smidge",
            email: "sam@midgley.dev",
            avatar: "https://avatars.githubusercontent.com/u/80775550?v=4",
          }
        : null,
      navMain: [
        ...(isAuthenticated
          ? [
              {
                title: "Weight Tracker",
                url: "/apps/weight-tracker",
                icon: IconChartLine,
              },
            ]
          : []),
      ],
      // navSecondary: [
      //   {
      //     title: "Analytics",
      //     url: "#",
      //     icon: IconChartBar,
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //     icon: IconSettings,
      //   },
      // ],
      games: [
        {
          name: "Solitaire",
          url: "/games/solitaire",
          icon: IconPlayCardA,
        },
      ],
    };
  }, [isAuthenticated]);
};
