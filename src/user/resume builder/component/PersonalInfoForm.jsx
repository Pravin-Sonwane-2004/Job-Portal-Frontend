import React from 'react'
import { TextInput, Textarea, FileInput, Stack } from '@/components/ui/system'

const PersonalInfoForm = ({ personalInfo, onChange }) => (
  <Stack>
    <TextInput
      label="First Name"
      name="firstName"
      value={personalInfo.firstName}
      onChange={onChange}
      placeholder="First name"
    />
    <TextInput
      label="Last Name"
      name="lastName"
      value={personalInfo.lastName}
      onChange={onChange}
      placeholder="Last name"
    />
    <TextInput
      label="Title"
      name="title"
      value={personalInfo.title}
      onChange={onChange}
      placeholder="Title"
    />
    <FileInput
      label="Photo"
      name="photo"
      onChange={onChange}
      accept="image/*"
      placeholder="Upload photo"
    />
    <TextInput
      label="Address"
      name="address"
      value={personalInfo.address}
      onChange={onChange}
      placeholder="Address"
    />
    <TextInput
      label="Phone Number"
      name="phoneNumber"
      value={personalInfo.phoneNumber}
      onChange={onChange}
      placeholder="Phone number"
    />
    <TextInput
      label="Email"
      name="email"
      value={personalInfo.email}
      onChange={onChange}
      placeholder="Email"
    />
    <Textarea
      label="Description"
      name="description"
      value={personalInfo.description}
      onChange={onChange}
      placeholder="Description"
      minRows={3}
    />
  </Stack>
)

export default PersonalInfoForm


