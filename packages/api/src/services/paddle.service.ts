import Paddle from 'paddle-sdk';

// class to handle subscription payments for paddle

const vendorId: any = process.env.PADDLE_VENDOR_ID;
const apiKey: any = process.env.PADDLE_API_KEY;

export default class PaddleService {
    private readonly _paddle: any;

    constructor() {
        this._paddle = new Paddle(vendorId,apiKey);
    }

    public async getSubscription(subscriptionId: string): Promise<any> {
        const subscription = await this._paddle.subscriptions.get(subscriptionId);

        return subscription;
    }

    public async getSubscriptions(customerId: string): Promise<any> {
        const subscriptions = await this._paddle.subscriptions.list({ customer_id: customerId });

        return subscriptions;
    }

    public async createSubscription(customerId: string, planId: string): Promise<any> {
        const subscription = await this._paddle.subscriptions.create({
            customer_id: customerId,
            plan_id: planId,
        });

        return subscription;
    }

    public async updateSubscription(subscriptionId: string, planId: string): Promise<any> {
        const subscription = await this._paddle.subscriptions.update({
            subscription_id: subscriptionId,
            plan_id: planId,
        });

        return subscription;
    }

    public async cancelSubscription(subscriptionId: string): Promise<any> {
        const subscription = await this._paddle.subscriptions.cancel({
            subscription_id: subscriptionId,
        });

        return subscription;
    }

    public async getAllSubscriptions(): Promise<any> {
        const subscriptions = await this._paddle.subscriptions.list();

        return subscriptions;
    }

    public async getAllPlans(): Promise<any> {
        const plans = await this._paddle.plans.list();

        return plans;
    }

    public async getAllCustomers(): Promise<any> {
        const customers = await this._paddle.customers.list();

        return customers;
    }
}