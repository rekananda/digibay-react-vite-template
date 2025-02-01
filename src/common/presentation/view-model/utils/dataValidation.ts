import { isValidElement, ReactNode } from "react";

interface DifferenceDetail<T> {
  onlyIn?: 'obj1' | 'obj2';
  value?: T;
  obj1?: T;
  obj2?: T;
}

export type CountResult = {
  [key: string]: any;
  count: number;
}

export const areArraysEqual = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    if (Array.isArray(sortedArray1[i]) && Array.isArray(sortedArray2[i])) {
      if (!areArraysEqual(sortedArray1[i], sortedArray2[i])) {
        return false;
      }
    } else if (typeof sortedArray1[i] === 'object' && typeof sortedArray2[i] === 'object') {
      if (!areObjectsEqual(sortedArray1[i], sortedArray2[i])) {
        return false;
      }
    } else if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
};

export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;  // Handles when both are the same object reference or primitives
  }
  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
    return false; // Ensures both variables are objects and not null
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !areValuesEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const areValuesEqual = (value1: any, value2: any): boolean => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return areArraysEqual(value1, value2);
  } else if (typeof value1 === 'object' && typeof value2 === 'object') {
    return areObjectsEqual(value1, value2);
  } else {
    return value1 === value2;
  }
};

export const findArrayDifferences = <T>(array1: T[], array2: T[]): {index: number, value1: T, value2: T}[] => {
  const differences: {index: number, value1: T, value2: T}[] = [];
  const maxLen = Math.max(array1.length, array2.length);

  for (let i = 0; i < maxLen; i++) {
    if (array1[i] !== array2[i] && !areValuesEqual(array1[i], array2[i])) {
      differences.push({
        index: i,
        value1: array1[i],
        value2: array2[i]
      });
    }
  }

  return differences;
};

export const findObjectDifferences = <T extends object>(obj1: T, obj2: T): {[key: string]: DifferenceDetail<T[keyof T]>} => {
  const differences: {[key: string]: DifferenceDetail<T[keyof T]>} = {};
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)] as Array<keyof T>);

  for (const key of allKeys) {
    if (!Object.hasOwnProperty.call(obj1, key)) {
      differences[String(key)] = { onlyIn: 'obj2', value: obj2[key] };
    } else if (!Object.hasOwnProperty.call(obj2, key)) {
      differences[String(key)] = { onlyIn: 'obj1', value: obj1[key] };
    } else if (!areValuesEqual(obj1[key], obj2[key])) {
      differences[String(key)] = {
        obj1: obj1[key],
        obj2: obj2[key]
      };
    }
  }

  return differences;
};


export function getDifferentKeys<T>(obj1: any, obj2: any): (keyof T)[] {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set(keys1.concat(keys2))];
  const differentKeys = allKeys.filter(key => {
    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      return !areArraysEqual(obj1[key], obj2[key]);
    }
    return keys1.includes(key) !== keys2.includes(key) || obj1[key] !== obj2[key];
  });
  return differentKeys as (keyof T)[];
}

export function countSameValueArrayByKey<T>(arr: T[], key: keyof T): CountResult[] {
  const counts:Record<string, number> = {};
  
  arr.forEach(obj => {
    const value = obj[key];
    counts[String(value)] = (counts[String(value)] || 0) + 1;
  });

  const result = Object.entries(counts)
    .filter(([_, count]) => count > 1)
    .map(([value, count]) => ({ [key]: value, count }));
  return result;
}

export function filterUniqueByKey<T>(arr: T[], key: keyof T): T[] {
  const seenValues: Record<string, boolean> = {};
  return arr.filter(obj => {
    const value = obj[key];
    if (seenValues[String(value)]) {
      return false;
    }
    seenValues[String(value)] = true;
    return true;
  });
}

export function isStringMatchingRegex(inputString: string, regexPattern: RegExp): boolean {
  regexPattern.lastIndex = 0;
  return regexPattern.test(inputString);
}


export const isString = (value: string | ReactNode): value is string => typeof value === 'string';
export const isReactNode = (value: string | ReactNode): boolean => isValidElement(value);
