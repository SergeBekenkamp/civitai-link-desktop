import { setRootResourcePath } from '../store';

export function eventSetRootPath(_, directory) {
  if (directory['path'] !== '') {
    console.log('Setting root path', directory);
    setRootResourcePath(directory['path']);
  }
}
