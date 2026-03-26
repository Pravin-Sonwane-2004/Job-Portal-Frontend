import React, { forwardRef } from 'react'
import {
  Paper,
  Avatar,
  Stack,
  Title,
  Text,
  Divider,
  Group,
  Box,
  Badge,
  useMantineTheme,
} from '@mantine/core'
import {
  IconUser,
  IconBriefcase,
  IconBook,
  IconDeviceFloppy,
  IconLanguage,
  IconHeart,
  IconHome,
  IconPhone,
  IconMail,
  IconInfoCircle,
} from '@tabler/icons-react'

const CVTemplateModern = forwardRef(({ cv, colorScheme, style }, ref) => {
  const theme = useMantineTheme()
  return (
    <Paper
      ref={ref}
      shadow="md"
      radius="md"
      p={0}
      style={{
        minHeight: 800,
        background: theme.colors.dark[8],
        color: theme.colors.neutral[2],
        ...style,
        overflow: 'hidden',
        border: `2px solid ${theme.colors.blue[8]}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        style={{
          background: theme.colors.blue[8],
          color: theme.white,
          padding: '2rem 1.5rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={cv.personalInfo.photo}
          size={100}
          radius={100}
          alt="avatar"
          mb="sm"
          style={{
            border: `3px solid ${theme.colors.blue[2]}`,
            marginBottom: 16,
          }}
        />
        <Title order={2} size={32} fw={700} style={{ letterSpacing: 1, color: theme.white }}>
          {cv.personalInfo.firstName} {cv.personalInfo.lastName}
        </Title>
        <Text size="lg" color={theme.colors.blue[1]} fw={500} mb={4}>
          {cv.personalInfo.title}
        </Text>
        <Group spacing={8} mt={8}>
          <IconHome size={18} color={theme.colors.blue[2]} />
          <Text size="sm" color={theme.colors.neutral[2]}>
            {cv.personalInfo.address}
          </Text>
        </Group>
        <Group spacing={8} mt={2}>
          <IconPhone size={18} color={theme.colors.blue[2]} />
          <Text size="sm" color={theme.colors.neutral[2]}>
            {cv.personalInfo.phoneNumber}
          </Text>
        </Group>
        <Group spacing={8} mt={2}>
          <IconMail size={18} color={theme.colors.blue[2]} />
          <Text size="sm" color={theme.colors.neutral[2]}>
            {cv.personalInfo.email}
          </Text>
        </Group>
      </Box>

      {/* Body */}
      <Stack spacing={0} p="md" style={{ flex: 1 }}>
        {/* Description */}
        {cv.personalInfo.description && (
          <>
            <Group spacing={8} mt="md" mb={4}>
              <IconInfoCircle size={20} color={theme.colors.blue[4]} />
              <Title order={4} color="blue.3" fw={600} size={18}>
                Profile
              </Title>
            </Group>
            <Text size="sm" color={theme.colors.neutral[3]} mb="md" style={{ lineHeight: 1.6 }}>
              {cv.personalInfo.description}
            </Text>
            <Divider mb="sm" />
          </>
        )}

        {/* Experience */}
        {cv.experience && cv.experience.length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconBriefcase size={20} color={theme.colors.blue[4]} />
              <Title order={4} color="blue.3" fw={600} size={18}>
                Experience
              </Title>
            </Group>
            <Stack spacing={6} mb="md">
              {cv.experience.map(item => (
                <Box key={item.id} style={{ paddingLeft: 8 }}>
                  <Group spacing={4} align="center">
                    <Text fw={600} color={theme.white}>{item.position}</Text>
                    <Badge color="blue" size="xs" variant="light">{item.company}</Badge>
                  </Group>
                  <Text size="xs" color={theme.colors.neutral[4]}>
                    {item.city} &middot; {item.from} - {item.to}
                  </Text>
                </Box>
              ))}
            </Stack>
            <Divider mb="sm" />
          </>
        )}

        {/* Education */}
        {cv.education && cv.education.length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconBook size={20} color={theme.colors.blue[4]} />
              <Title order={4} color="blue.3" fw={600} size={18}>
                Education
              </Title>
            </Group>
            <Stack spacing={6} mb="md">
              {cv.education.map(item => (
                <Box key={item.id} style={{ paddingLeft: 8 }}>
                  <Group spacing={4} align="center">
                    <Text fw={600} color={theme.white}>{item.universityName}</Text>
                    <Badge color="blue" size="xs" variant="light">{item.degree}</Badge>
                  </Group>
                  <Text size="xs" color={theme.colors.neutral[4]}>
                    {item.city} &middot; {item.subject} &middot; {item.from} - {item.to}
                  </Text>
                </Box>
              ))}
            </Stack>
            <Divider mb="sm" />
          </>
        )}

        {/* Skills */}
        {cv.skills && cv.skills.filter(Boolean).length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconDeviceFloppy size={20} color={theme.colors.blue[4]} />
              <Title order={4} color="blue.3" fw={600} size={18}>
                Skills
              </Title>
            </Group>
            <Group spacing={8} mb="md" style={{ flexWrap: 'wrap' }}>
              {cv.skills.filter(Boolean).map((s, i) => (
                <Badge key={i} color="blue" variant="filled" size="sm">
                  {s}
                </Badge>
              ))}
            </Group>
            <Divider mb="sm" />
          </>
        )}

        {/* Languages */}
        {cv.languages && cv.languages.filter(Boolean).length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconLanguage size={20} color={theme.colors.blue[4]} />
              <Title order={4} color="blue.3" fw={600} size={18}>
                Languages
              </Title>
            </Group>
            <Group spacing={8} mb="md" style={{ flexWrap: 'wrap' }}>
              {cv.languages.filter(Boolean).map((l, i) => (
                <Badge key={i} color="blue" variant="light" size="sm">
                  {l}
                </Badge>
              ))}
            </Group>
            <Divider mb="sm" />
          </>
        )}

        {/* Hobbies */}
        {cv.hobbies && cv.hobbies.filter(Boolean).length > 0 && (
          <>
            <Group spacing={8} mb={4}>
              <IconHeart size={20} color={theme.colors.blue[4]} />
              <Title order={4} color="blue.3" fw={600} size={18}>
                Hobbies
              </Title>
            </Group>
            <Group spacing={8} mb="md" style={{ flexWrap: 'wrap' }}>
              {cv.hobbies.filter(Boolean).map((h, i) => (
                <Badge key={i} color="blue" variant="outline" size="sm">
                  {h}
                </Badge>
              ))}
            </Group>
          </>
        )}
      </Stack>
    </Paper>
  )
})

export default CVTemplateModern
