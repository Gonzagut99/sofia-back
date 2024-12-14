import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { RepositoryModule } from 'src/persistence/repository.module';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [
    RepositoryModule
  ],
})
export class SubscriptionModule {}
