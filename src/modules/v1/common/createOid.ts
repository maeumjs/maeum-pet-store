import dayjs from 'dayjs';
import * as uuid from 'uuid';

export default function createOid() {
  return `${dayjs().format('YYYYMMDDHH')}${uuid.v4().replaceAll('-', '')}`;
}
