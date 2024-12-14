// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType  } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional } from 'class-validator';

// enum Plan {
//     FREE
//     PRO
//     //ENTERPRISE
//   }
  
//   enum SubscriptionPeriod {
//     MONTHLY
//     YEARLY
//   }
//   model User {
//     id        String   @id @default(uuid())
//     email     String   @unique
//     password  String
//     name      String?
//     lastname  String?
//     username  String   @unique
//     avatarUrl String?
//     hashedRefreshToken String?
//     plan    Plan     @default(FREE)
//     customerId String? @unique // Stripe Customer ID
//     subscription Subscription?
//     // posts     Post[]
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }
  
//   model Subscription {
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
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'El plan del usuario',
        type: String,
        enum: ['FREE', 'PRO'],
        default: 'FREE',
    })
    @IsString()
    @IsOptional()
    public plan?: string;

    @ApiProperty({
        description: 'El ID del cliente de Stripe',
        type: String,
    })
    @IsString()
    @IsOptional()
    public customerId?: string;

    @ApiProperty({
        description: 'El ID de la suscripción',
        type: String,
    })
    @IsString()
    @IsOptional()
    public subscriptionId?: string;

    @ApiProperty({
        description: 'La fecha de inicio de la suscripción',
        type: Date,
    })
    @IsOptional()
    public startDate?: Date;

    @ApiProperty({
        description: 'La fecha de fin de la suscripción',
        type: Date,
    })
    @IsOptional()
    public endDate?: Date;
}
