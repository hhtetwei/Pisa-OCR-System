"use client"

import {
  Modal,
  Text,
  Title,
  Group,
  Badge,
  Stack,
  Card,
  SimpleGrid,
  Divider,
} from "@mantine/core"
import { useTranslation } from "react-i18next"

interface TemplateViewerProps {
  isOpen: boolean
  onClose: () => void
  template?: any
}

export function TemplateViewer({ isOpen, onClose, template }: TemplateViewerProps) {
  if (!template) return null
  const { t } = useTranslation()

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "qr_code":
        return "blue"
      case "multiple_choice":
        return "green"
      case "math":
        return "violet"
      default:
        return "gray"
    }
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title={`Template: ${template.name}`} size="xl" fullScreen>
      <Stack spacing="lg">
        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Stack spacing="xs">
            <Title order={4}>{t('Template Information')}</Title>
            <Text size="sm"><strong>Name:</strong> {template.name}</Text>
            <Text size="sm"><strong>Description:</strong> {template.description || "No description"}</Text>
            <Text size="sm"><strong>Created by:</strong> {template.createdBy}</Text>
            <Text size="sm"><strong>Created:</strong> {new Date(template.createdAt).toLocaleDateString()}</Text>
            <Text size="sm"><strong>Total Regions:</strong> {template.regions.length}</Text>
          </Stack>

          <Stack spacing="xs">
            <Title order={4}>{t('Region Summary')}</Title>
            {["qr_code", "multiple_choice", "math"].map((type) => {
              const count = template.regions.filter((r: any) => r.type === type).length
              if (count === 0) return null
              return (
                <Group key={type} spacing="xs">
                  <Badge color={getBadgeColor(type)} variant="light">{type.replace("_", " ")}</Badge>
                  <Text size="sm">{count} region{count !== 1 ? "s" : ""}</Text>
                </Group>
              )
            })}
          </Stack>
        </SimpleGrid>

        <Divider />

        <Stack spacing="sm">
          <Title order={4}>Regions Detail</Title>
          <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {template.regions.map((region: any, index: number) => (
              <Card key={region.id || index} shadow="sm" radius="md" withBorder>
                <Stack spacing="xs">
                  <Group position="apart">
                    <Text size="sm" weight={500}>{region.regionId}</Text>
                    <Badge color={getBadgeColor(region.type)} variant="light">
                      {region.type.replace("_", " ")}
                    </Badge>
                  </Group>

                  <Text size="xs" color="dimmed">
                    <strong>Coordinates:</strong> [{region.coordinates.join(", ")}]
                  </Text>
                  <Text size="xs" color="dimmed">
                    <strong>Position:</strong> X:{region.coordinates[0]}, Y:{region.coordinates[1]}
                  </Text>
                  <Text size="xs" color="dimmed">
                    <strong>Size:</strong> {region.coordinates[2] - region.coordinates[0]} × {region.coordinates[3] - region.coordinates[1]}
                  </Text>

                  {region.options?.length > 0 && (
                    <div>
                      <Text size="xs" weight={500}>Options:</Text>
                      <Group spacing="xs" mt={4}>
                        {region.options.map((option: string) => (
                          <Badge key={option} variant="outline" size="xs">
                            {option}
                          </Badge>
                        ))}
                      </Group>
                    </div>
                  )}

                  {region.correctAnswer && (
                    <Text size="xs">
                      <strong>Correct Answer:</strong>{" "}
                      <Badge color="gray" variant="light" size="xs">
                        {region.correctAnswer}
                      </Badge>
                    </Text>
                  )}

                  {region.optionLabel && (
                    <Text size="xs">
                      <strong>Option Label:</strong> {region.optionLabel}
                    </Text>
                  )}
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Modal>
  )
}
