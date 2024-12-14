import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { SubscriptionRepository } from './repository/subscription.repository';

@Module({
    providers: [UserRepository, SubscriptionRepository],
    exports: [UserRepository, SubscriptionRepository],
})
export class RepositoryModule {
}
