import React, { useState } from 'react';
import { Card, Image, Text, Badge, Group, ActionIcon, Button, Avatar } from '@mantine/core';
import { IconHeart, IconMessageCircle, IconUserCircle } from '@tabler/icons-react';

const TalentCard = ({ talent, onViewProfile }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      shadow="md"
      p="lg"
      radius="md"
      withBorder
      className="bg-masala-800 text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      {/* Header Section */}
      <Card.Section className="p-4 border-b border-masala-700">
        <Group position="apart">
          <Group>
            <Avatar
              src={`/avatars/${talent.image}.png`}
              size="lg"
              radius="xl"
              alt={talent.name}
            />
            <div>
              <Text weight={600} size="lg" className="text-bright-sun-400">
                {talent.name}
              </Text>
              <Text size="sm" color="dimmed">{talent.role}</Text>
              <Text size="xs" color="dimmed">{talent.company}</Text>
            </div>
          </Group>
          <ActionIcon
            variant="subtle"
            color={isLiked ? "red" : "gray"}
            onClick={() => setIsLiked(!isLiked)}
            className="transition-all hover:scale-110"
          >
            <IconHeart size={22} fill={isLiked ? "red" : "none"} />
          </ActionIcon>
        </Group>
      </Card.Section>

      {/* About Section */}
      <Text size="sm" mt="md" color="gray.3">
        {expanded ? talent.about : talent.about.slice(0, 100) + (talent.about.length > 100 ? "..." : "")}
      </Text>
      {talent.about.length > 100 && (
        <Text
          size="xs"
          color="bright-sun"
          className="cursor-pointer mt-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </Text>
      )}

      {/* Skills Section */}
      <Group spacing={7} mt="md" mb="md" wrap="wrap">
        {talent.topSkills?.slice(0, 4).map((skill, idx) => (
          <Badge key={idx} color="bright-sun" variant="light">
            {skill}
          </Badge>
        ))}
        {talent.topSkills.length > 4 && (
          <Badge variant="outline" color="gray">
            +{talent.topSkills.length - 4} more
          </Badge>
        )}
      </Group>

      {/* Buttons Section */}
      <Group mt="md" position="apart">
        <Button
          variant="filled"
          color="bright-sun"
          leftIcon={<IconMessageCircle size={18} />}
          fullWidth
          radius="md"
          size="sm"
        >
          Message
        </Button>
        <Button
          variant="outline"
          color="gray"
          leftIcon={<IconUserCircle size={18} />}
          fullWidth
          radius="md"
          size="sm"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
      </Group>
    </Card>
  );
};

export default TalentCard;
