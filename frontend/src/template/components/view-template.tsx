
import { TextInput } from "@/components/ui/text-input"
import { Title } from "@/components/ui/title"
import { Card, Divider, Group, Modal, Stack, Textarea } from "@mantine/core"
import { Badge } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ViewTemplateModalProps {
    isOpen: boolean
    onClose: () => void
    template: {
      id: string
      name: string
      description: string
      createdBy: string
      regions: TemplateRegionDto[]
    }
  }
  
export function ViewTemplateModal({ isOpen, onClose, template }: ViewTemplateModalProps) {
    const {t} = useTranslation()
    const getRegionTypeColor = (type: string) => {
      switch (type) {
        case "qr_code": return "blue"
        case "multiple_choice": return "green"
        case "math": return "violet"
        default: return "gray"
      }
    }
  
    return (
      <Modal opened={isOpen} onClose={onClose} title={<Title order={4}>{t('View Template')}</Title>} size="lg" renderActionButton={() => null}>
        <Stack spacing="md">
          <TextInput label={t('Template Name')} value={template.name} disabled />
          <TextInput label={t('Created By')} value={template.createdBy} disabled />
          <Textarea label={t('Description')} value={template.description} disabled />
  
          <Divider label={`Regions (${template.regions.length})`} labelPosition="left" />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {template.regions.map((region) => (
              <Card key={region.id} shadow="sm" padding="md" radius="md" withBorder>
                <Group position="apart">
                  <div>
                    <Title order={6}>{region.regionId}</Title>
                    <Badge color={getRegionTypeColor(region.type)} variant="light" mt="xs">
                      {region.type.replace("_", " ")}
                    </Badge>
                  </div>
                </Group>
                <div className="text-sm text-gray-600 mt-2">
                  <div>Coordinates: [{region.coordinates.join(", ")}]</div>
                  {region.options?.length > 0 && <div>Options: {region.options.join(", ")}</div>}
                  {region.correctAnswer && <div>Correct: {region.correctAnswer}</div>}
                </div>
              </Card>
            ))}
          </div>
        </Stack>
      </Modal>
    )
  }
  