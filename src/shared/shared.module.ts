import { Module } from '@nestjs/common';
import { AtGuard, RolesGuard, RtGuard } from './guards';
import { UtilsService } from './services';

@Module({
  imports: [],
  providers: [UtilsService, AtGuard, RtGuard, RolesGuard],
  exports: [UtilsService, AtGuard, RtGuard, RolesGuard],
})
export class SharedModule {}
