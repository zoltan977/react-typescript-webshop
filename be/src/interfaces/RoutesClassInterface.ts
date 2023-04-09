import { Router } from 'express';

export interface RoutesClassInterface {
    path: string;
    router: Router;
}
