import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Buscar usuario por id por medio del JWT' })
  //We are using a global guard, so we don't need to use the UseGuards decorator here
  //@UseGuards(JwtAuthGuard) //Activates the JWT Strategy, looks for the JWToken in the Authorization header of the request
  //If the token is valid, it will pass the decoded payload to the validate function of the JWT Strategy
  @Get('profile')
  findOne(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  @Public()
  @ApiOperation({ summary: 'Buscar usuario por email' })
  @Get('email/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Public()
  @ApiOperation({ summary: 'Buscar usuario por customer id' })
  @Get('customer/:customerId')
  findUserByCustomerId(@Param('customerId') customerId: string) {
    return this.usersService.findUserByCustomerId(customerId);
  }

  @ApiOperation({ summary: 'Actualizar usuario por id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Public() //It lacks security,  TODO: Add security
  @ApiOperation({ summary: 'Actualizar usuario por id cuando se escucha enventos de stripe desde el front' })
  @Put('stripe/:id')
  updateStripe(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar usuario por id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
