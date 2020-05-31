import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  amount: { type: Number, required: true },
  comparisonOperator: {
    type: String,
    enum: ['>', '<']
  }
});

export const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema, 'subscriptions')
