import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteSerializer } from './route.serializer';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  public create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  public async findAll() {
    const routes = await this.routesService.findAll();
    return routes.map((route) => new RouteSerializer(route));
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const route = await this.routesService.findOne(id);
    return new RouteSerializer(route);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}