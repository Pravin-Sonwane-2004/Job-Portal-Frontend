import React, { useRef } from 'react';
import { Card, Image, Text, Group, Container, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JobCategory = () => {
  const categories = [
    { title: "Digital Marketing", openings: 50, icon: "/category/Digital Marketing.png" },
    { title: "Sales", openings: 90, icon: "/category/Sales.png" },
    { title: "UI/UX Designer", openings: 50, icon: "/category/UI-UX Designer.png" },
    { title: "Finance", openings: 40, icon: "/category/Finance.png" },
    { title: "Web Developer", openings: 50, icon: "/category/Web Developer.png" },
    { title: "Content Writing", openings: 50, icon: "/category/Content Writing.png" },
    { title: "Content Writing", openings: 50, icon: "/category/Content Writing.png" },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Container style={{ maxWidth: '1880px' }}>
      {/* Section Title */}
      <div className="mt-10"></div>
      <Title order={3} align="center" className="text-bright-sun-400 mb-20 font-bold">
        Explore More Opportunities
      </Title>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute top-1/2 -translate-y-1/3 left-4 bg-masala-900 hover:bg-masala-600 text-white rounded-full p-2 shadow-lg z-10 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap pb-6 snap-x snap-mandatory px-4 scroll-smooth no-scrollbar"
        >
          <div className="flex gap-6 min-w-max">
            {categories.map((category, index) => (
              <Card
                key={category.title + index} // <-- Add this line for unique key
                className="bg-bright-sun-300 hover:bg-bright-sun-400 transition duration-300 inline-block"
                shadow="xl"
                padding="lg"
                radius="lg"
                withBorder
                style={{
                  width: 200,
                  height: 240,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <Group position="center" mb="lg">
                  <Image src={category.icon} alt={category.title} width={40} height={40} />
                </Group>

                <Text size="sm" weight={900} className="text-black mb-1">
                  {category.title}
                </Text>
                <Text size="lg" className="text-masala-950 font-semibold">
                  {category.openings}+ openings
                </Text>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 bg-masala-900 hover:bg-masala-600 text-white rounded-full p-2 shadow-lg z-10 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </Container>
  );
};

export default JobCategory;
