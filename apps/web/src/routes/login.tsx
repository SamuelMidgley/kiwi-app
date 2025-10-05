import { Login } from "@/pages/login";
import localStorageHelper from "@/utils/localStorageHelper";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ search }) => {
    // Redirect if already authenticated
    if (localStorageHelper.getUser()) {
      throw redirect({ to: search.redirect });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
