import { TrackService } from './track.service';
import { ITrack } from './tracks.interface';
import { Controller, Get } from '@nestjs/common';

@Controller('tracks')
export class TracksController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks(): ITrack[] {
    return this.trackService.getAllTracks();
  }
}
