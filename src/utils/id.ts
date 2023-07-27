import { Param } from '@nestjs/common';
import { ValidateUUIDPipe } from 'src/pipes/validate-uuid.pipe';
import { v4 as uuid } from 'uuid';

export const UUIDParam = (id: string) => Param(id, ValidateUUIDPipe);

export const generateId = () => uuid();
