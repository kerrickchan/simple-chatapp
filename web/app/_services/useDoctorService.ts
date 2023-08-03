import { create } from 'zustand';

import { useAlertService } from '_services';
import { useFetch } from '_helpers/client';
import { IDoctor } from '_dtos/IDoctors';

export { useDoctorService };

// user state store
const initialState = {
  doctors: undefined,
  doctor: undefined,
};
const doctorStore = create<IDoctorStore>(() => initialState);

function useDoctorService(): IDoctorService {
  const alertService = useAlertService();
  const fetch = useFetch();
  const { doctors, doctor } = doctorStore();

  return {
    doctors,
    doctor,
    getAll: async () => {
      doctorStore.setState({ doctors: await fetch.get('/api/doctor') });
    },
    getById: async (id) => {
      doctorStore.setState({ doctor: undefined });
      try {
        doctorStore.setState({ doctor: await fetch.get(`/api/doctor/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
  }
};

export interface IDoctorStore {
  doctors?: IDoctor[],
  doctor?: IDoctor,
}

export interface IDoctorService extends IDoctorStore {
  getAll: () => Promise<void>,
  getById: (id: string) => Promise<void>,
}
