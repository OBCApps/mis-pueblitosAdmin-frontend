import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

export class BaseComponents {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  static saveLocalStorageToManage(action: string, data: any): void {   
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const dataSave = {
          action: action,
          data: data
        };
        const serializedValue = JSON.stringify(dataSave);
        localStorage.setItem('dtoSelected', serializedValue);
      } catch (error) {
        console.error('Error al guardar en localStorage', error);
      }
    } else {
      console.error('localStorage no está disponible');
    }
  }

  static getLocalStorageToManage(key: string): any | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Error al leer desde localStorage', error);
        return null;
      }
    } else {
      console.error('localStorage no está disponible');
      return null;
    }
  }

  static removeLocalStorageToManage(key: string): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error al eliminar desde localStorage', error);
      }
    } else {
      console.error('localStorage no está disponible');
    }
  }
}
