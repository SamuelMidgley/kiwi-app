import { Link } from "@tanstack/react-router";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useBreadcrumbs } from "./use-breadcrumbs";

export const AppBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={b.label}>
            <BreadcrumbItem>
              {b.href ? (
                <BreadcrumbLink asChild>
                  <Link to={b.href}>{b.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{b.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
