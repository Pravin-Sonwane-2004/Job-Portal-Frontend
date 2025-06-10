import React from 'react'
import { TextInput, Button, Group, Stack } from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'

const EducationForm = ({ education, onChange, onAdd, onDelete }) => (
  <Stack>
    {education.map((item, idx) => (
      <Group key={item.id} align="flex-end" spacing="xs">
        <TextInput
          label="University Name"
          name="universityName"
          value={item.universityName}
          onChange={e => onChange(e, item.id)}
          placeholder="University name"
        />
        <TextInput
          label="City"
          name="city"
          value={item.city}
          onChange={e => onChange(e, item.id)}
          placeholder="City"
        />
        <TextInput
          label="Degree"
          name="degree"
          value={item.degree}
          onChange={e => onChange(e, item.id)}
          placeholder="Degree"
        />
        <TextInput
          label="Subject"
          name="subject"
          value={item.subject}
          onChange={e => onChange(e, item.id)}
          placeholder="Subject"
        />
        <TextInput
          label="From"
          name="from"
          value={item.from}
          onChange={e => onChange(e, item.id)}
          placeholder="From"
        />
        <TextInput
          label="To"
          name="to"
          value={item.to}
          onChange={e => onChange(e, item.id)}
          placeholder="To"
        />
        <Button color="red" variant="light" onClick={() => onDelete(item.id)} leftIcon={<IconTrash size={16} />}>
          Delete
        </Button>
      </Group>
    ))}
    <Button leftIcon={<IconPlus size={16} />} onClick={onAdd} variant="outline">
      Add Education
    </Button>
  </Stack>
)

export default EducationForm
