import { TestBed } from '@angular/core/testing';

import { FileUploadManagerService } from './file-upload-manager.service';

describe('FileUploadManagerService', () => {
  let service: FileUploadManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
