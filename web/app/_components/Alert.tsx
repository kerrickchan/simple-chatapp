'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Alert as FBAlert } from 'flowbite-react';

import { useAlertService } from '_services';

export { Alert };

function Alert() {
  const pathname = usePathname();
  const alertService = useAlertService();
  const alert = alertService.alert;

  useEffect(() => {
    // clear alert on location change
    alertService.clear();
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => alertService.clear(), 3000)
  }, []);

  if (!alert) return null;

  return (
    <div className='absolute flex justify-center w-screen h-screen -z-50'>
      <FBAlert
        className='absolute flex justify-center mt-4 z-50'
        rounded
        color={alert.type}
        onDismiss={alertService.clear}
      >
        <span>
          <p>
            {alert.message}
          </p>
        </span>
      </FBAlert>
    </div>
  );
}
