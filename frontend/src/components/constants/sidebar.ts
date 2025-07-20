import type { NavItem, NavMenu } from "../types"

export const dashboardNav: NavItem[] = [
  {
    href: "/",
    text: "Dashboard",
    activeIcon: "homeActive",
    inActiveIcon: "homeInactive",
  },
]

export const reportNav: NavItem[] = [
  {
    href: "/reports",
    text: "Report",
    activeIcon: "reportActive",
    inActiveIcon: "reportInactive",
  },
]

export const templateNav: NavItem[] = [
  {
    href: "/template",
    text: "Template",
    activeIcon: "reportActive",
    inActiveIcon: "reportInactive",
  },
]

export const scanJobNav: NavItem[] = [
  {
    href: "/scan-job",
    text: "Scan Job",
    activeIcon: "reportActive",
    inActiveIcon: "reportInactive",
  },
]


export const dataManagementNav: NavItem[] = [
  {
    href: "/teachers",
    text: "Teachers",
    activeIcon: "usersActive",
    inActiveIcon: "usersInactive",
  },
  {
    href: "/students",
    text: "Students",
    activeIcon: "usersActive",
    inActiveIcon: "usersInactive",
  },
  {
    href: "/admins",
    text: "Admins",
    activeIcon: "usersActive",
    inActiveIcon: "usersInactive",
  },
]

export const navMenus: NavMenu[] = [
  {
    title: "Dashboard",
    items: dashboardNav,
    activeIcon: "homeActive",
    inActiveIcon: "homeInactive",
  },
  {
    title: "User Management",
    items: dataManagementNav,
    activeIcon: "manageInactive",
    inActiveIcon: "manageInactive",
  },


  {
    title: "Templates",
    items: templateNav,
    activeIcon: "reportActive",
    inActiveIcon: "reportInactive",
  },

  {
    title: "Scan Job",
    items: scanJobNav,
    activeIcon: "reportActive",
    inActiveIcon: "reportInactive",
  },
]
