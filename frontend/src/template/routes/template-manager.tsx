

import { useState } from "react"
import {
  Card,
  Text,
  Group,
  Title,
  Badge,
  Stack,
  SimpleGrid,
  Divider,
} from "@mantine/core"
import { Plus, Eye } from "lucide-react"

import { Header } from "@/components/layouts/header"
import { Button } from "@/components/ui/button"
import { useTemplates } from "../api/get-templates"
import { TemplateForm } from "../components"
import { ViewTemplateModal } from "../components/view-template"
import { useAuth } from "@/features/auth/hooks"
import { useTranslation } from "react-i18next"


export function TemplateManager() {
  const { data: templates = [], isLoading } = useTemplates()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const {t} = useTranslation()

  const { user } = useAuth(); 

  const userName = user?.name

  const handleCreate = () => {
    setSelectedTemplate(null)
    setIsFormOpen(true)
  }

  const handleView = (template: any) => {
    setSelectedTemplate(template)
    setIsViewOpen(true)
  }


  if (isLoading) return <div>Loading...</div>

  return (
    <div className="">
      <Header title={t('Template Manager')} />
      <div className="p-5">
        <Stack spacing={24}>
          <div className="flex justify-end">
            <Button leftIcon={<Plus size={16} />} onClick={handleCreate}>
              {t('Create Template')}
            </Button>
          </div>

          <SimpleGrid cols={1} breakpoints={[{ minWidth: 'md', cols: 2 }, { minWidth: 'lg', cols: 3 }]}>
            {templates.result.map((template) => (
              <Card key={template.id} shadow="sm" padding="md" radius="md" withBorder>
                <Stack spacing="xs">
                  <Title order={4}>{template.name}</Title>
                  <Text size="sm" color="dimmed">{template.description}</Text>

                  <Group spacing="xs" mt="xs">
                    <Badge color="gray" variant="light">
                      {template.regions.length} regions
                    </Badge>
                    <Badge color={template.regions.some(r => r.type === "qr_code") ? "green" : "red"} variant="light">
                      {template.regions.some(r => r.type === "qr_code") ? "QR Enabled" : "No QR"}
                    </Badge>
                  </Group>

                  <Text size="xs" color="gray">Created by: {template.createdBy}</Text>

                  <Divider my="sm" />

                  <Group position="left">
                    <Button
                      variant="outline"
                      size="xs"
                      leftIcon={<Eye size={14} />}
                      onClick={() => handleView(template)}
                    >
                    {t('View')}
                    </Button>
                 
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>

          <TemplateForm 
            isOpen={isFormOpen} 
            onClose={() => {
              setIsFormOpen(false)
              setSelectedTemplate(null)
            }} 
            template={selectedTemplate}
            currentUserName={userName} 
          />

{selectedTemplate && (
  <ViewTemplateModal
    isOpen={isViewOpen}
    onClose={() => {
      setIsViewOpen(false)
      setSelectedTemplate(null)
    }}
    template={selectedTemplate}
  />
)}
        </Stack>
      </div>
    </div>
  )
}