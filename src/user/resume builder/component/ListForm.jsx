import React from 'react'
import { TextInput, Button, Group, Stack } from '@/components/ui/system'
import { IconPlus, IconTrash } from '@tabler/icons-react'

const ListForm = ({ label, items, onChange, onAdd, onDelete }) => (
  <Stack>
    {items.map((item, idx) => (
      <Group key={idx} align="flex-end" spacing="xs">
        <TextInput
          label={label}
          value={item}
          onChange={e => onChange(idx, e.target.value)}
          placeholder={label}
        />
        <Button color="red" variant="light" onClick={() => onDelete(idx)} leftIcon={<IconTrash size={16} />}>
          Delete
        </Button>
      </Group>
    ))}
    <Button leftIcon={<IconPlus size={16} />} onClick={onAdd} variant="outline">
      Add {label}
    </Button>
  </Stack>
)

export default ListForm


