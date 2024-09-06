import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../components/loading/loading.service';
import { finalize } from 'rxjs';
import { SkipLoadingToken } from '../components/loading/skip-loading.token';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.context.get(SkipLoadingToken)) {
    return next(req);
  }

  const loadingService = inject(LoadingService);
  loadingService.loadingOn();
  return next(req).pipe(finalize(() => loadingService.loadingOff()));
};
