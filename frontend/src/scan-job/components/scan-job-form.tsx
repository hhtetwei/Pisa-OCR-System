
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Modal,
  Text,
  TextInput,
  Button,
  Select,
  FileInput,
  Group,
  Box,
  LoadingOverlay,
} from "@mantine/core"
import { Upload, FileText } from "lucide-react"
import { useCreateScanJob } from "../api"
import { useTemplates } from "@/template/api/get-templates"
import { CreateScanJobDto, scanJobSchema } from "../schemas"
import { useTranslation } from "react-i18next"


interface ScanJobFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ScanJobForm({ isOpen, onClose }: ScanJobFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { data: templates = [], isLoading: isTemplatesLoading } = useTemplates()
  const createMutation = useCreateScanJob()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateScanJobDto>({
    resolver: zodResolver(scanJobSchema),
    defaultValues: {
      templateId: "",
      pages: 1,
    },
  })

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
  }

  const onSubmit = async (data: CreateScanJobDto) => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("image", selectedFile)
    formData.append("templateId", data.templateId)
    formData.append("pages", data.pages.toString())

    try {
      await createMutation.mutateAsync(formData)
      reset()
      setSelectedFile(null)
      onClose()
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const handleClose = () => {
    if (!createMutation.isPending) {
      reset()
      setSelectedFile(null)
      onClose()
    }
  }

  const {t} = useTranslation()

  return (
    <Modal 
      opened={isOpen} 
      onClose={handleClose} 
      title={t('Create New Scan Job')}
      size="md"
    >
      <Box pos="relative">
        <LoadingOverlay 
          visible={createMutation.isPending || isTemplatesLoading} 
          zIndex={1000} 
          overlayProps={{ blur: 2 }} 
        />
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Text size="sm" fw={500} mb={4}>
             {t('Select Template *')}
            </Text>
            <Controller
  name="templateId"
  control={control}
  render={({ field }) => (
    <Select
      placeholder="Choose a template"
      data={templates?.result?.map((t) => ({
        value: String(t.id),
        label: t.name,
      }))}
      disabled={isTemplatesLoading}
      error={errors.templateId?.message}
      {...field}
    />
  )}
/>
          </div>

          <div>
            <Text size="sm" fw={500} mb={4}>
              {t('Upload Document *')}
            </Text>
            <FileInput
              placeholder="Choose file"
              value={selectedFile}
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              icon={<Upload size={16} />}
              error={!selectedFile ? "Please select a document" : undefined}
            />
            {selectedFile && (
              <Box mt="xs" className="text-sm text-gray-600">
                <FileText className="inline-block w-4 h-4 mr-1 text-green-600" />
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </Box>
            )}
          </div>

          <div>
            <Text size="sm" fw={500} mb={4}>
             {t('Number of Pages')}
            </Text>
            <TextInput
              type="number"
              min={1}
              max={50}
              defaultValue={1}
              {...register("pages", { valueAsNumber: true })}
              error={errors.pages?.message}
            />
            <Text size="xs" c="dimmed" mt={4}>
              {t('Specify the number of pages to process')}
            </Text>
          </div>

          <Group justify="end" mt="lg" pt="md" className="border-t">
            <Button 
              variant="default" 
              onClick={handleClose} 
              disabled={createMutation.isPending}
            >
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || createMutation.isPending}
              leftSection={
                <Upload 
                  size={16} 
                  className={createMutation.isPending ? "animate-pulse" : ""} 
                />
              }
            >
              {createMutation.isPending ? "Creating..." : "Create Scan Job"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}