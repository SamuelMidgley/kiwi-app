import { useLocation } from "@tanstack/react-router";

type Breadcrumb = {
  label: string;
  href?: string;
};

export const useBreadcrumbs = (): Breadcrumb[] => {
  const location = useLocation();

  if (location.pathname === "/apps/weight-tracker") {
    return [
      {
        label: "Apps",
        href: "/apps",
      },
      {
        label: "Weight tracker",
      },
    ];
  }

  if (location.pathname === "/games/solitaire") {
    return [
      {
        label: "Games",
        href: "/games",
      },
      {
        label: "Solitaire",
      },
    ];
  }

  if (location.pathname === "/games") {
    return [
      {
        label: "Games",
      },
    ];
  }

  if (location.pathname === "/apps") {
    return [
      {
        label: "Apps",
      },
    ];
  }

  return [
    {
      label: "Home",
    },
  ];
};
