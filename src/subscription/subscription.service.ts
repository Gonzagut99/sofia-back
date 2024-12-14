import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionRepository } from 'src/persistence/repository/subscription.repository';

// model Subscription {
//     id        String   @id @default(uuid())
//     userId    String  @unique
//     plan      Plan
//     period    SubscriptionPeriod
  
//     startDate DateTime @default(now())
//     endDate   DateTime
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
  
//     user      User     @relation(fields: [userId], references: [id])
//   }

// @Injectable()
// export class SubscriptionRepository
//   extends PrismaClient
//   implements OnModuleInit
// {
//   private readonly logger = new Logger(SubscriptionRepository.name);

//   async onModuleInit() {
//     await this.$connect();
//     this.logger.log('Connected to the database');
//   }

//     async createSubscription(data:any) {
//         return this.subscription.create({data: data as any});
//     }

//     async findSubscriptionById(id: string) {
//         return this.subscription.findUnique({ where: { id } });
//     }

//     async updateSubscription(id: string, data: any) {
//         return this.subscription.update({ where: { id }, data });
//     }

//     async deleteSubscription(id: string) {
//         return this.subscription.delete({ where: { id } });
//     }

//     async findAll() {
//         return this.subscription.findMany();
//     }

//     async findOne(id: string) {
//         return this.subscription.findUnique({ where: { id } });
//     }


// }

@Injectable()
export class SubscriptionService {
  constructor(
      private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.createSubscription(createSubscriptionDto);
  }

  async findAll() {
    return this.subscriptionRepository.findAll();
  }

  async findOne(id: string) {
    return this.subscriptionRepository.findSubscriptionById(id);
  }

  async findOneByUserId(userId: string) {
    return this.subscriptionRepository.subscription.findFirst({ where: { userId } });
  }

  // async findSubscriptionByCustomerId(customerId: string) {
  //   return this.subscriptionRepository.subscription.findFirst({ where: { customerId } });
  // }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionRepository.updateSubscription(id, updateSubscriptionDto);
  }

  async upsert(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const existingSubscription = await this.findOneByUserId(id);
    if (existingSubscription) {
      return this.subscriptionRepository.updateSubscription(existingSubscription.id, {
        plan: updateSubscriptionDto?.plan,
        period: updateSubscriptionDto?.period,
        startDate: updateSubscriptionDto?.startDate,
      });
    } else {
      return this.subscriptionRepository.createSubscription({ id, ...updateSubscriptionDto });
    }
  }

  async remove(id: string) {
    return this.subscriptionRepository.deleteSubscription(id);
  }
}
