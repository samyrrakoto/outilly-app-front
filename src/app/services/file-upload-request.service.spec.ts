import { TestBed } from '@angular/core/testing';

import { FileUploadRequestService } from './file-upload-request.service';

describe('FileUploadRequestService', () => {
  let service: FileUploadRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
