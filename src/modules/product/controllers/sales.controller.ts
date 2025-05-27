import { Controller, Get, Query } from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('stats')
  getSalesStats() {
    return this.salesService.getSalesWithItems();
  }

  @Get('total-revenue')
  @ApiQuery({
    name: 'startDate',
    type: String,
    description: 'Start date ISO string',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    description: 'End date ISO string',
  })
  async getTotalRevenue(
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string,
  ): Promise<{ totalRevenue: number }> {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const totalRevenue = await this.salesService.getTotalRevenue(
      startDate,
      endDate,
    );
    return { totalRevenue };
  }

  @Get('product-sales-report')
  @ApiQuery({
    name: 'startDate',
    type: String,
    description: 'Start date ISO string',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    description: 'End date ISO string',
  })
  async getProductSalesReport(
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string,
  ) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    return this.salesService.getProductSalesReport(startDate, endDate);
  }
}
