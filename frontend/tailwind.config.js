import { colors } from "./src/styles/colors"

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: true,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      colors: {
        // Raw imported color scales
        ...colors,

        // Brand colors
        brand: {
          primary: colors.secondary[500],
          primaryHover: colors.secondary[600],
          primaryLight: colors.secondary[100],
        },

        // Role-based accents
        role: {
          admin: colors.role.admin,
          teacher: colors.role.teacher,
          student: colors.role.student,
        },

        // Statuses
        status: {
          success: colors.secondary[500],
          warning: colors.tertiary[500],
          error: colors.error[500],
          info: colors.primary[600],
        },

        // UI elements
        backgrounds: {
          main: colors.gray[100],
          surface: '#FFFFFF',
          card: '#FFFFFF',
          sidebar: '#FFFFFF',
        },

        textColor: {
          primary: colors.black[800],
          secondary: colors.gray[600],
          muted: colors.gray[500],
        },

        borderColor: {
          light: colors.gray[200],
          medium: colors.gray[300],
        },

        // Keep primary and secondary for utility classes like bg-primary-500
        primary: {
          ...colors.primary,
          DEFAULT: colors.primary[600],
        },
        secondary: {
          ...colors.secondary,
          DEFAULT: colors.secondary[600],
        },
      },
    },
  },
  plugins: [],
}
