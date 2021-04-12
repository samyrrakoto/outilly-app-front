import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  exclusiveStorageData: StorageData[] = [];

  constructor() {}

  public addExclusiveStorageData(name: string, type: StorageType = StorageType.LOCAL): void {
    this.exclusiveStorageData.push(new StorageData(name, type));
  }

  public removeExclusiveStorageData(name: string, type: StorageType = StorageType.LOCAL): void {
    let i: number = 0;

    for (const data of this.exclusiveStorageData) {
      if (data.name === name && data.type === type) {
        this.exclusiveStorageData.splice(i, 1);
      }
      i++;
    }
  }

  public createExclusiveStorageData(): void {
    if (this.exclusiveStorageData) {
      for (const storageData of this.exclusiveStorageData) {
        if (storageData.value) {
          this.setExclusiveStorageData(storageData);
        }
      }
    }
  }

  private setExclusiveStorageData(storageData: StorageData): void {
    storageData.type === StorageType.LOCAL ? localStorage.setItem(storageData.name, storageData.value) : sessionStorage.setItem(storageData.name, storageData.value);
  }

  public reset(): void {
    this.clear();
    this.createExclusiveStorageData();
  }

  public clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export class StorageData {
  name: string;
  type: StorageType;
  value: string;

  constructor(name: string, type: StorageType = StorageType.LOCAL) {
    this.name = name;
    this.type = type;
    this.value = this.type === StorageType.LOCAL ? localStorage.getItem(name) : sessionStorage.getItem(name);
  }
}

export enum StorageType {
  LOCAL,
  SESSION
}
