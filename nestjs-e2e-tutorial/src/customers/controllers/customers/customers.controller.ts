import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { Request, Response } from 'express';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject('CUSTOMERS_SERVICE')
    private readonly customersService: CustomersService,
  ) {}
  @Get('customers')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found!' });
    }
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer Not Found!', HttpStatus.BAD_REQUEST);
  }

  @Get()
  getAllCustomers() {
    return this.customersService.getCustomers();
  }

  @Post('create')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customersService.createCustomer(createCustomerDto);
  }
}
