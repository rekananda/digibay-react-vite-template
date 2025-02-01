import { byteOptions, DeepKeys } from "@/common/domain/types/index.d";
import { IMAGE_MIME_TYPE, MS_EXCEL_MIME_TYPE, MS_POWERPOINT_MIME_TYPE, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { ColumnFilteredDataT } from "@Molecule/Table/type";

export const getInitial = (str: string, length: number = 2): string => {
  return str.match(/\b\w/g)?.slice(0, length).join('').toUpperCase() || '';
};

export const getAcceptLabel = (acceptedFile: any):string=> {
  if (acceptedFile === MS_EXCEL_MIME_TYPE) {
    return "excel format (xls or xlsx)";
  } else if (acceptedFile === MS_POWERPOINT_MIME_TYPE) {
    return "power point format (ppt or pptx)";
  } else if (acceptedFile === MS_WORD_MIME_TYPE) {
    return "word format (doc or docx)";
  } else if (acceptedFile === PDF_MIME_TYPE) {
    return "pdfs format";
  } else if (acceptedFile === IMAGE_MIME_TYPE) {
    return "images format (png, gif, jpeg, svg, webp, avif)";
  } else {
    return acceptedFile.join(', ');
  }
}

export const getSizeLabel = (size: number): string => {
  const i: number = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return `${size/(1024**i)} ${byteOptions[i]}`;
};


export const capitalize = (str: string): string => {
  return str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
}

export function flattenObject<T extends Record<string, any>>(obj: T, parentKey = ''): ColumnFilteredDataT<T>[] {
  const result: ColumnFilteredDataT<T>[] = [];

  Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          result.push(...flattenObject(value, newKey));
      } else {
          result.push({ id: newKey as DeepKeys<T>, value });
      }
  });

  return result;
}