import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorites {
  @ApiProperty({ isArray: true, type: Artist })
  artists: Artist[];

  @ApiProperty({ isArray: true, type: Album })
  albums: Album[];

  @ApiProperty({ isArray: true, type: Track })
  tracks: Track[];
}
