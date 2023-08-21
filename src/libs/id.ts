import { Param } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ValidateUUIDPipe } from 'src/pipes/validate-uuid.pipe';

export const UUIDParam = (id: string) => Param(id, ValidateUUIDPipe);

export const generateId = () => uuid();
