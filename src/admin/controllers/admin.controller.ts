import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guards';
import { AdminService } from '../services/admin.service';
import { CreateRaiderDto } from 'src/raiders';

@Controller('admin')
@ApiTags('Admin')
@UseGuards(RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiResponse({ status: 200, description: 'get all users' })
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @ApiResponse({ status: 200, description: 'get all raiders' })
  @Get('raiders')
  getAllRaiders() {
    return this.adminService.getAllRaiders();
  }

  @ApiResponse({ status: 201, description: 'create raider' })
  @Post('raiders/create')
  createRaider(@Body() body: CreateRaiderDto) {
    return this.adminService.createRaider(body);
  }
}
