import type React from "react"
import { useState, useEffect } from "react"
import "../styles/global.css"

type InputField = {
  name: string
  type: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  placeholder?: string
}

type FormProps = {
  fields: InputField[]
  onSubmit?: (data: Record<string, string>) => void
  submitText?: string
  className?: string
  title?: string
  description?: string
}

const formatLabel = (name: string): string => {
  return name
    .split(/(?=[A-Z])/)
    .join(" ")
    .split("_")
    .join(" ")
    .split("-")
    .join(" ")
    .replace(/^\w/, (c) => c.toUpperCase())
}

export default function FormComponent({ fields, onSubmit, submitText = "Soumettre", className = "", title, description }: FormProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({})

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const initialValues: Record<string, string> = {}
    fields.forEach((field) => {
      initialValues[field.name] = ""
    })
    setFormValues(initialValues)
  }, [fields])

  const validateField = (field: InputField, value: string): string => {
    if (field.required && !value) {
      return `${formatLabel(field.name)} est requis`
    }

    if (field.minLength && value.length < field.minLength) {
      return `${formatLabel(field.name)} doit contenir au moins ${field.minLength} caractères`
    }

    if (field.maxLength && value.length > field.maxLength) {
      return `${formatLabel(field.name)} ne doit pas dépasser ${field.maxLength} caractères`
    }

    if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      return "Format d'email invalide"
    }

    if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
      return `Format de ${formatLabel(field.name)} invalide`
    }

    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const field = fields.find((f) => f.name === name)
      if (field) {
        const error = validateField(field, value)
        setErrors((prev) => ({ ...prev, [name]: error }))
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const field = fields.find((f) => f.name === name)
    if (field) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()


    const newErrors: Record<string, string> = {}
    let isValid = true

    fields.forEach((field) => {
      const error = validateField(field, formValues[field.name] || "")
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    setTouched(Object.keys(formValues).reduce((acc, key) => ({ ...acc, [key]: true }), {}))


    if (isValid && onSubmit) {
      onSubmit(formValues)
    }
  }

    return (
    <div className="relative p-[4px] rounded-md my-5" style={{ background: "linear-gradient(135deg, var(--color-primary) 40%, var(--color-secondary) 100%)" }}>
        <div className="bg-white bg-opacity-80 rounded-md">
        {title && <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-center mb-8 animate-gradient">{title}</h3>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        <form
            onSubmit={handleSubmit}
            className={`max-w-md mx-auto p-6 w-full ${className}`}
        >
            {fields.map((field) => (
            <div key={field.name} className="mb-4">
                <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-primary)" }}
                >
                {formatLabel(field.name)}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formValues[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder || `Entrez ${formatLabel(field.name).toLowerCase()}`}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors
                    ${errors[field.name] ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                style={{
                    borderColor: errors[field.name] ? "red" : "#e5e7eb",
                    boxShadow:
                    touched[field.name] && !errors[field.name] ? "0 0 0 2px var(--color-secondary, #10b981, 0.2)" : "none",
                }}
                />

                {touched[field.name] && errors[field.name] && (
                <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
                )}
            </div>
            ))}

            <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white font-medium transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
            >
            {submitText}
            </button>
        </form>
        </div>
    </div>
    )
}