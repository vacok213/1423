"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { TTab } from "@/types/tab";
import { Card, CardBody } from "@heroui/card";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";

type TDashboardProps = {
  children: React.ReactNode;
};

export default function Dashboard({ children }: TDashboardProps) {
  const pathname = usePathname();

  const tabs: TTab[] = [
    {
      title: "Продукты",
      href: "/products",
    },
    {
      title: "Материалы",
      href: "/materials",
    },
  ];

  return (
    <section className="space-y-4 relative">
      <div className="sticky top-20 z-20">
        <Card isBlurred>
          <CardBody>
            <Tabs selectedKey={pathname} aria-label="Tabs" items={tabs}>
              {(tab) => (
                <Tab
                  key={tab.href}
                  id={tab.href}
                  href={tab.href}
                  title={tab.title}
                  as={Link}
                />
              )}
            </Tabs>
          </CardBody>
        </Card>
      </div>
      {children}
    </section>
  );
}
