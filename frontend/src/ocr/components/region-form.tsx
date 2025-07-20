"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Modal,
  TextInput,
  Select,
  Text,
  Group,
  Button,
  Badge,
  Divider,
} from "@mantine/core"
import { Plus, X } from "lucide-react"

interface RegionFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (region: any) => void
  region?: any
}

export function RegionForm({ isOpen, onClose, onSave, region }: RegionFormProps) {
  const [regionType, setRegionType] = useState("multiple_choice")
  const [options, setOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isOpen) {
      if (region) {
        reset({
          regionId: region.regionId,
          correctAnswer: region.correctAnswer || "",
          optionLabel: region.optionLabel || "",
          x: region.coordinates[0],
          y: region.coordinates[1],
          width: region.coordinates[2] - region.coordinates[0],
          height: region.coordinates[3] - region.coordinates[1],
        })
        setRegionType(region.type)
        setOptions(region.options || [])
      } else {
        reset({
          regionId: "",
          correctAnswer: "",
          optionLabel: "",
          x: 0,
          y: 0,
          width: 100,
          height: 50,
        })
        setRegionType("multiple_choice")
        setOptions([])
      }
    }
  }, [isOpen, region, reset])

  const onSubmit = (data: any) => {
    const coordinates = [
      Number.parseInt(data.x),
      Number.parseInt(data.y),
      Number.parseInt(data.x) + Number.parseInt(data.width),
      Number.parseInt(data.y) + Number.parseInt(data.height),
    ]

    const regionData = {
      regionId: data.regionId,
      type: regionType,
      coordinates,
      options: regionType === "multiple_choice" ? options : [],
      correctAnswer: data.correctAnswer || null,
      optionLabel: data.optionLabel || null,
    }

    onSave(regionData)
  }

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()])
      setNewOption("")
    }
  }

  const removeOption = (option: string) => {
    setOptions(options.filter((o) => o !== option))
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title={region ? "Edit Region" : "Add New Region"} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text size="sm" fw={500}>Region ID *</Text>
            <TextInput
              placeholder="e.g., q1, qr_code"
              {...register("regionId", { required: "Region ID is required" })}
              error={errors.regionId?.message}
            />
          </div>

          <div>
            <Text size="sm" fw={500}>Region Type *</Text>
            <Select
              data={[
                { value: "qr_code", label: "QR Code" },
                { value: "multiple_choice", label: "Multiple Choice" },
                { value: "math", label: "Math/Text" },
              ]}
              value={regionType}
              onChange={(val) => setRegionType(val || "multiple_choice")}
            />
          </div>
        </div>

        <Divider my="md" label="Coordinates (Simple)" labelPosition="center" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Text size="sm">X Position</Text>
            <TextInput type="number" placeholder="0" {...register("x", { required: true, min: 0 })} />
          </div>
          <div>
            <Text size="sm">Y Position</Text>
            <TextInput type="number" placeholder="0" {...register("y", { required: true, min: 0 })} />
          </div>
          <div>
            <Text size="sm">Width</Text>
            <TextInput type="number" placeholder="100" {...register("width", { required: true, min: 1 })} />
          </div>
          <div>
            <Text size="sm">Height</Text>
            <TextInput type="number" placeholder="50" {...register("height", { required: true, min: 1 })} />
          </div>
        </div>
        <Text size="xs" c="dimmed">
          Tip: Use image editing software to find exact coordinates, or estimate based on layout.
        </Text>

        {regionType === "multiple_choice" && (
          <div className="space-y-4">
            <div>
              <Text size="sm" fw={500}>Option Label</Text>
              <TextInput
                placeholder="e.g., A, B, C, D"
                {...register("optionLabel")}
              />
              <Text size="xs" c="dimmed">
                The label for this specific option (used when checkbox is marked).
              </Text>
            </div>

            <div>
              <Text size="sm" fw={500}>Available Options</Text>
              <Group spacing="sm" mt="xs">
                <TextInput
                  value={newOption}
                  onChange={(e) => setNewOption(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addOption())}
                  placeholder="Add option (A, B, C, etc.)"
                />
                <Button onClick={addOption} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </Group>

              <Group spacing="xs" mt="sm">
                {options.map((option) => (
                  <Badge key={option} color="gray" variant="light" rightSection={
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeOption(option)} />
                  }>
                    {option}
                  </Badge>
                ))}
              </Group>
            </div>
          </div>
        )}

        {regionType !== "qr_code" && (
          <div>
            <Text size="sm" fw={500}>Correct Answer</Text>
            <TextInput
              placeholder={regionType === "multiple_choice" ? "A, B, C, or D" : "Expected text answer"}
              {...register("correctAnswer")}
            />
          </div>
        )}

        <Group justify="end" mt="md" pt="md" className="border-t">
          <Button variant="default" onClick={onClose}>Cancel</Button>
          <Button type="submit">{region ? "Update Region" : "Add Region"}</Button>
        </Group>
      </form>
    </Modal>
  )
}
