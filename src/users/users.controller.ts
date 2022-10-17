import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create USer
   *
   * @param createUserDto
   * @returns UserService
   */
  @Post('/register')
  // @UseGuards(AuthGuard('api-key'))
  // @ApiResponse({ type: UserEntity })
  @ApiResponse({ status: 401, description: 'Invalid API Key' })
  @ApiResponse({ status: 403, description: 'Api key is missing' })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. Please, try again later',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * User Get List
   * @returns UserService
   */
  @Get('/list')
  // @UseGuards(AuthGuard('api-key'))
  @ApiResponse({ status: 401, description: 'Invalid API Key' })
  @ApiResponse({ status: 403, description: 'Api key is missing' })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. Please, try again later',
  })
  @ApiQuery({ name: 'q', description: 'Query by' })
  @ApiQuery({ name: 'ob', description: 'Order by' })
  @ApiQuery({ name: 'sb', description: 'Sort by' })
  @ApiQuery({ name: 'of', description: 'Offset' })
  @ApiQuery({ name: 'lt', description: 'limit' })
  findAll(
    @Query('q') q: string,
    @Query('ob') ob: string,
    @Query('sb') sb: string,
    @Query('of') of: string,
    @Query('lt') lt: string,
  ) {
    return this.usersService.findAll();
  }

  /**
   * User Get Detail
   *
   * @param id string
   * @returns UserServices
   */
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({ status: 401, description: 'Invalid API Key' })
  @ApiResponse({ status: 403, description: 'Api key is missing' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. Please, try again later',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * User Update Route
   *
   * @param id
   * @param updateUserDto
   * @returns UserServices
   */
  @Patch(':id')
  @ApiResponse({ status: 400, description: 'Invalid fields type' })
  @ApiResponse({ status: 401, description: 'Invalid API Key' })
  @ApiResponse({ status: 403, description: 'Api key is missing' })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. Please, try again later',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
