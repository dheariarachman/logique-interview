import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { ApiKeyAuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(ApiKeyAuthGuard)
@ApiSecurity('access-key')
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
  @ApiResponse({ status: 401, description: 'Invalid API Key' })
  @ApiResponse({ status: 403, description: 'Api key is missing' })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. Please, try again later',
  })
  @ApiQuery({ name: 'q', description: 'Query by', required: false })
  @ApiQuery({
    name: 'ob',
    description: 'Order by',
    required: false,
    example: 'email',
  })
  @ApiQuery({ name: 'sb', description: 'Sort by', required: false })
  @ApiQuery({ name: 'of', description: 'Offset', example: 1 })
  @ApiQuery({ name: 'lt', description: 'limit', example: 10 })
  findAll(
    @Query('q') q: string,
    @Query('ob') ob: string,
    @Query('sb') sb: string,
    @Query('of', ParseIntPipe) of: number,
    @Query('lt', ParseIntPipe) lt: number,
  ) {
    return this.usersService.findAll(q, ob, sb, of, lt);
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
