import { Controller } from '@nestjs/common';

@Controller('favs')
export class FavoritesController {}

//TODO
// GET /favs - get all favorites
// Server should answer with status code 200 and all favorite records (not their ids), split by entity type:
//   interface FavoritesRepsonse{
//     artists: Artist[];
//     albums: Album[];
//     tracks: Track[];
//   }
// POST /favs/track/:id - add track to the favorites
// Server should answer with status code 201 and corresponding message if track with id === trackId exists
// Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
// Server should answer with status code 422 and corresponding message if track with id === trackId doesn't exist
// DELETE /favs/track/:id - delete track from favorites
// Server should answer with status code 204 if the track was in favorites and now it's deleted id is found and deleted
// Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if corresponding track is not favorite
// POST /favs/album/:id - add album to the favorites
// Server should answer with status code 201 and corresponding message if album with id === albumId exists
// Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
// Server should answer with status code 422 and corresponding message if album with id === albumId doesn't exist
// DELETE /favs/album/:id - delete album from favorites
// Server should answer with status code 204 if the album was in favorites and now it's deleted id is found and deleted
// Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if corresponding album is not favorite
// POST /favs/artist/:id - add artist to the favorites
// Server should answer with status code 201 and corresponding message if artist with id === artistId exists
// Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
// Server should answer with status code 422 and corresponding message if artist with id === artistId doesn't exist
// DELETE /favs/artist/:id - delete artist from favorites
// Server should answer with status code 204 if the artist was in favorites and now it's deleted id is found and deleted
// Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if corresponding artist is not favorite
