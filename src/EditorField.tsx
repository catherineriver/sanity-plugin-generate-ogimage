import React, {useState} from 'react'
import FormField from 'sanity'
import {LayoutData, LayoutField, LayoutFieldTypes} from './types'
import {Box, Stack, Switch, Text, TextArea, TextInput} from '@sanity/ui'

interface EditorFieldProps {
  field: LayoutField
  data: LayoutData
  updateData: (data: LayoutData) => void
  disabled: boolean
}

const UNSUPORTED_TYPES: LayoutFieldTypes[] = ['array', 'date', 'datetime', 'image', 'reference']

const EditorField: React.FC<EditorFieldProps> = ({field, data = {}, updateData, disabled}) => {
  const [value, setValue] = useState(data[field.name])

  if (!field?.type || !field.name || !updateData) {
    return null
  }

  const label = field.title || field.name

  if (UNSUPORTED_TYPES.includes(field.type)) {
    return (
      <Box marginTop={2}>
        <Stack space={2}>
          <Text size={1} weight="semibold">
            {label}
          </Text>
          <Text size={0}>
            {field.unsupportedError ||
              'Close this dialog and edit the document to change this field.'}
          </Text>
        </Stack>
      </Box>
    )
  }

  if (field.type === 'object') {
    if (!field.fields?.length) {
      return null
    }
    // @TODO: fieldset
    return (
      <div>
        {field.fields.map((fld) => (
          // eslint-disable-next-line react/jsx-key
          <EditorField
            updateData={(newData) =>
              updateData({
                ...data,
                [field.name]: newData,
              })
            }
            field={fld}
            data={value}
            disabled={disabled}
          />
        ))}
      </div>
    )
  }

  if (!['boolean', 'number', 'text', 'string'].includes(field.type)) {
    console.error('Asset-source OG Image: wrong field type received')
    return null
  }

  function onChange(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(e.currentTarget.value || '')
    if (e.currentTarget.type === 'checkbox' && 'checked' in e.currentTarget) {
      setValue(e.currentTarget.checked)
    }
    if (e.currentTarget.type === 'number') {
      setValue(Number(value))
    }
    e.preventDefault()
    updateData({
      ...data,
      [field.name]: value,
    })
  }

  const commonProps = {
    onChange,
    value,
    disabled,
  }
  return (
    // @ts-ignore
    <FormField label={label} description={field.description}>
      {field.type === 'boolean' && <Switch checked={value === true} onChange={onChange} />}
      {field.type === 'text' && <TextArea {...commonProps} rows={1} />}
      {(field.type === 'string' || field.type === 'number') && (
        <TextInput type={field.type === 'number' ? 'number' : 'text'} {...commonProps} />
      )}
    </FormField>
  )
}

export default EditorField
