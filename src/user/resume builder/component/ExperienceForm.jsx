import React from 'react'
import { TextInput, Button, Group, Stack } from '@/components/ui/system'
import { IconPlus, IconTrash } from '@tabler/icons-react'

const ExperienceForm = ({ experience, onChange, onAdd, onDelete }) => (
  <Stack>
    {experience.map((item, idx) => (
      <Group key={item.id} align="flex-end" spacing="xs">
        <TextInput
          label="Position"
          name="position"
          value={item.position}
          onChange={e => onChange(e, item.id)}
          placeholder="Position"
        />
        <TextInput
          label="Company"
          name="company"
          value={item.company}
          onChange={e => onChange(e, item.id)}
          placeholder="Company"
        />
        <TextInput
          label="City"
          name="city"
          value={item.city}
          onChange={e => onChange(e, item.id)}
          placeholder="City"
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
      Add Experience
    </Button>
  </Stack>
)

export default ExperienceForm


