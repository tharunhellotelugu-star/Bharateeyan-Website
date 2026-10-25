import { MeritScoreBreakdown } from '../types';

/**
 * Formats a number into Indian Rupee string with correct Indian comma separation (e.g., ₹10,00,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  
  const numStr = Math.round(amount).toString();
  if (numStr.length <= 3) {
    return `₹${numStr}`;
  }
  
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  return `₹${formattedOther},${lastThree}`;
}

/**
 * Formats a number in Lakh / Crore representation (e.g. ₹12.5 Lakh, ₹1.4 Crore)
 */
export function formatINRLakh(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lk = amount / 100000;
    return `₹${lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(1)} Lakh`;
  }
  return formatINR(amount);
}

/**
 * Calculates Merit Score dynamically based on campaign metrics
 * Total 100 points:
 * - Public backing (max 30): backers count & % of goal raised
 * - Real customers (max 20): backers outside founder network
 * - Delivery record (max 20): past track record & backer satisfaction
 * - Working product (max 15): demo video / prototype / live testing
 * - Founder commitment (max 10): full-time, update frequency
 * - Community votes (max 5): verified upvotes
 */
export function computeMeritScore(params: {
  raisedAmount: number;
  goalAmount: number;
  backersCount: number;
  pastDeliveries: number;
  hasWorkingDemo: boolean;
  updatesCount: number;
  realCustomerRatio?: number; // 0 to 1
  communityVotesCount?: number;
}): MeritScoreBreakdown {
  const percentFunded = Math.min((params.raisedAmount / params.goalAmount) * 100, 200);
  
  // Public backing (max 30)
  const fundingComponent = Math.min((percentFunded / 100) * 18, 18);
  const backerComponent = Math.min((params.backersCount / 100) * 12, 12);
  const publicBacking = Math.round(Math.min(fundingComponent + backerComponent, 30));

  // Real customers (max 20)
  const ratio = params.realCustomerRatio ?? 0.85;
  const realCustomers = Math.round(ratio * 20);

  // Delivery record (max 20) (new founders get neutral 10-12, proven get up to 20)
  const deliveryRecord = params.pastDeliveries > 0 ? Math.min(10 + params.pastDeliveries * 5, 20) : 10;

  // Working product (max 15)
  const workingProduct = params.hasWorkingDemo ? 14 : 9;

  // Founder commitment (max 10)
  const updatesBonus = Math.min(params.updatesCount * 2, 4);
  const founderCommitment = Math.min(6 + updatesBonus, 10);

  // Community votes (max 5)
  const communityVotes = Math.min(Math.round((params.communityVotesCount || params.backersCount / 10) * 1), 5);

  const totalScore = Math.min(
    publicBacking + realCustomers + deliveryRecord + workingProduct + founderCommitment + communityVotes,
    100
  );

  return {
    publicBacking,
    realCustomers,
    deliveryRecord,
    workingProduct,
    founderCommitment,
    communityVotes,
    totalScore,
  };
}
