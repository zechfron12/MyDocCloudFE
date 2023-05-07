import { Medication } from './medication';

/* eslint-disable @typescript-eslint/naming-convention */
export interface BillingInfo {
  deliveryType?: string;
  country: number; // ISO 3166-1
  city: string;
  postAddress: string;
  postAddress2?: string;
  postAddress3?: string;
  postalCode?: string;
  state?: string; // ISO 3166-2
}

export interface CustomerDetails {
  email: string;
  phone: string;
  contact?: string;
  deliveryInfo: BillingInfo;
  billingInfo: BillingInfo;
}

interface OrderBundle {
  orderCreationDate: string;
  customerDetails?: CustomerDetails;
}

export interface RegisterDoParams {
  orderNumber: string;
  amount: number;
  currency: number;
  returnUrl: string;
  description?: string;
  language?: string; // ISO 639-1
  pageView?: string;
  email?: string;
  childId?: string;
  bindingId?: string;
  sessionTimeoutSecs?: number;
  expirationDate?: string;
  jsonParams?: any;
  orderBundle: {
    orderCreationDate: string;
    customerDetails?: CustomerDetails;
  };
}

export interface RegisterDoResponse {
  orderId?: string;
  formUrl: string;
  errorCode?: string;
  errorMessage?: string;
}

export const CURRENCIES = {
  RON: 946,
  EUR: 978,
  USD: 840,
};

export interface OrderStatusParams {
  orderId: string;
  orderNumber?: string;
}

interface CardAuthInfo {
  pan?: string;
  expiration?: number;
  cardholderName?: string;
  approvalCode?: string;
  eci?: number;
  cavv?: string;
  xid?: string;
}

interface BindingInfo {
  clientId?: string;
  bindingId?: string;
}

interface MerchantOrderParams {
  name: string;
  value: string;
}

interface Attributes {
  name: string;
  value: string;
  authDateTime?: string;
  authRefTime?: string;
  terminalId?: string;
}

interface PaymentAmountInfo {
  approvedAmount?: number;
  depositedAmount?: number;
  refundedAmount?: number;
  paymentState?: string;
}

interface BankInfo {
  bankName?: string;
  bankCountryCode?: string;
  bankCountryName?: string;
}

interface Refund {
  referenceNumber?: string;
  actionCode?: string;
  amount?: number;
  date?: string;
}
export interface OrderStatusResponse {
  orderNumber: string;
  orderStatus?: number;
  actionCode: number;
  actionCodeDescription: string;
  errorCode?: number;
  errorMessage?: string;
  amount: number;
  currency?: number;
  date: number;
  orderDescription?: string;
  ip: string;
  cardAuthInfo: CardAuthInfo;
  bindingInfo: BindingInfo;
  merchantOrderParams: MerchantOrderParams[];
  attributes: Attributes[];
  paymentAmountInfo: PaymentAmountInfo;
  bankInfo: BankInfo;
  orderBundle: OrderBundle[];
  chargeback?: boolean;
  refunds: Refund[];
}

export interface OrderQueryParams {
  approvalCode?: string;
  language?: string;
  orderId?: string;
  refNum?: string;
  token?: string;
}

export interface BillPayment {
  id?: string;
  medications?: Medication[];
  billTotal?: number;
  paymentId?: string;
  payment?: Payment;
}

export interface Payment {
  id?: string;
  orderStatus: number;
  cardHolderName: string;
}
