// import React, { useEffect, useState } from 'react';
// import { adminGetAllApplicationsWithProfiles } from '../all services/getJfBackendService';

// const AllApplicationsAdmin = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     adminGetAllApplicationsWithProfiles()
//       .then((res) => {
//         setApplications(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message || 'Failed to fetch applications');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-6">All Job Applications</h2>
//       {applications.length === 0 ? (
//         <div>No applications found.</div>
//       ) : (
//         <ul className="space-y-4">
//           {applications.map((app) => (
//             <li key={app.applicationId} className="border rounded p-4 shadow">
//               <div className="font-semibold text-lg">{app.jobTitle}</div>
//               <div className="text-gray-600">{app.company || 'N/A'}</div>
//               <div className="text-sm text-gray-500 mb-2">Applied by: {app.applicantName} ({app.applicantEmail})</div>
//               <div className="text-sm text-gray-500">Profile: {app.applicantProfile || 'N/A'}</div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AllApplicationsAdmin;
