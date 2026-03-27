import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useReactToPrint } from 'react-to-print'
import {
  Button,
  Group,
  Paper,
  Stack,
  Tabs,
  Container,
  Divider,
  Title,
  Tooltip,
  Avatar,
  ScrollArea,
  useUiTheme,
  ActionIcon,
  Text,
  SegmentedControl,
  Modal,
} from '@/components/ui/system'
import {
  IconPlus,
  IconTrash,
  IconFileDownload,
  IconRefresh,
  IconUser,
  IconMoonStars,
  IconDeviceFloppy,
  IconBook,
  IconLanguage,
  IconHeart,
  IconBriefcase,
  IconHome,
  IconPhone,
  IconMail,
  IconInfoCircle,
} from '@tabler/icons-react'
import PersonalInfoForm from './PersonalInfoForm'
import ExperienceForm from './ExperienceForm'
import EducationForm from './EducationForm'
import ListForm from './ListForm'
import CVPreview from './CVPreview'

const initialCV = {
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    photo: '/Profile/awtar.png',
    address: '',
    phoneNumber: '',
    email: '',
    description: '',
  },
  experience: [
    {
      id: uuidv4(),
      position: '',
      company: '',
      city: '',
      from: '',
      to: '',
    },
  ],
  education: [
    {
      id: uuidv4(),
      universityName: '',
      city: '',
      degree: '',
      subject: '',
      from: '',
      to: '',
    },
  ],
  skills: [''],
  languages: [''],
  hobbies: [''],
}

const SingleCVComponent = () => {
  const [cv, setCv] = useState(initialCV)
  const [template, setTemplate] = useState('modern')
  const [previewOpen, setPreviewOpen] = useState(false)
  const colorScheme = 'dark'
  const componentRef = useRef()
  const theme = useUiTheme()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () =>
      console.log('PDF Generated: Your CV PDF has been generated!'),
  })

  // Personal Info
  const handleChangePersonal = (e) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      handleChangeFile(e)
      return
    }
    setCv((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }))
  }
  const handleChangeFile = (e) => {
    const { name } = e.target
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setCv((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [name]: reader.result },
      }))
    }
    reader.readAsDataURL(file)
  }

  // Experience
  const handleChangeExperience = (e, id) => {
    const { name, value } = e.target
    setCv((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }))
  }
  const handleAddExperience = () => {
    setCv((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: uuidv4(),
          position: '',
          company: '',
          city: '',
          from: '',
          to: '',
        },
      ],
    }))
  }
  const handleDeleteExperience = (id) => {
    setCv((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }

  // Education
  const handleChangeEducation = (e, id) => {
    const { name, value } = e.target
    setCv((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }))
  }
  const handleAddEducation = () => {
    setCv((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uuidv4(),
          universityName: '',
          city: '',
          degree: '',
          subject: '',
          from: '',
          to: '',
        },
      ],
    }))
  }
  const handleDeleteEducation = (id) => {
    setCv((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }

  // Skills, Languages, Hobbies
  const handleListChange = (type, idx, value) => {
    setCv((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) => (i === idx ? value : item)),
    }))
  }
  const handleAddListItem = (type) => {
    setCv((prev) => ({
      ...prev,
      [type]: [...prev[type], ''],
    }))
  }
  const handleDeleteListItem = (type, idx) => {
    setCv((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== idx),
    }))
  }

  // Reset
  const handleReset = () => {
    setCv(initialCV)
    console.log('Reset: CV form has been reset.')
  }

  // Example
  const handleLoadExample = () => {
    setCv({
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Web Developer',
        photo: '/Profile/awtar.png',
        address: 'Example Street 10',
        phoneNumber: '123456789',
        email: 'john.doe@gmail.com',
        description:
          'Experienced developer with a passion for building scalable web applications.',
      },
      experience: [
        {
          id: uuidv4(),
          position: 'Senior Web Developer',
          company: 'Facebook Inc.',
          city: 'Menlo Park',
          from: '2015',
          to: 'Present',
        },
        {
          id: uuidv4(),
          position: 'Junior Web Developer',
          company: 'Tesla Inc.',
          city: 'Palo Alto',
          from: '2012',
          to: '2015',
        },
      ],
      education: [
        {
          id: uuidv4(),
          universityName: 'University of Technology',
          city: 'Oklahoma',
          degree: 'Master',
          subject: 'Science',
          from: '2008',
          to: '2010',
        },
      ],
      skills: ['JavaScript', 'React', 'Node.js'],
      languages: ['English', 'Spanish'],
      hobbies: ['Reading', 'Cycling'],
    })
    console.log('Example Loaded: Example CV loaded for demonstration.')
  }

  return (
    <Container
      size="xl"
      py="xl"
      style={{
        minHeight: '100vh',
        background: theme.colors.dark[7],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
      }}
    >
      <Group
        align="flex-start"
        position="apart"
        noWrap
        spacing="xl"
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          flexWrap: 'nowrap',
          flex: 1,
        }}
      >
        <Paper
          shadow="md"
          radius="md"
          p="lg"
          withBorder
          style={{
            minHeight: 840,
            flex: 1,
            maxWidth: '100%',
            background: theme.colors.dark[6],
            position: 'relative',
            overflow: 'hidden',
            marginRight: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Group position="apart" mb="md">
            <Group spacing={8}>
              <IconMoonStars size={28} color={theme.colors.blue[4]} />
              <Title order={2} color="blue.3" fw={700} style={{ letterSpacing: 1 }}>
                CV Builder
              </Title>
            </Group>
            <Tooltip label="Dark mode enabled" withArrow>
              <ActionIcon
                variant="filled"
                color="blue"
                size="lg"
                title="Dark mode"
                radius="xl"
              >
                <IconMoonStars size={22} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Divider mb="sm" />
          <Group mb="md" position="center">
            <SegmentedControl
              value={template}
              onChange={setTemplate}
              data={[
                { label: 'Modern', value: 'modern' },
                { label: 'Classic', value: 'classic' },
                { label: 'Minimal', value: 'minimal' },
              ]}
              color="blue"
              radius="md"
              size="md"
              fullWidth
            />
          </Group>
          <ScrollArea h={650} type="auto" offsetScrollbars>
            <Tabs defaultValue="personal" orientation="vertical" variant="pills" color="blue">
              <Tabs.List>
                <Tabs.Tab value="personal" icon={<IconUser size={18} />}>
                  <Text fw={600} color="neutral.2">Personal</Text>
                </Tabs.Tab>
                <Tabs.Tab value="experience" icon={<IconBriefcase size={18} />}>
                  <Text fw={600} color="neutral.2">Experience</Text>
                </Tabs.Tab>
                <Tabs.Tab value="education" icon={<IconBook size={18} />}>
                  <Text fw={600} color="neutral.2">Education</Text>
                </Tabs.Tab>
                <Tabs.Tab value="skills" icon={<IconDeviceFloppy size={18} />}>
                  <Text fw={600} color="neutral.2">Skills</Text>
                </Tabs.Tab>
                <Tabs.Tab value="languages" icon={<IconLanguage size={18} />}>
                  <Text fw={600} color="neutral.2">Languages</Text>
                </Tabs.Tab>
                <Tabs.Tab value="hobbies" icon={<IconHeart size={18} />}>
                  <Text fw={600} color="neutral.2">Hobbies</Text>
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="personal" pt="xs">
                <Stack spacing="xs">
                  <Group position="center" mb="xs">
                    <Avatar
                      src={cv.personalInfo.photo}
                      size={80}
                      radius={80}
                      alt="Profile"
                      mx="auto"
                      style={{ border: `2px solid ${theme.colors.blue[5]}` }}
                    />
                  </Group>
                  <PersonalInfoForm
                    personalInfo={cv.personalInfo}
                    onChange={handleChangePersonal}
                  />
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="experience" pt="xs">
                <ExperienceForm
                  experience={cv.experience}
                  onChange={handleChangeExperience}
                  onAdd={handleAddExperience}
                  onDelete={handleDeleteExperience}
                />
              </Tabs.Panel>
              <Tabs.Panel value="education" pt="xs">
                <EducationForm
                  education={cv.education}
                  onChange={handleChangeEducation}
                  onAdd={handleAddEducation}
                  onDelete={handleDeleteEducation}
                />
              </Tabs.Panel>
              <Tabs.Panel value="skills" pt="xs">
                <ListForm
                  label="Skill"
                  items={cv.skills}
                  onChange={(idx, value) => handleListChange('skills', idx, value)}
                  onAdd={() => handleAddListItem('skills')}
                  onDelete={(idx) => handleDeleteListItem('skills', idx)}
                />
              </Tabs.Panel>
              <Tabs.Panel value="languages" pt="xs">
                <ListForm
                  label="Language"
                  items={cv.languages}
                  onChange={(idx, value) => handleListChange('languages', idx, value)}
                  onAdd={() => handleAddListItem('languages')}
                  onDelete={(idx) => handleDeleteListItem('languages', idx)}
                />
              </Tabs.Panel>
              <Tabs.Panel value="hobbies" pt="xs">
                <ListForm
                  label="Hobby"
                  items={cv.hobbies}
                  onChange={(idx, value) => handleListChange('hobbies', idx, value)}
                  onAdd={() => handleAddListItem('hobbies')}
                  onDelete={(idx) => handleDeleteListItem('hobbies', idx)}
                />
              </Tabs.Panel>
            </Tabs>
          </ScrollArea>
          <Divider my="sm" />
          <Group mt="md" spacing="md" position="apart">
            <Tooltip label="Preview your CV" withArrow>
              <Button
                leftIcon={<IconUser size={18} />}
                color="blue"
                radius="md"
                fw={600}
                onClick={() => setPreviewOpen(true)}
              >
                Preview
              </Button>
            </Tooltip>
            <Tooltip label="Download your CV as PDF" withArrow>
              <Button leftIcon={<IconFileDownload size={18} />} onClick={handlePrint} color="blue" radius="md" fw={600}>
                Download PDF
              </Button>
            </Tooltip>
            <Tooltip label="Load example CV" withArrow>
              <Button leftIcon={<IconUser size={18} />} variant="outline" onClick={handleLoadExample} color="blue" radius="md" fw={600}>
                Example
              </Button>
            </Tooltip>
            <Tooltip label="Reset all fields" withArrow>
              <Button leftIcon={<IconRefresh size={18} />} color="red" variant="outline" onClick={handleReset} radius="md" fw={600}>
                Reset
              </Button>
            </Tooltip>
          </Group>
        </Paper>
        <Modal
          opened={previewOpen}
          onClose={() => setPreviewOpen(false)}
          size="xl"
          centered
          title="CV Preview"
          overlayProps={{
            color: theme.colors.dark[9],
            opacity: 0.85,
            blur: 2,
          }}
          styles={{
            body: { background: theme.colors.dark[8], padding: 0 },
            header: { background: theme.colors.dark[7] },
          }}
        >
          <CVPreview
            ref={componentRef}
            cv={cv}
            colorScheme={colorScheme}
            template={template}
            style={{
              width: '100%',
              minWidth: 320,
              maxWidth: 600,
              margin: '0 auto',
            }}
          />
        </Modal>
      </Group>
    </Container>
  )
}

export default SingleCVComponent



