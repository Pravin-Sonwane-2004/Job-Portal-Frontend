import React, { forwardRef } from 'react'
import {
  Paper, Avatar, Stack, Title, Text, Divider, Group, Box, Badge, useMantineTheme,
} from '@mantine/core'
import {
  IconUser, IconBriefcase, IconBook, IconDeviceFloppy, IconLanguage, IconHeart,
  IconHome, IconPhone, IconMail, IconInfoCircle,
} from '@tabler/icons-react'

const CVTemplateClassic = forwardRef(({ cv, colorScheme, style }, ref) => {
  const theme = useMantineTheme()
  return (
    <Paper
      ref={ref}
      shadow="md"
      radius="md"
      p={0}
      style={{
        minHeight: 800,
        background: theme.colors.neutral[0],
        color: theme.colors.dark[7],
        ...style,
        overflow: 'hidden',
        border: `2px solid ${theme.colors.blue[2]}`,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Sidebar */}
      <Stack
        align="center"
        spacing="xs"
        style={{
          background: theme.colors.blue[1],
          width: 180,
          minHeight: '100%',
          padding: '2rem 0.5rem',
        }}
      >
        <Avatar src={cv.personalInfo.photo} size={80} radius={80} alt="avatar" mb="sm" />
        <Title order={3} size={20} fw={700} align="center">
          {cv.personalInfo.firstName} {cv.personalInfo.lastName}
        </Title>
        <Text size="sm" color={theme.colors.blue[8]} fw={500} align="center">
          {cv.personalInfo.title}
        </Text>
        <Divider my="sm" />
        <Group spacing={4}><IconHome size={16} /><Text size="xs">{cv.personalInfo.address}</Text></Group>
        <Group spacing={4}><IconPhone size={16} /><Text size="xs">{cv.personalInfo.phoneNumber}</Text></Group>
        <Group spacing={4}><IconMail size={16} /><Text size="xs">{cv.personalInfo.email}</Text></Group>
        <Divider my="sm" />
        <Title order={6} size={12} color="blue.8" mt="md">Skills</Title>
        <Stack spacing={2}>
          {cv.skills.filter(Boolean).map((s, i) => (
            <Badge key={i} color="blue" variant="filled" size="xs">{s}</Badge>
          ))}
        </Stack>
        <Title order={6} size={12} color="blue.8" mt="md">Languages</Title>
        <Stack spacing={2}>
          {cv.languages.filter(Boolean).map((l, i) => (
            <Badge key={i} color="blue" variant="light" size="xs">{l}</Badge>
          ))}
        </Stack>
        <Title order={6} size={12} color="blue.8" mt="md">Hobbies</Title>
        <Stack spacing={2}>
          {cv.hobbies.filter(Boolean).map((h, i) => (
            <Badge key={i} color="blue" variant="outline" size="xs">{h}</Badge>
          ))}
        </Stack>
      </Stack>
      {/* Main Content */}
      <Stack spacing={0} p="lg" style={{ flex: 1 }}>
        <Title order={2} size={28} fw={700} mb={4}>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</Title>
        <Text size="md" color="blue.8" fw={500} mb={8}>{cv.personalInfo.title}</Text>
        <Divider mb="sm" />
        {cv.personalInfo.description && (
          <>
            <Group spacing={8} mb={4}>
              <IconInfoCircle size={18} color={theme.colors.blue[6]} />
              <Title order={4} color="blue.7" fw={600} size={16}>Profile</Title>
            </Group>
            <Text size="sm" color="dark.7" mb="md">{cv.personalInfo.description}</Text>
            <Divider mb="sm" />
          </>
        )}
        {cv.experience && cv.experience.length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconBriefcase size={18} color={theme.colors.blue[6]} />
              <Title order={4} color="blue.7" fw={600} size={16}>Experience</Title>
            </Group>
            <Stack spacing={4} mb="md">
              {cv.experience.map(item => (
                <Box key={item.id}>
                  <Text fw={600}>{item.position}</Text>
                  <Text size="xs" color="neutral.7">{item.company} - {item.city} ({item.from} - {item.to})</Text>
                </Box>
              ))}
            </Stack>
            <Divider mb="sm" />
          </>
        )}
        {cv.education && cv.education.length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconBook size={18} color={theme.colors.blue[6]} />
              <Title order={4} color="blue.7" fw={600} size={16}>Education</Title>
            </Group>
            <Stack spacing={4} mb="md">
              {cv.education.map(item => (
                <Box key={item.id}>
                  <Text fw={600}>{item.universityName}</Text>
                  <Text size="xs" color="neutral.7">{item.degree} in {item.subject} - {item.city} ({item.from} - {item.to})</Text>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  )
})

export default CVTemplateClassic
