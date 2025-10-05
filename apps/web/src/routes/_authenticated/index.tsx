import { createFileRoute, redirect } from "@tanstack/react-router";

import localStorageHelper from "@/utils/localStorageHelper";

export const Route = createFileRoute("/_authenticated/")({
  beforeLoad: ({ location }) => {
    const user = localStorageHelper.getUser();

    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>hello</div>;
}
