'use client';

import { useEffect } from 'react';

import { Spinner } from '_components';
import { useDoctorService } from '_services';

export default Home;

function Home() {
  const doctorService = useDoctorService();
  const { doctors } = doctorService;

  useEffect(() => {
    doctorService.getAll();
  }, []);

  if (doctors) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id} className="mb-4">
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.description}</p>
              <p className="text-gray-600">
                {doctor.opening_hours[0].start}-{doctor.opening_hours[1].end}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Spinner />;
  }
}
