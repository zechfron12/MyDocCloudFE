import { EventColor } from 'calendar-utils';

export const BASE_API_URL = 'https://localhost:7260/v1/api/';
export const USERNAME = '';
export const PASSWORD = '';
export const PAYMENT_API_URL = 'https://ecclients.btrl.ro:5443/payment/rest/';

export const colors: Record<string, EventColor> = {
  yellow: {
    primary: '#ffd740',
    secondary: '#FDF1BA',
  },
  purple: {
    primary: '#673ab7',
    secondary: '#FAE3E3',
  },
};
