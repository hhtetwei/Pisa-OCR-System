
import {
  Modal,
  Text,
  Table,
  Progress,
  Badge,
  Group,
  Stack,
  Card,
} from "@mantine/core"
import { CheckCircle, XCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ScanResultViewerProps {
  isOpen: boolean
  onClose: () => void
  job?: any
}

export function ScanResultViewer({ isOpen, onClose, job }: ScanResultViewerProps) {
  const {t} = useTranslation()
  if (!job) return null

  const getAnswerStatus = (question: any) => {
    if (question.type === "multiple_choice") {
      return question.detectedAnswer === question.correctAnswer ? "correct" : "incorrect"
    }
    return question.score > 70 ? "correct" : "incorrect"
  }

  const getStatusIcon = (question: any) => {
    const status = getAnswerStatus(question)
    return status === "correct" ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    )
  }



  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={`Scan Results - Job #${job.id}`}
      size="xl"
    >
      <Stack>
        <Card withBorder shadow="sm">
          <Group position="apart">
            <div>
              <Text fw={500}>{t('Student ID')}</Text>
              <Text>{job.ocrResult?.studentId || "Unknown"}</Text>
            </div>
            <div>
              <Text fw={500}>{t('Overall Score')}</Text>
              <Group spacing="xs">
                <Progress value={job.ocrResult?.score || 0} w={200} />
                <Text fw={700}>{job.ocrResult?.score || 0}%</Text>
              </Group>
            </div>
          </Group>
        </Card>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('Question')}</Table.Th>
              <Table.Th>{t('Type')}</Table.Th>
              <Table.Th>{t('Detected Answer')}</Table.Th>
              <Table.Th>{t('Correct Answer')}</Table.Th>
              <Table.Th>{t('Score')}</Table.Th>
              <Table.Th>{t('Status')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {job.ocrResult?.questions?.map((question: any) => (
              <Table.Tr key={question.id}>
                <Table.Td>{question.questionId}</Table.Td>
                <Table.Td>
                  <Badge variant="light">
                    {question.type.replace("_", " ")}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {question.detectedAnswer || question.detectedText || "-"}
                </Table.Td>
                <Table.Td>{question.correctAnswer || "-"}</Table.Td>
                <Table.Td>{question.score}%</Table.Td>
                <Table.Td>
                  <Group spacing={4}>
                    {getStatusIcon(question)}
                    <Text>
                      {getAnswerStatus(question) === "correct" ? "Correct" : "Incorrect"}
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Modal>
  )
}