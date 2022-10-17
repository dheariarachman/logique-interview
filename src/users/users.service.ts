import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user_id = await this.prisma.user.create({
        data: {
          ...createUserDto,
        },
        select: {
          user_id: true,
        },
      });

      return user_id;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        if (error.code === 'P2002') {
          throw new BadRequestException({ error: 'Data is available' });
        }
      }
      throw error;
    }
  }

  async findAll(
    query: string,
    orderBy: string,
    sortBy: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    try {
      const [data, itemLength] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          skip,
          take: limit,
          where: {
            OR: {
              address: {
                contains: query,
              },
              name: {
                contains: query,
              },
              creditcard_ccv: {
                contains: query,
              },
              creditcard_expired: {
                contains: query,
              },
              creditcard_name: {
                contains: query,
              },
              creditcard_number: {
                contains: query,
              },
            },
          },
        }),
        this.prisma.user.count({}),
      ]);

      return {
        count: itemLength,
        rows: data,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({ error: 'Data is available' });
        }
      }
      throw new InternalServerErrorException({
        error: 'Something went wrong. Please, try again later',
      });
    }
  }

  /**
   * Get User Detail
   *
   * @param id user_id
   * @returns User
   */
  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          user_id: id,
        },
      });

      if (user) {
        const {
          creditcard_ccv,
          creditcard_expired,
          creditcard_name,
          creditcard_number,
          creditcard_type,
          photos,
          ...rest
        } = user;

        return {
          ...rest,
          creditcard: {
            type: creditcard_type,
            number: creditcard_number,
            name: creditcard_name,
            expired: creditcard_expired,
          },
        };
      }
      throw new NotFoundException({ error: 'User not found' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({ error: 'Data is available' });
        }
      }
      throw new InternalServerErrorException({
        error: 'Something went wrong. Please, try again later',
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          user_id: id,
        },
      });

      if (user) {
        const {
          creditcard_ccv,
          creditcard_expired,
          creditcard_name,
          creditcard_number,
          creditcard_type,
          photos,
          ...rest
        } = user;

        return {
          ...rest,
          creditcard: {
            type: creditcard_type,
            number: creditcard_number,
            name: creditcard_name,
            expired: creditcard_expired,
          },
        };
      }
      throw new NotFoundException({ error: 'User not found' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({ error: 'Data is available' });
        }
      }
      throw new InternalServerErrorException({
        error: 'Something went wrong. Please, try again later',
      });
    }
  }
}
