import { Header } from "@/components/layouts/header"
import { useAuth } from "@/features/auth/hooks"
import { Card, Title, Text } from "@mantine/core"
import { FileText, Users, Scan, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  Bar, BarChart, Line, LineChart,
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend
} from "recharts"

const scanJobsData = [
  { month: "Jan", running: 12, completed: 45, failed: 3 },
  { month: "Feb", running: 8, completed: 52, failed: 2 },
  { month: "Mar", running: 15, completed: 38, failed: 5 },
  { month: "Apr", running: 22, completed: 61, failed: 4 },
  { month: "May", running: 18, completed: 55, failed: 2 },
  { month: "Jun", running: 25, completed: 72, failed: 6 },
]

const templatesData = [
  { month: "Jan", active: 8, created: 2 },
  { month: "Feb", active: 10, created: 3 },
  { month: "Mar", active: 12, created: 1 },
  { month: "Apr", active: 15, created: 4 },
  { month: "May", active: 17, created: 2 },
  { month: "Jun", active: 20, created: 5 },
]

const teachersData = [
  { month: "Jan", total: 25, active: 22 },
  { month: "Feb", total: 28, active: 25 },
  { month: "Mar", total: 30, active: 27 },
  { month: "Apr", total: 33, active: 30 },
  { month: "May", total: 35, active: 32 },
  { month: "Jun", total: 38, active: 35 },
]

export const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (user?.type === 'student') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title={t("Dashboard")} />
        <div className="p-5">
          <Title order={1} className="text-gray-900">{t("Welcome to your Dashboard")}</Title>
          <Text className="mt-2 text-gray-600">
            {t("Hello, {{name}}! Glad to see you here.", { name: user.name || "Student" })}
          </Text>
        </div>
      </div>
    );
  }

  const currentStats = {
    scanJobsRunning: scanJobsData[scanJobsData.length - 1].running,
    totalTemplates: templatesData[templatesData.length - 1].active,
    totalTeachers: teachersData[teachersData.length - 1].total,
    completedJobs: scanJobsData[scanJobsData.length - 1].completed,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={t("Dashboard")} />
      <div className="p-5">
        <div className="mb-8">
          <Title order={1} className="text-gray-900">{t("OCR System Dashboard")}</Title>
          <Text className="mt-2 text-gray-600">{t("Overview of system performance and usage")}</Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card shadow="sm" p="lg" className="border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <Scan className="w-8 h-8 text-blue-600" />
              <div>
                <Text size="sm">{t("Running Scan Jobs")}</Text>
                <Text size="xl">{currentStats.scanJobsRunning}</Text>
              </div>
            </div>
          </Card>

          <Card shadow="sm" p="lg" className="border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <Text size="sm">{t("Active Templates")}</Text>
                <Text size="xl">{currentStats.totalTemplates}</Text>
              </div>
            </div>
          </Card>

          <Card shadow="sm" p="lg" className="border-l-4 border-purple-500">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <Text size="sm">{t("Total Teachers")}</Text>
                <Text size="xl">{currentStats.totalTeachers}</Text>
              </div>
            </div>
          </Card>

          <Card shadow="sm" p="lg" className="border-l-4 border-orange-500">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <Text size="sm">{t("Completed Jobs")}</Text>
                <Text size="xl">{currentStats.completedJobs}</Text>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card shadow="sm" p="md">
            <Title order={3} className="mb-2 flex items-center gap-2">
              <Scan className="w-5 h-5" /> {t("Scan Jobs Overview")}
            </Title>
            <Text size="sm" className="mb-4">{t("Monthly scan job statistics")}</Text>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={scanJobsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="running" fill="#3b82f6" name={t("Running")} />
                  <Bar dataKey="completed" fill="#10b981" name={t("Completed")} />
                  <Bar dataKey="failed" fill="#ef4444" name={t("Failed")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card shadow="sm" p="md">
            <Title order={3} className="mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" /> {t("Templates Growth")}
            </Title>
            <Text size="sm" className="mb-4">{t("Template creation and usage trends")}</Text>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={templatesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name={t("Active Templates (Line)")}
                  />
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name={t("New Templates")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card shadow="sm" p="md">
            <Title order={3} className="mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" /> {t("Teacher Statistics")}
            </Title>
            <Text size="sm" className="mb-4">{t("Total and active teachers over time")}</Text>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={teachersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#6366f1" name={t("Total Teachers")} />
                  <Bar dataKey="active" fill="#3b82f6" name={t("Active Teachers")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card shadow="sm" p="md">
            <Title order={3} className="mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> {t("System Performance")}
            </Title>
            <Text size="sm" className="mb-4">{t("Overall system usage trends")}</Text>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={scanJobsData.map((item, index) => ({
                    month: item.month,
                    scanJobs: item.completed,
                    templates: templatesData[index].active,
                    teachers: teachersData[index].total,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="scanJobs"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name={t("Completed Scan Jobs")}
                  />
                  <Line
                    type="monotone"
                    dataKey="templates"
                    stroke="#10b981"
                    strokeWidth={2}
                    name={t("Active Templates")}
                  />
                  <Line
                    type="monotone"
                    dataKey="teachers"
                    stroke="#a855f7"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name={t("Total Teachers")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
