export function calculateCtcToInHand({
  annualCtc,
  pfPercent,
  professionalTax,
  tds
}: {
  annualCtc: number;
  pfPercent: number;
  professionalTax: number;
  tds?: number;
}) {
  const monthlyCtc = annualCtc / 12;
  const pf = monthlyCtc * (pfPercent / 100);
  const tax = professionalTax;
  const tdsAmount = tds ? monthlyCtc * (tds / 100) : 0;
  const monthlyInHand = monthlyCtc - pf - tax - tdsAmount;

  return {
    monthlyInHand,
    breakdown: {
      monthlyCtc,
      pf,
      professionalTax: tax,
      tds: tdsAmount
    }
  };
}

export function calculateHra({
  basic,
  hraReceived,
  rentPaid,
  isMetro
}: {
  basic: number;
  hraReceived: number;
  rentPaid: number;
  isMetro: boolean;
}) {
  const fortyPercent = isMetro ? 0.5 * basic : 0.4 * basic;
  const rentMinusTenPercent = rentPaid - 0.1 * basic;
  const exemption = Math.max(0, Math.min(hraReceived, fortyPercent, rentMinusTenPercent));
  const taxableHra = Math.max(0, hraReceived - exemption);
  return { exemption, taxableHra };
}

export function calculatePf({ basic, employeePercent, cap = 15000 }: { basic: number; employeePercent: number; cap?: number }) {
  const base = Math.min(basic, cap);
  const monthly = base * (employeePercent / 100);
  return {
    monthly,
    annual: monthly * 12
  };
}

export function calculateGratuity({ lastBasic, years }: { lastBasic: number; years: number }) {
  const payable = (lastBasic * 15 * years) / 26;
  return { gratuity: payable };
}

export function calculateEmi({ principal, annualRate, tenureMonths }: { principal: number; annualRate: number; tenureMonths: number }) {
  const monthlyRate = annualRate / (12 * 100);
  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalInterest: 0,
      totalPayment: principal,
      schedule: Array.from({ length: tenureMonths }, (_, i) => ({ month: i + 1, interest: 0, principal: emi, balance: principal - emi * (i + 1) }))
    };
  }
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  let balance = principal;
  const schedule = [];
  let totalInterest = 0;
  for (let i = 0; i < tenureMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    totalInterest += interest;
    schedule.push({ month: i + 1, interest, principal: principalPaid, balance: Math.max(balance, 0) });
  }
  return {
    emi,
    totalInterest,
    totalPayment: principal + totalInterest,
    schedule
  };
}

export function calculateLoanEligibility({
  monthlyIncome,
  obligations,
  rate,
  tenureMonths
}: {
  monthlyIncome: number;
  obligations: number;
  rate: number;
  tenureMonths: number;
}) {
  const disposable = monthlyIncome * 0.6 - obligations;
  const monthlyRate = rate / (12 * 100);
  const eligible = (disposable * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
  return { eligible: Math.max(0, eligible) };
}

export function calculateGst({ amount, rate, inclusive }: { amount: number; rate: number; inclusive: boolean }) {
  if (inclusive) {
    const base = amount / (1 + rate / 100);
    const gst = amount - base;
    return { base, gst, total: amount };
  }
  const gst = (amount * rate) / 100;
  return { base: amount, gst, total: amount + gst };
}

const oldSlabs = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 5 },
  { upTo: 1000000, rate: 20 },
  { upTo: Infinity, rate: 30 }
];

const newSlabs = [
  { upTo: 300000, rate: 0 },
  { upTo: 600000, rate: 5 },
  { upTo: 900000, rate: 10 },
  { upTo: 1200000, rate: 15 },
  { upTo: 1500000, rate: 20 },
  { upTo: Infinity, rate: 30 }
];

export function calculateIncomeTax({ income, regime }: { income: number; regime: 'old' | 'new' }) {
  const slabs = regime === 'old' ? oldSlabs : newSlabs;
  let remaining = income - 50000; // standard deduction
  remaining = Math.max(remaining, 0);
  let tax = 0;
  let previous = 0;
  for (const slab of slabs) {
    const taxable = Math.min(remaining, slab.upTo - previous);
    tax += (taxable * slab.rate) / 100;
    remaining -= taxable;
    previous = slab.upTo;
    if (remaining <= 0) break;
  }
  const cess = tax * 0.04;
  return { tax: tax + cess, cess, base: tax };
}
