import React, { forwardRef } from 'react'
import {
  Paper, Avatar, Stack, Title, Text, Divider, Group, Box, Badge, useMantineTheme,
} from '@mantine/core'
import {
  IconBriefcase, IconBook, IconDeviceFloppy, IconLanguage, IconHeart,
} from '@tabler/icons-react'

const CVTemplateMinimal = forwardRef(({ cv, colorScheme, style }, ref) => {
  const theme = useMantineTheme()
  return (
    <Paper
      ref={ref}
      shadow="xs"
      radius="md"
      p="xl"
      style={{
        minHeight: 800,
        background: theme.colors.gray[0],
        color: theme.colors.dark[7],
        ...style,
        border: `1px solid ${theme.colors.gray[3]}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Group align="center" spacing="md" mb="md">
        <Avatar src={cv.personalInfo.photo} size={70} radius={70} alt="avatar" />
        <Stack spacing={0}>
          <Title order={3} size={24} fw={700}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</Title>
          <Text size="sm" color="gray.7">{cv.personalInfo.title}</Text>
        </Stack>
      </Group>
      <Divider mb="sm" />
      {cv.personalInfo.description && (
        <Text size="sm" color="gray.8" mb="md">{cv.personalInfo.description}</Text>
      )}
      <Divider mb="sm" />
      {cv.experience && cv.experience.length > 0 && (
        <>
          <Group spacing={6} mb={4}><IconBriefcase size={16} /><Title order={5} size={14}>Experience</Title></Group>
          <Stack spacing={2} mb="md">
            {cv.experience.map(item => (
              <Box key={item.id}>
                <Text fw={600}>{item.position}</Text>
                <Text size="xs" color="gray.7">{item.company} - {item.city} ({item.from} - {item.to})</Text>
              </Box>
            ))}
          </Stack>
        </>
      )}
      {cv.education && cv.education.length > 0 && (
        <>
          <Group spacing={6} mb={4}><IconBook size={16} /><Title order={5} size={14}>Education</Title></Group>
          <Stack spacing={2} mb="md">
            {cv.education.map(item => (
              <Box key={item.id}>
                <Text fw={600}>{item.universityName}</Text>
                <Text size="xs" color="gray.7">{item.degree} in {item.subject} - {item.city} ({item.from} - {item.to})</Text>
              </Box>
            ))}
          </Stack>
        </>
      )}
      {cv.skills && cv.skills.filter(Boolean).length > 0 && (
        <>
          <Group spacing={6} mb={4}><IconDeviceFloppy size={16} /><Title order={5} size={14}>Skills</Title></Group>
          <Group spacing={6} mb="md" style={{ flexWrap: 'wrap' }}>
            {cv.skills.filter(Boolean).map((s, i) => (
              <Badge key={i} color="gray" variant="light" size="xs">{s}</Badge>
            ))}
          </Group>
        </>
      )}
      {cv.languages && cv.languages.filter(Boolean).length > 0 && (
        <>
          <Group spacing={6} mb={4}><IconLanguage size={16} /><Title order={5} size={14}>Languages</Title></Group>
          <Group spacing={6} mb="md" style={{ flexWrap: 'wrap' }}>
            {cv.languages.filter(Boolean).map((l, i) => (
              <Badge key={i} color="gray" variant="outline" size="xs">{l}</Badge>
            ))}
          </Group>
        </>
      )}
      {cv.hobbies && cv.hobbies.filter(Boolean).length > 0 && (
        <>
          <Group spacing={6} mb={4}><IconHeart size={16} /><Title order={5} size={14}>Hobbies</Title></Group>
          <Group spacing={6} mb="md" style={{ flexWrap: 'wrap' }}>
            {cv.hobbies.filter(Boolean).map((h, i) => (
              <Badge key={i} color="gray" variant="outline" size="xs">{h}</Badge>
            ))}
          </Group>
        </>
      )}
    </Paper>
  )
})

export default CVTemplateMinimal
