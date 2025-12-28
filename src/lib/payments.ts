import { PaymentProvider, PaymentStatus } from '@prisma/client';
import { prisma } from './prisma';

export interface PaymentResult {
  status: PaymentStatus;
  reference?: string;
}

export interface PaymentHandler {
  name: string;
  process: (jobId: string) => Promise<PaymentResult>;
}

export const manualPaymentProvider: PaymentHandler = {
  name: 'Manual/Test',
  async process(jobId: string) {
    await prisma.jobPost.update({ where: { id: jobId }, data: { paymentStatus: PaymentStatus.NEEDS_CONFIRMATION } });
    return { status: PaymentStatus.NEEDS_CONFIRMATION, reference: 'manual-review' };
  }
};

export function getProvider(provider: PaymentProvider): PaymentHandler {
  switch (provider) {
    case PaymentProvider.RAZORPAY:
      return {
        name: 'Razorpay (placeholder)',
        async process(jobId) {
          await prisma.jobPost.update({ where: { id: jobId }, data: { paymentStatus: PaymentStatus.NEEDS_CONFIRMATION } });
          return { status: PaymentStatus.NEEDS_CONFIRMATION, reference: 'razorpay-placeholder' };
        }
      };
    case PaymentProvider.STRIPE:
      return {
        name: 'Stripe (placeholder)',
        async process(jobId) {
          await prisma.jobPost.update({ where: { id: jobId }, data: { paymentStatus: PaymentStatus.NEEDS_CONFIRMATION } });
          return { status: PaymentStatus.NEEDS_CONFIRMATION, reference: 'stripe-placeholder' };
        }
      };
    default:
      return manualPaymentProvider;
  }
}
