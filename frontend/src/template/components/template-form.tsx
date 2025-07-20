import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Modal,
  TextInput,
  Textarea,
  Title,
  Group,
  Button,
  Badge,
  Card,
  Stack,
  Divider,
} from "@mantine/core"
import { Plus, Save } from "lucide-react"
import { CreateTemplateDto, createTemplateSchema, TemplateRegionDto } from "../schemas"
import { useCreateTemplate } from "../api/create-template"
import { RegionForm } from "@/ocr/components/region-form"
import { useTranslation } from "react-i18next"


interface TemplateFormProps {
  isOpen: boolean
  onClose: () => void
  template?: {
    id: string
    name: string
    description: string
    currentUserName: string; 
    createdBy: string
    regions: TemplateRegionDto[]
  }
}

export function TemplateForm({ isOpen, onClose, template,currentUserName }: TemplateFormProps) {
  const [regions, setRegions] = useState<TemplateRegionDto[]>([])
  const [isRegionFormOpen, setIsRegionFormOpen] = useState(false)

  const {t} = useTranslation()

  const createMutation = useCreateTemplate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateDto>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      createdBy: currentUserName,
      regions: [],
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (template) {
        reset({
          name: template.name,
          description: template.description,
          createdBy: template.createdBy,
        })
        setRegions(template.regions || [])
      } else {
        reset({
          name: "",
          description: "",
          createdBy: currentUserName,
        })
        setRegions([])
      }
    }
  }, [isOpen, template, reset])

  const onSubmit = (data: CreateTemplateDto) => {
    const templateData = {
      ...data,
      regions: regions,
    }

    createMutation.mutate(templateData, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  const handleAddRegion = (regionData: any) => {
   
    setRegions([...regions, regionData])
    
    setIsRegionFormOpen(false)

  }


  const getRegionTypeColor = (type: string) => {
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
      <>
        <Modal
          opened={isOpen}
          onClose={onClose}
          title={<Title order={4}>{t('Create Template') }</Title>}
          size="lg"
          styles={{ body: { maxHeight: "80vh", overflowY: "auto" } }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="md">
              <Group grow>
                <div>
                  <TextInput
                    label={t('Template Name*')}
                    placeholder="Enter template name"
                    {...register("name", { required: "Template name is required" })}
                    error={errors.name?.message}
                  />
                </div>
               
              </Group>

              <Textarea
                label={t('Description')}
                placeholder="Enter template description"
                minRows={3}
                {...register("description")}
              />

              <Divider label={`Regions (${regions.length})`} labelPosition="left" />

              <Group position="right">
                <Button
                  variant="default"
                  leftIcon={<Plus size={16} />}
                  onClick={() => setIsRegionFormOpen(true)}
                >
                 {t('Add Region')}
                </Button>
              </Group>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regions.map((region) => (
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

              {regions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                 {t('No regions added yet. Click "Add Region" to get started.')}
                </div>
              )}

              <Group position="right" mt="lg">
                <Button variant="default" onClick={onClose}>
                  {t('Cancel')}
                </Button>
                <Button type="submit" leftIcon={<Save size={16} />}>
                 {t('Save Template')}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>

        <RegionForm
          isOpen={isRegionFormOpen}
          onClose={() => {
            setIsRegionFormOpen(false)
         
          }}
          onSave={handleAddRegion}
         
        />
      </>
    )
  }

