
import { useState } from "react"
import {
  Badge,
  Button,
  Card,
  CardSection,
  Progress,
  Text,
  Title,
  Grid,
  Group,
  Stack,
  Skeleton,
} from "@mantine/core"
import {
  Eye,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
} from "lucide-react"

import dayjs from "dayjs"
import { useScanJobs } from "../api"
import { ScanJobForm } from "../components"
import { ScanResultViewer } from "../components/scan-job-result"
import { Header } from "@/components/layouts/header"
import { useTranslation } from "react-i18next"

export function ScanJobManager() {
  const { data: scanJobs = [], isLoading } = useScanJobs()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isResultViewerOpen, setIsResultViewerOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const {t} = useTranslation()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green"
      case "processing":
        return "blue"
      case "failed":
        return "red"
      case "pending":
        return "yellow"
      default:
        return "gray"
    }
  }

  const handleViewResult = (job: any) => {
    setSelectedJob(job)
    setIsResultViewerOpen(true)
  }

  if (isLoading) {
    return (
      <div className="p-5">
        <Stack spacing="md">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={200} radius="md" />
          ))}
        </Stack>
      </div>
    )
  }

  return (
    <div className="">
      <Header title={t('Scan Job Manager')} dataCount={scanJobs.length} />
      <div className="p-5">
        <Stack spacing="lg">
          <div className="flex justify-end">
            <Button 
              onClick={() => setIsFormOpen(true)} 
              leftSection={<Upload size={16} />}
            >
              {t('New Scan Job')}
            </Button>
          </div>

          {scanJobs.length === 0 && (
            <Stack align="center" py="xl" c="dimmed">
              <FileText className="w-12 h-12 mb-2 text-gray-400" />
              <Text>{t('No scan jobs yet. Upload a document to get started.')}</Text>
            </Stack>
          )}

          <Stack>
            {scanJobs.scanJobs.map((job) => (
              <Card key={job.id} shadow="xs" withBorder>
                <CardSection withBorder py="sm" px="md">
                  <Group position="apart" align="start">
                    <div>
                      <Title order={4}>
                        <Group gap={6}>
                          <FileText size={20} />
                          <Text span>Scan Job #{job.id}</Text>
                        </Group>
                      </Title>
                      <Text size="sm" c="dimmed">
                        Template: {job.templateName}
                      </Text>
                    </div>
                    <Group spacing={6}>
                      {getStatusIcon(job.status)}
                      <Badge color={getStatusColor(job.status)} variant="light">
                        {job.status}
                      </Badge>
                    </Group>
                  </Group>
                </CardSection>

                <CardSection px="md" py="md">
                  <Grid gutter="sm">
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Text fw={500} size="sm">{t('Document:')}</Text>
                      <Text size="sm" c="dimmed">{job.documentUrl.split("/").pop()}</Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Text fw={500} size="sm">Pages:</Text>
                      <Text size="sm" c="dimmed">{job.pages}</Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                      <Text fw={500} size="sm">Created:</Text>
                      <Text size="sm" c="dimmed">
                        {dayjs(job.createdAt).format("DD MMM YYYY, HH:mm")}
                      </Text>
                    </Grid.Col>
                  </Grid>

                  {job.status === "processing" && (
                    <Stack spacing="xs" mt="md">
                      <Group position="apart">
                        <Text size="sm">{t('Processing...')}</Text>
                        <Text size="sm">{t('Please wait')}</Text>
                      </Group>
                      <Progress value={65} size="sm" />
                    </Stack>
                  )}

                  {job.ocrResult && (
                    <div className="bg-gray-50 p-3 rounded-lg mt-4">
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                          <Text fw={500} size="sm">Student ID:</Text>
                          <Text size="sm" c="dimmed">{job.ocrResult.studentId}</Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                          <Text fw={500} size="sm">Score:</Text>
                          <Text size="sm" c="dimmed">{job.ocrResult.score}%</Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                          <Text fw={500} size="sm">Questions:</Text>
                          <Text size="sm" c="dimmed">{job.ocrResult.questions.length}</Text>
                        </Grid.Col>
                      </Grid>
                    </div>
                  )}

                  {job.status === "completed" && job.ocrResult && (
                    <Group mt="md">
                      <Button 
                        size="xs" 
                        variant="outline" 
                        onClick={() => handleViewResult(job)} 
                        leftSection={<Eye size={14} />}
                      >
                        {t('View Results')}
                      </Button>
                    </Group>
                  )}
                </CardSection>
              </Card>
            ))}
          </Stack>

          <ScanJobForm 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
          />
          
          <ScanResultViewer 
            isOpen={isResultViewerOpen} 
            onClose={() => setIsResultViewerOpen(false)} 
            job={selectedJob} 
          />
        </Stack>
      </div>
    </div>
  )
}