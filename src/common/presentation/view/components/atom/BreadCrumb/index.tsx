import { Breadcrumbs, BreadcrumbsProps, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type BreadCrumbsT = {
  label: string;
  href?: string;
}

type PropsBreadCrumbT = {
  data: BreadCrumbsT[];
  sticky?: boolean;
} & Omit<BreadcrumbsProps, 'children'>

const BreadCrumb = ({data, sticky, className, ...rest}: PropsBreadCrumbT) => {
  const [scroll] = useWindowScroll();
  const router = useRouter()
  const handleBack = (href?: string) => {
    href && router.push(href);
    // window ? window.history.back() : history.back();
  }

  return (
    <Group gap={8} pos={sticky ? "sticky":"inherit"} style={{zIndex: 9}}
      {...(sticky && scroll.y > 12 ? {top:0, py:"md", className:`${className} breadcrumb-content`, mb: 0}:{className:className, pt:"md"})}
    >
      {data.length > 1 && <IconChevronLeft className="cursor-pointer" size={24} onClick={() => handleBack(data[data.length-2].href)}/>}
      <Breadcrumbs separator="/" separatorMargin={4} {...rest}
        classNames={{separator: "font-title", breadcrumb: "font-title"}}
      >
        {data.map((d, i) => {
          return (
            <Link key={i} href={d.href||"#"} className={d.href?"text-blue-5":""} >{d.label}</Link>
          )
        })}
      </Breadcrumbs>
    </Group>
  )
}

export default BreadCrumb;