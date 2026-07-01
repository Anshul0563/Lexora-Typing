import { Result } from '../models/Result.js';

/**
 * Initialize performance indexes for analytics queries
 * Run this during application startup for optimal analytics performance
 */
export const initializeAnalyticsIndexes = async () => {
  try {
    // Index for user results with creation date
    await Result.collection.createIndex({
      user: 1,
      createdAt: -1
    });

    // Index for exam-wise statistics
    await Result.collection.createIndex({
      exam: 1,
      user: 1
    });

    // Index for date-based aggregations
    await Result.collection.createIndex({
      createdAt: -1,
      user: 1
    });

    // Index for test mode analysis
    await Result.collection.createIndex({
      testMode: 1,
      user: 1,
      createdAt: -1
    });

    // Index for performance trends
    await Result.collection.createIndex({
      user: 1,
      dayOfWeek: 1,
      hourOfDay: 1
    });

    console.log('Analytics indexes initialized');
  } catch (error) {
    console.warn(`Analytics index initialization warning: ${error.message}`);
    // Don't throw - index creation failures shouldn't block app startup
  }
};

export default initializeAnalyticsIndexes;
