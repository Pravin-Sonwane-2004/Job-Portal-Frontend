import React, { useState, useEffect } from 'react';
import { Container, Divider, SimpleGrid, Text, Center, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import TalentCard from './TalentCard';
import SearchBar from './SearchBar';

const FindTalent = () => {
  const navigate = useNavigate();
  const [allTalents, setAllTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch talent data from backend
  useEffect(() => {
    fetch('https://job-portal-backend-production-8f84.up.railway.app/api/talents') // Update the URL as per your backend
      .then((res) => res.json())
      .then((data) => {
        setAllTalents(data);
        setFilteredTalents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching talents:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container size="xl" className="min-h-[90vh] bg-masala-950 font-poppins py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* <SearchBar onFilterChange={handleFilterChange} /> */}
      </div>

      <Divider my="md" color="masala-800" />

      {/* Loading State */}
      {loading ? (
        <Center className="h-60">
          <Loader color="blue" />
        </Center>
      ) : filteredTalents.length > 0 ? (
        <SimpleGrid
          cols={3}
          spacing="xl"
          breakpoints={[
            { maxWidth: 'lg', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {filteredTalents.map((talent, index) => (
            <div key={index} className="hover:scale-105 transition-transform">
              <TalentCard talent={talent} onViewProfile={() => handleViewProfile(talent)} />
            </div>
          ))}
        </SimpleGrid>
      ) : (
        <Center className="h-60 flex flex-col">
          <Text size="xl" className="text-gray-400 mb-2">
            😕 No talents match your filters!
          </Text>
          <Text size="sm" className="text-gray-500">
            Try adjusting your search criteria.
          </Text>
        </Center>
      )}
    </Container>
  );
};

export default FindTalent;
